from django.db import models
from django.conf import settings
from .choices import Choices

# Create your models here.

class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    template = models.ForeignKey('templates_app.Template', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='resume_photos/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_purchased = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}"
    
class WorkExperience(models.Model):
    resume = models.ForeignKey(Resume, related_name='work_experiences', on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()

    class Meta:
        ordering = ['-start_date']

class Education(models.Model):
    resume = models.ForeignKey(Resume, related_name='educations', on_delete=models.CASCADE)
    degree = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-start_date']

class TechnicalSkill(models.Model):
    resume = models.ForeignKey(Resume, related_name='technical_skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=500)

class SoftSkill(models.Model):
    resume = models.ForeignKey(Resume, related_name='soft_skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=500)

class Language(models.Model):
    resume = models.ForeignKey(Resume, related_name='languages', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    proficiency = models.CharField(max_length=50, blank=True, null=True)

class Project(models.Model):
    resume = models.ForeignKey(Resume, related_name='projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

class SocialLink(models.Model):
    resume = models.ForeignKey(Resume, related_name='social_links', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    link = models.URLField()

class Other(models.Model):
    resume = models.ForeignKey(Resume, related_name='others', on_delete=models.CASCADE)
    name = models.CharField(max_length=1, choices=Choices.SECTION_CHOICES)
    obj = models.JSONField(default=dict)