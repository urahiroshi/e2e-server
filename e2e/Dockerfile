FROM node:6.9

# Install Packages
RUN apt-get update && \
    apt-get install -y \
        xvfb \
        x11-xkb-utils \
        xfonts-100dpi \
        xfonts-75dpi \ 
        xfonts-scalable \
        xfonts-cyrillic \
        x11-apps \
        clang \
        libdbus-1-dev \
        libgtk2.0-dev \
        libnotify-dev \
        libgnome-keyring-dev \
        libgconf2-dev \
        libasound2-dev \
        libcap-dev \
        libcups2-dev \
        libxtst-dev \
        libxss1 \
        libnss3-dev \
        gcc-multilib \
        g++-multilib \
        xauth \
        git \
        # for cjk
        fonts-arphic-uming \
        fonts-ipafont-gothic \
        fonts-unfonts-core \
        sudo \
        --no-install-recommends \
    && apt-get autoclean \
    && apt-get clean \
    && rm -rf /var/lib/api/lists/*

# User Setting
RUN echo %sudo ALL=NOPASSWD: ALL >> /etc/sudoers
WORKDIR /home/node
ENV HOME /home/node

# Install Application
ADD package.json .
RUN npm install
ADD *.* ./
ADD libs ./libs/
RUN chown -R node:node .

# Application Setting
USER node
ENV DEBUG nightmare:actions*
ENV DISPLAY :9.0

# Execution
CMD Xvfb -ac -screen scrn 1280x2000x24 :9.0 & sleep 3 && node index.js
