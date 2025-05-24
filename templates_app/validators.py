import os
from django.core.exceptions import ValidationError

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.html']
    if ext.lower() not in valid_extensions:
        raise ValidationError(f'Unsupported file extension. Allowed extension is: {", ".join(valid_extensions)}')
