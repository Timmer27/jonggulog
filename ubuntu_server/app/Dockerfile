FROM python:3.10

WORKDIR /

COPY ./requirements.txt /requirements.txt

RUN apt-get update \
    && apt-get install gcc -y \
    && apt-get clean

# RUN pip install --no-cache-dir --upgrade -r /requirements.txt
RUN pip install -r /requirements.txt \
    && rm -rf /root/.cache/pip

COPY . /
# EXPOSE 3007

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3007"]
#COPY ./app /code/app

#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]