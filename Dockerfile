FROM node:latest
LABEL maintainer "Alexey Vakulich <alexey.vakulich@gmail.com>"

ENV SRC_DIR=/usr/workspace/raven-signal

ADD . $SRC_DIR
WORKDIR $SRC_DIR

CMD ["npm", "start"]

EXPOSE 3334
