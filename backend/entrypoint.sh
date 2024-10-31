#!/bin/sh

python manage.py makemigrations billing
python manage.py migrate --no-input
python manage.py collectstatic --no-input

# gunicorn track_o_bill.wsgi:application --bind 0.0.0.0:8000
python manage.py runserver 0.0.0.0:8000