#STAGE 1: from image as stage name
FROM node:22-alpine AS build-stage

#Set working directory
WORKDIR /app
#Copy package dependency files
COPY package*.json ./
#Install dependencies from those files
RUN npm install
#Copy files from host to image
COPY . .
#Build the app with dependencies
RUN npm run build

#STAGE 2: run created image
FROM node:22-alpine
WORKDIR /app
#Copy files from build stage to dist folder
COPY --from=build-stage /app/dist ./dist

#Install serve globally in container
RUN npm install -g serve
EXPOSE 5173
#Run serve, single page app mode, from dist folder, listen port 5000
CMD ["serve", "-s", "dist", "-l", "5173"]