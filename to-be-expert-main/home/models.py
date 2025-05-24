from django.db import models

# Create your models here.

class Feature(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    icon = models.ImageField(upload_to='feature_icons/')

    def __str__(self):
        return self.title
    
class Faq(models.Model):
    question = models.CharField(max_length=256)
    answer = models.TextField()

    def __str__(self):
        return self.question