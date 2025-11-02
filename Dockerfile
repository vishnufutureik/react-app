# ---- Build Stage ----
FROM node:alpine3.18 AS build

# Declare build-time environment variables
ARG VITE_NODE_ENV
ARG VITE_SERVER_BASE_URL

# Set environment variables (optional, but safe to include)
ENV VITE_NODE_ENV=$VITE_NODE_ENV
ENV VITE_SERVER_BASE_URL=$VITE_SERVER_BASE_URL

# Build the app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Serve Stage ----
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist . 
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
