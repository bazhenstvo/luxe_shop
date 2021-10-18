#!/usr/bin/env bash
#!/bin/sh

apt-get update && apt-get install -y netcat
echo "Waiting for postgres..."

while ! nc -z "$RDS_HOSTNAME" "$RDS_PORT"; do
  sleep 0.1
done

echo "PostgreSQL started"

pipenv run python manage.py collectstatic --no-input

pipenv run python manage.py migrate
pipenv run gunicorn -b 0.0.0.0:8000 cxbootcamp_django_example.wsgi --timeout 300 --worker-class=gevent --worker-connections=1000 --workers=5

exec "$@"
