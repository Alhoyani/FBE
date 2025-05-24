from rest_framework import serializers
from . import models

# Create your serializers here.

class GenerateResumeSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    job_description = serializers.CharField()
    template_id = serializers.IntegerField()

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkExperience
        fields = ['job_title', 'company', 'start_date', 'end_date', 'location', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Education
        fields = ['degree', 'school', 'start_date', 'end_date', 'description']

class TechnicalSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TechnicalSkill
        fields = ['name']

class SoftSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SoftSkill
        fields = ['name']

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Language
        fields = ['name', 'proficiency']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ['title', 'description', 'link']

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SocialLink
        fields = ['label', 'link']

class OtherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Other
        fields = ['name', 'obj']

class ResumeSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    technical_skills = TechnicalSkillSerializer(many=True, read_only=True)
    soft_skills = SoftSkillSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    social_links = SocialLinkSerializer(many=True, read_only=True)
    others = OtherSerializer(many=True, read_only=True)
    file_base64 = serializers.CharField(read_only=True)

    class Meta:
        model = models.Resume
        fields = ['id', 'full_name', 'job_title', 'photo', 'email', 'phone', 'country', 'city', 'summary', 'created_at', 'updated_at', 'work_experiences', 
                  'educations', 'technical_skills', 'soft_skills', 'languages', 'projects', 'social_links', 'others', 'file_base64']
