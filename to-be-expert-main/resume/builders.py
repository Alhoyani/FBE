from . import models
from django.db import transaction
from order.models import Order, Menu

# Register your builders here.


class CreateResumeBuilder:
    def __init__(self, user, template, full_name, job_title, email=None, photo=None, phone=None, country=None, city=None, summary=None):
        self.resume = models.Resume(
            user=user, 
            template=template, 
            full_name=full_name, 
            job_title=job_title, 
            email=email, 
            photo=photo, 
            phone=phone, 
            country=country, 
            city=city, 
            summary=summary
            )
        self.work_experiences = []
        self.educations = []
        self.technical_skills = []
        self.soft_skills = []
        self.languages = []
        self.projects = []
        self.social_links = []
        self.others = []

    def add_work_experience(self, job_title, company, start_date, end_date=None, location=None, description=""):
        self.work_experiences.append(
            models.WorkExperience(
                resume=self.resume,
                job_title=job_title,
                company=company,
                start_date=start_date,
                end_date=end_date,
                location=location,
                description=description
            )
        )
        return self

    def add_education(self, degree, school, start_date, end_date, description=""):
        self.educations.append(
            models.Education(
                resume=self.resume,
                degree=degree,
                school=school,
                start_date=start_date,
                end_date=end_date,
                description=description
            )
        )
        return self

    def add_technical_skill(self, name):
        self.technical_skills.append(models.TechnicalSkill(resume=self.resume, name=name))
        return self
    
    def add_soft_skill(self, name):
        self.soft_skills.append(models.SoftSkill(resume=self.resume, name=name))
        return self

    def add_language(self, name, proficiency):
        self.languages.append(models.Language(resume=self.resume, name=name, proficiency=proficiency))
        return self

    def add_project(self, title, description, link=None):
        self.projects.append(
            models.Project(
                resume=self.resume,
                title=title,
                description=description,
                link=link
            )
        )
        return self

    def add_social_link(self, label, link):
        self.social_links.append(
            models.SocialLink(
                resume=self.resume,
                label=label,
                link=link
            )
        )
        return self
    
    def add_other(self, name, obj:dict):
        self.others.append(
            models.Other(
                resume=self.resume,
                name=name,
                obj=obj
            )
        )
        return self
    
    @transaction.atomic
    def build(self):
        # Save the resume
        self.resume.save()
        
        # Use bulk_create to save related records efficiently
        if len(self.work_experiences) > 0:
            models.WorkExperience.objects.bulk_create(self.work_experiences)

        if len(self.educations) > 0:
            models.Education.objects.bulk_create(self.educations)

        if len(self.technical_skills) > 0:
            models.TechnicalSkill.objects.bulk_create(self.technical_skills)

        if len(self.soft_skills) > 0:
            models.SoftSkill.objects.bulk_create(self.soft_skills)

        if len(self.languages) > 0:
            models.Language.objects.bulk_create(self.languages)

        if len(self.projects) > 0:
            models.Project.objects.bulk_create(self.projects)

        if len(self.social_links) > 0:
            models.SocialLink.objects.bulk_create(self.social_links)

        if len(self.others) > 0:
            models.Other.objects.bulk_create(self.others)

        # Save the order and the stutus is Processing by default
        menu=Menu.objects.first()
        Order.objects.get_or_create(
            price=menu.price,
            vat=menu.vat,
            quantity=menu.quantity,
            resume=self.resume
        )

        return self.resume