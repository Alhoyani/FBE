from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.template.loader import render_to_string
from django.conf import settings
from celery import shared_task

# create a function to send email

@shared_task
def send_email(receiver_email, otp):
    message = Mail(
        from_email="khalifah@tobe.expert",
        to_emails=f"{receiver_email}",
        subject="ToBeExpert Verification OTP",
        html_content=render_to_string('email/notification_email.html', {'otp': otp})
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        print("status code:", response.status_code)
        print("body:", response.body)
        print("headers:", response.headers)
    except Exception as e:
        print(f"Error sending email: {e}")