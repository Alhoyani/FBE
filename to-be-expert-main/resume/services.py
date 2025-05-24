from openai import OpenAI
from django.conf import settings
from celery import shared_task
from .example import prompt_example
from .builders import CreateResumeBuilder
import httpx
import asyncio

# Register your services here.

client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)

@shared_task
def generate_resume(name, job_description):
    prompt = f"""
        Generate an ATS-optimized summary, technical skills, and soft skills for the given candidate, focusing on tailoring them to the provided job description. Use the given JSON structure to ensure it follows a clean, machine-readable format. Emphasize relevant skills, experience, and achievements based on the job description to enhance keyword matching. Avoid unnecessary graphics, tables, or columns to ensure ATS compatibility.

        Variables:
            Name: {name}
            Job Description: {job_description}
            JSON Structure: {prompt_example()}

        Task:
            Using the above JSON structure as a template, generate only the summary, technical skills, and soft skills for the given name and job description. The output should:
                - Highlight relevant skills, experience, and certifications based on the provided job description.
                - Write the summary in the possessive form (e.g., "Experience includes..." instead of "Their experience includes...").
                - Begin the summary with a verb (e.g., "Delivering scalable solutions..." instead of "Scalable solutions are delivered...").
                - Avoid starting the summary with a pronoun (e.g., "Driving innovation..." instead of "I drive innovation...").
                - Align with ATS best practices by ensuring consistent formatting, accurate keyword usage, and a clear, linear structure.
                - Please respond with the output in JSON format only.
                - Do not include any additional text or formatting.
                - Ensure the JSON structure is clean, machine-readable, and follows the specified format.
    """
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4",
    )

    print("Response:", response.choices[0].message.content)
    
    return response.choices[0].message.content

def create_resume_builder(resume, user, template, full_name):
    # Initialize the builder with basic information
    builder = CreateResumeBuilder(
        user=user, 
        template=template, 
        full_name=full_name,
        job_title=resume.get('job_title'),
        email=user.email,
        phone=resume.get('phone', None),
        country=resume.get('country', None), 
        city=resume.get('city', None), 
        summary=resume.get('summary', None)
    )

    # Add work experiences if provided
    for exp in resume.get('work_experiences', []):
        builder.add_work_experience(
            job_title=exp.get('job_title'),
            company=exp.get('company'),
            start_date=exp.get('start_date'),
            end_date=exp.get('end_date', None),
            location=exp.get('location', ""),
            description=exp.get('description')
        )

    # Add education if provided
    for edu in resume.get('educations', []):
        builder.add_education(
            degree=edu.get('degree'),
            school=edu.get('school'),
            start_date=edu.get('start_date'),
            end_date=edu.get('end_date'),
            description=edu.get('description', "")
        )

    # Add Technical Skills if provided
    for skill in resume.get('technical_skills', []):
        builder.add_technical_skill(name=skill.get('name'))

    # Add Soft Skills if provided
    for skill in resume.get('soft_skills', []):
        builder.add_soft_skill(name=skill.get('name'))

    # Add languages if provided
    for language in resume.get('languages', []):
        builder.add_language(name=language.get('name'), proficiency=language.get('proficiency'))

    # Add projects if provided
    for project in resume.get('projects', []):
        builder.add_project(
            title=project['title'],
            description=project['description'],
            link=project.get('link', None)
        )

    # Add projects if provided
    for social in resume.get('social_links', []):
        builder.add_social_link(
            label=social.get('label'),
            link=social.get('link')
        )
    
    for other in resume.get('others', []):
        builder.add_other(
            name=other.get('name'),
            obj=other.get('obj')
        )

    # Build the resume
    resume = builder.build()

    return resume
