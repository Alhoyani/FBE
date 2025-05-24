from django.db import models
from .validators import validate_file_extension

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='category_icons/')
    perority = models.PositiveIntegerField()
    available = models.BooleanField(default=True)

    class Meta:
        # sort by perority from highest to lowest
        ordering = ('-perority',)

    def __str__(self):
        return self.name
    

class Template(models.Model):
    category = models.ForeignKey(
        Category, related_name='templates', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    description_ar = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='template_images/')
    file = models.FileField(upload_to=f'template_files/', validators=[validate_file_extension])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name
    
    