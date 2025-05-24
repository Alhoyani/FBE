from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from templates_app.models import Template
from django.template.loader import render_to_string
from . import models, serializers, utils, services
import json
from django.db import transaction
import logging
import os
from payment.models import Payment
from weasyprint import HTML
from django.http import HttpResponse
from .choices import Choices

# Create your views here.

logger = logging.getLogger(__name__)

class SectionsListView(APIView):
    def get(self, request):
        """
        List all resume sections.
        """
        try:
            logger.info("Listing all resume sections.")
            sections = [{"code": code, "name": name} for code, name in Choices.SECTION_CHOICES]
            return Response(sections, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception("Unexpected error in resume sections listing.")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ResumeBuilderView(APIView):
    def post(self, request):
        """
        Create a new resume.
        """
        logger.info("Starting to create a new resume.")
        try:
            if models.Resume.objects.filter(user=request.user, is_purchased=False).exists():
                logger.info("Resume already exists.")
                return self.get(request)

            # get the serializer
            serializer = serializers.GenerateResumeSerializer(data=request.data)
            logger.info(f"Serializer data: {request.data}")

            # validate the serializer
            if serializer.is_valid():
                logger.info("Serializer is valid.")

                # get the data from the serializer
                full_name = serializer.validated_data['full_name']
                job_description = serializer.validated_data['job_description']
                template_id = serializer.validated_data['template_id']
                
                # Get the template from the database
                try:
                    template = Template.objects.get(id=template_id)
                    logger.info(f"Template with ID {template_id} found.")

                    # Render the HTML with context
                    template_path = template.file.path
                    logger.info(f"Template path: {template_path}")

                    if not os.path.exists(template_path):
                        logger.error(f"Template file not found: {template_path}")
                        raise FileNotFoundError(f"Template file not found: {template_path}")

                except Template.DoesNotExist:
                    logger.error(f"Template with ID {template_id} not found.")
                    return Response({"error": f"Template with ID {template_id} not found."}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    logger.exception("Unexpected error while fetching template.")
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Trigger the task
                task = services.generate_resume.delay(full_name, job_description)
                logger.info("Task triggered.")

                # Wait for the task to complete and fetch the result
                try:
                    result = task.get(timeout=30)  # Set a timeout to avoid indefinite waiting
                    logger.info("Task completed.")
                except Exception as e:
                    logger.exception("Error while waiting for Celery task result.")
                    return Response({"error": f"Celery task failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Parse the result
                try:
                    context = json.loads(result)
                    logger.info(f"JSON result: {context}")

                    json_data = context["resume"]
                    logger.info(f"JSON data: {json_data}")
                except json.JSONDecodeError as e:
                    logger.error(f"Failed to decode JSON result: {result}")
                    return Response({"error": "Failed to decode JSON result."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Build the resume
                try:
                    serializer_data = self._build_new_objects(json_data, request, template, full_name)
                    logger.info("Resume built.")
                    return Response(serializer_data, status=status.HTTP_201_CREATED)
                except Exception as e:
                    logger.exception("Error building resume.")
                    return Response({"error": f"Failed to build resume: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception("Unexpected error in resume creation.")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        """
        Review the full resume with all its sections.
        """ 
        logger.info("Starting to review the resume.")
        try:
            user = request.user
            resume = models.Resume.objects.filter(user=user, is_purchased=False).last()
            serializer = serializers.ResumeSerializer(resume)
            serializer_data = serializer.data
            serializer_data['file_base64'] = utils.convert_file_to_base64(render_to_string(resume.template.file.path, serializer_data))
            return Response(serializer_data, status=status.HTTP_200_OK)
        except models.Resume.DoesNotExist:
            logger.error("Resume not found.")
            return Response({"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception("Unexpected error in resume review.")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @transaction.atomic
    def patch(self, request, resume_id):
        """
        Update the resume or its sections dynamically.
        """
        logger.info("Starting to update the resume.")
        # try:
        # Retrieve resume
        resume = self._get_resume(resume_id)
        logger.info(f"Resume found: {resume}")

        # Validate and update resume
        serializer = serializers.ResumeSerializer(resume, data=request.data, partial=True)
        if not serializer.is_valid():
            logger.warning("Serializer is not valid.")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        logger.info("Resume updated.")

        # Handle deletion and creation of related objects
        updated_data = self._replace_resume_objects(resume, request.data, request)

        return Response(updated_data, status=status.HTTP_200_OK)

        # except models.Resume.DoesNotExist:
        #     logger.error("Resume not found.")
        #     return Response({"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     logger.exception("Unexpected error in resume update.")
        #     return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _get_resume(self, resume_id):
        """
        Retrieve the resume object by ID.
        """
        return models.Resume.objects.get(id=resume_id)

    @transaction.atomic
    def _replace_resume_objects(self, resume, data, request):
        """
        Replace old resume objects with new ones.
        """
        logger.info("Starting to replace resume objects.")

        # Delete old resume objects
        models.Resume.objects.filter(id=resume.id).delete()
        logger.info("Old resume objects deleted.")

        # Build and serialize new resume objects
        return self._build_new_objects(data, request, resume.template, resume.full_name)

    def _build_new_objects(self, json_data, request, template, full_name):
        """
        Build and serialize new resume objects.
        """
        logger.info("Building new resume objects.")

        # Create new resume objects
        resume = services.create_resume_builder(json_data, request.user, template, full_name)
        logger.info("New resume objects built.")

        # Serialize new resume
        serializer = serializers.ResumeSerializer(resume)

        # Add rendered file to response
        serializer_data = serializer.data
        serializer_data['file_base64'] = utils.convert_file_to_base64(
            render_to_string(template.file.path, json_data)
        )

        logger.info("Resume objects serialized and file converted.")
        return serializer_data        
    
class GenerateResumePdfView(APIView): 
    def get(self, request, hmac):
        """
        Generate a PDF version of the resume.
        """
        logger.info("Starting to generate the resume PDF.")
        try:
            if hmac is None:
                logger.error("HMAC is required.")
                return Response({"error": "HMAC is required"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                payment = Payment.objects.get(hmac=hmac)
                logger.info("Payment found.")
            except Payment.DoesNotExist:
                logger.error("Payment not found.")
                return Response({"error": "HMAC is invalid"}, status=status.HTTP_404_NOT_FOUND)
            
            resume = payment.order.resume
            if not resume.is_purchased:
                logger.error("Resume is not purchased.")
                return Response({"error": "Resume is not purchased"}, status=status.HTTP_400_BAD_REQUEST)
            logger.info("Resume is purchased.")

            # Serialize the resume object
            serializer = serializers.ResumeSerializer(resume)
            logger.info("Resume serialized.")

            # Get the serialized data
            serializer_data = serializer.data
            logger.info(f"Serializer data")

            # Render the HTML template with the serialized data
            html_string = render_to_string(resume.template.file.path, serializer_data)
            logger.info(f"HTML string")

            with open(resume.template.file.path, 'w', encoding='utf-8') as f:
                f.write(html_string)

            # Generate the PDF from the rendered HTML
            pdf_file = HTML(string=html_string).write_pdf()
            logger.info("PDF generated.")

            # Create the HTTP response with the generated PDF
            response = HttpResponse(pdf_file, content_type='application/pdf')
            logger.info("HTTP response created.")
            
            # Set the Content-Disposition header
            response['Content-Disposition'] = 'inline; filename="resume.pdf"'
            logger.info("Content-Disposition set.")

            # Return the HTTP response
            return response
        except Exception as e:
            logger.exception("Unexpected error in resume PDF generation.")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        