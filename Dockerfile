FROM node:latest
MAINTAINER Alexey Vakulich "soulSpringg@gmail.com"

ENV SRC_DIR=/usr/workspace/fugee-signalling

ADD . $SRC_DIR
WORKDIR $SRC_DIR

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 3334
