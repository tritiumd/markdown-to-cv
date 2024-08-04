#!/usr/bin/env bash

# Check if Celery is installed
if python -c "import pkg_resources; pkg_resources.get_distribution('celery')" &> /dev/null; then
    echo "Celery is installed, starting worker..."
    celery -A app.worker worker --loglevel=info
else
    echo "Celery is not installed."
fi