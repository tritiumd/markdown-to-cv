import logging
from cv_tritiumd.entrypoints.rest import app as rest_app

logger = logging.getLogger(__name__)


def main():
    """
    Main function to start the REST API application.
    """
    try:
        logger.info("Starting cv_tritiumd REST API")
        rest_app.run()
    finally:
        logger.info("cv_tritiumd REST API has stopped")


if __name__ == "__main__":
    main()
