# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for building Python packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        python3-dev \
        gcc \
        g++

# Copy the current directory contents into the container at /app
COPY . .

# Install necessary Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Command to run the FastAPI server
CMD ["python", "app.py"]
