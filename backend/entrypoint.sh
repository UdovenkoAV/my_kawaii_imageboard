#!/bin/sh

sleep 5
python manage.py collectstatic
python manage.py migrate

exec "$@"

