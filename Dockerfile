FROM node:9-stretch
MAINTAINER gittrname<txgfx504@yahoo.co.jp>

# Set Env
ENV NODE_ENV=production

# Set Workdir
RUN mkdir /status
COPY . /status

# Install Library
RUN cd /status \
    && npm install

#
WORKDIR /status

#
VOLUME /status/config /status/data

#
CMD ["npm", "start"]
EXPOSE 3000
