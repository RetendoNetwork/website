# Stage 1: Build Go server
FROM golang:1.21-alpine as builder

WORKDIR /app

COPY main.go .

RUN go mod init app && go mod tidy && go build -o main main.go

# Stage 2: Final image with Go and Node.js
FROM node:20-alpine

WORKDIR /app

# Copy Go binary from builder stage
COPY --from=builder /app/main .

# Copy the Node.js server files and public directory from 'src'
COPY src/server.js ./src/server.js
COPY config.json ./config.json
COPY src/ ./src/
COPY public ./public
COPY package.json ./
COPY package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Expose the ports for Go and Node.js servers
EXPOSE 3000
EXPOSE 8000

# Run the Go server
CMD ["./main"]