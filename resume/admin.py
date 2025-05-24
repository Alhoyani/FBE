from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Resume)
admin.site.register(models.WorkExperience)
admin.site.register(models.Education)
admin.site.register(models.SoftSkill)
admin.site.register(models.TechnicalSkill)
admin.site.register(models.Project)
admin.site.register(models.Language)
admin.site.register(models.SocialLink)