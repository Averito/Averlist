FROM node:alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:stable-alpine
COPY ./averlist.xyz.crt /etc/ssl/averlist.xyz
COPY ./averlist.xyz.key /etc/ssl/averlist.xyz
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]