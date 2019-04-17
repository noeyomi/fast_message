FROM python:3.7.3
RUN python --version
RUN pip install pipenv
WORKDIR /app
COPY Pipfile .
RUN pipenv install --system --skip-lock
RUN python -m textblob.download_corpora
COPY * /app/
ENTRYPOINT [ "flask", "run" ]