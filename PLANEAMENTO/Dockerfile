FROM swipl

COPY . /app
EXPOSE 80

ENTRYPOINT ["swipl"]
CMD ["/app/server.pl",  "--user=daemon", "--fork=false", "--port=80"]
