FROM python:3.6-slim

COPY . /opt/workdir 

WORKDIR /opt/workdir

RUN pip install -U -r requirements.txt

CMD ["gunicorn","-b", "0.0.0.0:8000", "app:api"]
