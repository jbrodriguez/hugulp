FROM node:7.9.0-alpine
# Set environment variable
ARG RUN_AS=node
ARG HUGO_VERSION=0.20.6
ARG HUGO_BINARY="hugo_${HUGO_VERSION}_Linux-64bit"
RUN apk update && apk add py-pygments && rm -rf /var/cache/apk/*
# Download and install hugo
RUN mkdir /usr/local/hugo
ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz \
    /usr/local/hugo/
RUN tar xzf /usr/local/hugo/${HUGO_BINARY}.tar.gz -C /usr/local/hugo/ \
    && ln -s /usr/local/hugo/hugo /usr/local/bin/hugo \
    && rm /usr/local/hugo/${HUGO_BINARY}.tar.gz
RUN npm install -g hugulp
ENV HOME=/home/$RUN_AS
COPY package.json $HOME/web/
RUN chmod 755 $HOME/* && chown -R $RUN_AS:$RUN_AS $HOME/*
USER $RUN_AS
# Change working directory
WORKDIR $HOME/web/
USER root
COPY . $HOME/web/
RUN chown -R $RUN_AS:$RUN_AS $HOME/*
USER $RUN_AS