# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB StudentManagementDB
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

# Copy the initialization script into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port (5432)
EXPOSE 5432