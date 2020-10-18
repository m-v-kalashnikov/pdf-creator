#!/bin/sh

if [[ "$DATABASE" = "postgres" ]]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

cd backend || exit
python3 manage.py flush --no-input
python3 manage.py makemigrations
python3 manage.py migrate --no-input
python3 manage.py collectstatic --no-input --clear
echo "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser(username='$ADMIN_USER', email='$ADMIN_MAIL', password='$ADMIN_PASSWORD', first_name='$ADMIN_FIRST_NAME', last_name='$ADMIN_LAST_NAME')" | python3 manage.py shell
python3 manage.py runserver 0.0.0.0:8000