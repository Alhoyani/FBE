# {
#     "resume": {
#         "full_name": "John Doe",
#         "job_title": "Software Engineer",
#         "email": "john.doe@example.com",
#         "phone": "+1234567890",
#         "country": "USA",
#         "city": "New York",
#         "summary": "Experienced software engineer with expertise in developing backend systems and microservices.",
#         "work_experiences": [
#             {
#                 "job_title": "Software Engineer",
#                 "company": "InnovateX",
#                 "start_date": "2024-09-01",
#                 "end_date": null,
#                 "location": "Remote",
#                 "description": "Leading backend development for high-performance systems using Kubernetes and Docker."
#             },
#             {
#                 "job_title": "Backend Developer",
#                 "company": "TechCorp",
#                 "start_date": "2022-05-01",
#                 "end_date": "2024-09-01",
#                 "location": "San Francisco, USA",
#                 "description": "Developed microservices using Java and Spring Boot, integrated with Kafka and Redis."
#             }
#         ],
#         "educations": [
#             {
#                 "degree": "Bachelor of Science in Computer Science",
#                 "school": "ABC University",
#                 "country": "XYZ",
#                 "city": "xyz",
#                 "start_date": "2018-09-01",
#                 "end_date": "2022-06-01",
#                 "description": "Graduated with honors, specializing in software engineering."
#             }
#         ],
#         "technical_skills": [
#             {
#                 "name": "Python"
#             },
#             {
#                 "name": "Java"
#             }
#             ],
#             "soft_skills": [
#             {
#                 "name": "Communication"
#             },
#             {
#                 "name": "Teamwork"
#             }
#         ],
#         "languages": [
#             {
#                 "name": "English",
#                 "proficiency": "C1"
#             },
#             {
#                 "name": "French",
#                 "proficiency": "B2"
#             }
#         ],
#         "projects": [
#             {
#                 "title": "Portfolio Website",
#                 "description": "Designed and developed a personal portfolio website using Django.",
#                 "link": "https://portfolio.example.com"
#             },
#             {
#                 "title": "Real-time Chat App",
#                 "description": "Built a chat application with WebSocket support.",
#                 "link": "https://github.com/user/chat-app"
#             }
#         ],
#         "social_links": [
#             {
#                 "label": "LinkedIn",
#                 "link": "https://linkedin.com/in/johndoe"
#             },
#             {
#                 "label": "GitHub",
#                 "link": "https://github.com/johndoe"
#             }
#         ]
#     }
# }

def prompt_example():
    return """
    {
        "resume":{
            "job_title":"",
            "summary":"",
            "technical_skills":[
                {
                    "name":""
                },
                {
                    "name":""
                }
            ],
            "soft_skills":[
                {
                    "name":""
                },
                {
                    "name":""
                }
            ]
        }
    }
    """

def resume_object():
    return """
    {
        "resume": {
            "full_name": "",
            "job_title": "",
            "email": "",
            "phone": "",
            "country": "",
            "city": "",
            "summary": "Experienced software engineer with expertise in developing backend systems and microservices.",
            "work_experiences": [
                {
                    "job_title": "Software Engineer",
                    "company": "InnovateX",
                    "start_date": "2024-09-01",
                    "end_date": null,
                    "location": "Remote",
                    "description": "Leading backend development for high-performance systems using Kubernetes and Docker."
                },
                {
                    "job_title": "Backend Developer",
                    "company": "TechCorp",
                    "start_date": "2022-05-01",
                    "end_date": "2024-09-01",
                    "location": "San Francisco, USA",
                    "description": "Developed microservices using Java and Spring Boot, integrated with Kafka and Redis."
                }
            ],
            "educations": [
                {
                    "degree": "Bachelor of Science in Computer Science",
                    "school": "ABC University",
                    "country": "XYZ",
                    "city": "xyz",
                    "start_date": "2018-09-01",
                    "end_date": "2022-06-01",
                    "description": "Graduated with honors, specializing in software engineering."
                }
            ],
            "technical_skills": [
                {
                    "name": "Python"
                },
                {
                    "name": "Java"
                }
                ],
                "soft_skills": [
                {
                    "name": "Communication"
                },
                {
                    "name": "Teamwork"
                }
            ],
            "languages": [
                {
                    "name": "English",
                    "proficiency": "C1"
                },
                {
                    "name": "French",
                    "proficiency": "B2"
                }
            ],
            "projects": [
                {
                    "title": "Portfolio Website",
                    "description": "Designed and developed a personal portfolio website using Django.",
                    "link": "https://portfolio.example.com"
                },
                {
                    "title": "Real-time Chat App",
                    "description": "Built a chat application with WebSocket support.",
                    "link": "https://github.com/user/chat-app"
                }
            ],
            "social_links": [
                {
                    "label": "LinkedIn",
                    "link": "https://linkedin.com/in/johndoe"
                },
                {
                    "label": "GitHub",
                    "link": "https://github.com/johndoe"
                }
            ]
        }
    }
    """