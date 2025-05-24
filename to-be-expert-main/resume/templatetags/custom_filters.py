from django import template

register = template.Library()

@register.filter
def split_by_period(value):
    """
    Splits a string by '.' and removes empty parts.
    """
    if not isinstance(value, str):
        return []
    return [f"{point.strip()}." for point in value.split('.') if point.strip()]
