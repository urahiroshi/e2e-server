FROM node:6.9

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
USER node

# Execution
CMD ["node", "index.js"]
