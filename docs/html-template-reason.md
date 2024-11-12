# Why Copy HTML Template Files in Dockerfile

The line:

```Dockerfile
# Copy HTML template files
COPY --from=builder /app/internal/templates /app/internal/templates
```

is essential because it copies the `dashboard.html` template file from the `internal/templates` directory in your project into the Docker image. Here’s why this is necessary:

1. **Template Rendering**: Since `dashboard.html` is used to render the dashboard interface, your application needs access to this file to serve it correctly. If it’s not included in the Docker image, any request for the dashboard could fail, as the file would be missing.

2. **Separation of Concerns**: Including the HTML template as a static file allows for better modularity. The application code (in `cmd/main.go` and handlers) can focus on backend functionality, while the HTML file handles the frontend layout, loaded as needed by the server.

3. **Docker Image Completeness**: By copying the template file, the Docker image is self-contained and can run independently without depending on external files, ensuring the container has everything it needs to function properly when deployed.

Without this line, your application may throw errors related to missing templates or fail to display the dashboard page.
