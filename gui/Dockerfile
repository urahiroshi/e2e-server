FROM node:6.9

# User Setting
RUN echo %sudo ALL=NOPASSWD: ALL >> /etc/sudoers
WORKDIR /home/node
ENV HOME /home/node

# Prepare Application
RUN npm install -g webpack
ADD package.json .
RUN npm install
ADD . ./
RUN webpack
RUN chown -R node:node .
USER node

# Execution
CMD ["npm", "start"]
