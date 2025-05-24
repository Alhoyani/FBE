import base64

# Register your utils here.

def convert_file_to_base64(rendered_file):    
    # Convert the rendered HTML to bytes
    html_bytes = rendered_file.encode('utf-8')

    # Encode the bytes to a base64 string
    base64_html = base64.b64encode(html_bytes).decode('utf-8')

    return base64_html