FROM mongo
COPY ./data/dump /data/dump
CMD mongorestore -h mongo /data/dump
