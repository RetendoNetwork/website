FROM golang:1.21-alpine as builder

WORKDIR /app

COPY main.go .

RUN go mod init app && go mod tidy && go build -o main main.go

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/main .

COPY src/server.js ./src/server.js
COPY config.json ./config.json
COPY src/ ./src/
COPY public ./public
COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 3000
EXPOSE 8000

CMD ["./main"]