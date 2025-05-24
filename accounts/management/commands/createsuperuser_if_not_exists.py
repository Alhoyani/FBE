from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
import os

class Command(BaseCommand):
    help = 'Create a superuser if none exists'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                email='admin@tobeexpert.com',
                password='@Admin1234'
            )
            self.stdout.write(self.style.SUCCESS('Superuser created.'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists.'))

        site, created = Site.objects.get_or_create(id=1)
        site.domain = os.getenv('DOMAIN')
        site.name = "To Be Expert"
        site.save()

        if created:
            self.stdout.write(self.style.SUCCESS('Site created.'))
        else:
            self.stdout.write(self.style.WARNING('Site already exists.'))

        self.stdout.write(self.style.SUCCESS('Site domain updated.'))