# pull official base image
FROM python:3.9.0-alpine

# set work directory
RUN mkdir /code
WORKDIR /code

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# adding main packages
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install --upgrade pip
RUN pip install --upgrade pipenv

# install dependencies
ADD Pipfile* /code/
RUN set -ex && pipenv install --deploy --system

# copy(add) script
COPY ./backend/scripts/start.sh /

# copy(add) project
ADD . /code/