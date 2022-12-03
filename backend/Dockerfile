FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1i
#RUN mkdir -p /home/app
RUN adduser app
#ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN apt update && apt install ffmpeg libsm6 libxext6 -y && apt install iputils-ping -y
RUN pip install -r requirements.txt
COPY ./entrypoint.sh .
RUN chmod +x $APP_HOME/entrypoint.sh  
RUN chown -R app:app $APP_HOME
USER app
COPY . .
RUN mkdir $APP_HOME/media
RUN mkdir $APP_HOME/staticfiles
ENTRYPOINT ["/home/app/web/entrypoint.sh"]

