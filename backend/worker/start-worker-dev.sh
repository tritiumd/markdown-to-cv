#!/usr/bin/env sh
source ../venv/bin/activate
echo $(which python)

# Check if Celery is installed
if python -c "import pkg_resources; pkg_resources.get_distribution('celery')" &> /dev/null; then
    echo "Celery is installed, starting worker..."
    watchmedo auto-restart --directory=./ --pattern="*.py" --recursive -- celery -A worker worker --loglevel=info
else
    echo "Celery is not installed."
fi