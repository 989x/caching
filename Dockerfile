# Stage 0 - Building server application
FROM golang:1.22.0 as builder
WORKDIR /app

# Copy necessary files for building the application
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire project structure
COPY . .

# Disable CGO and compile server
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w' -o server cmd/main.go
RUN chmod +x server

# Stage 1 - Server start
FROM --platform=amd64 alpine:3.9
WORKDIR /app

# Install timezone data
RUN apk add --no-cache tzdata

# Set the timezone
ENV TZ=Asia/Bangkok

# Copy binary and .env file from builder stage
COPY --from=builder /app/server /app/server
COPY .env /app/.env

# Copy HTML template files
COPY --from=builder /app/internal/templates /app/internal/templates

EXPOSE 8101
CMD [ "/app/server", "start" ]
