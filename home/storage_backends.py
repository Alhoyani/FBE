from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings 

class MediaStorage(S3Boto3Storage):
    location = "media"  # Forces all uploaded files to go inside 'media/' in S3
    file_overwrite = False  # Avoids overwriting existing files with the same name
    print("settings.AWS_STORAGE_BUCKET_NAME: ", settings.AWS_STORAGE_BUCKET_NAME)
    custom_domain = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/media"

    def url(self, name):
        return f"{self.custom_domain}/{name}"