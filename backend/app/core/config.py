from typing import Any, List, Literal, Union

from pydantic import (
    AnyUrl,
    DirectoryPath,
    HttpUrl,
    PostgresDsn,
    computed_field,
    validator,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )
    API_V1_STR: str = "/api/v1"
    # SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    # ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    DOMAIN: str = "localhost"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    @computed_field  # type: ignore[misc]
    @property
    def server_host(self) -> str:
        # Use HTTPS for anything other than local development
        if self.ENVIRONMENT == "local":
            return f"http://{self.DOMAIN}"
        return f"https://{self.DOMAIN}"

    BACKEND_CORS_ORIGINS: Union[List[AnyUrl], List[str], str] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Any) -> list[str] | str:
        return parse_cors(v)

    PROJECT_NAME: str
    SENTRY_DSN: HttpUrl | None = None
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str = ""

    DATA_FOLDER_PATH: DirectoryPath = "./data"
    DATA_FOLDER_PATH_MARKDOWN: DirectoryPath = "./data/markdown"
    DATA_FOLDER_PATH_HTML: DirectoryPath = "./data/html"
    DATA_FOLDER_PATH_DEPLOY: DirectoryPath = "./data/deploy"
    DATA_FOLDER_PATH_YAML: DirectoryPath = "./data/yaml"
    DATA_FOLDER_PATH_PDF: DirectoryPath = "./data/pdf"

    # Folder path validation
    @computed_field  # type: ignore[misc]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    # Redis configuration
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_QUEUE_DB: int = 0
    REDIS_BACKEND_DB: int = 1

    # Celery configuration
    @computed_field  # type: ignore[misc]
    @property
    def CELERY_BROKER_URL(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_QUEUE_DB}"

    @computed_field  # type: ignore[misc]
    @property
    def CELERY_RESULT_BACKEND(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_BACKEND_DB}"

    CELERY_TASK_SERIALIZER: str = "json"
    CELERY_RESULT_SERIALIZER: str = "json"
    CELERY_ACCEPT_CONTENT: list[str] = ["json"]
    CELERY_TIMEZONE: str = "UTC"
    CELERY_ENABLE_UTC: bool = True

    #
    # SMTP_TLS: bool = True
    # SMTP_SSL: bool = False
    # SMTP_PORT: int = 587
    # SMTP_HOST: str | None = None
    # SMTP_USER: str | None = None
    # SMTP_PASSWORD: str | None = None
    # # TODO: update type to EmailStr when sqlmodel supports it
    # EMAILS_FROM_EMAIL: str | None = None
    # EMAILS_FROM_NAME: str | None = None
    #
    # @model_validator(mode="after")
    # def _set_default_emails_from(self) -> Self:
    #     if not self.EMAILS_FROM_NAME:
    #         self.EMAILS_FROM_NAME = self.PROJECT_NAME
    #     return self
    #
    # EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    #
    # @computed_field  # type: ignore[misc]
    # @property
    # def emails_enabled(self) -> bool:
    #     return bool(self.SMTP_HOST and self.EMAILS_FROM_EMAIL)
    #
    # # TODO: update type to EmailStr when sqlmodel supports it
    # EMAIL_TEST_USER: str = "test@example.com"
    # # TODO: update type to EmailStr when sqlmodel supports it
    # FIRST_SUPERUSER: str
    # FIRST_SUPERUSER_PASSWORD: str
    # USERS_OPEN_REGISTRATION: bool = False
    #
    # def _check_default_secret(self, var_name: str, value: str | None) -> None:
    #     if value == "changethis":
    #         message = (
    #             f'The value of {var_name} is "changethis", '
    #             "for security, please change it, at least for deployments."
    #         )
    #         if self.ENVIRONMENT == "local":
    #             warnings.warn(message, stacklevel=1)
    #         else:
    #             raise ValueError(message)
    #
    # @model_validator(mode="after")
    # def _enforce_non_default_secrets(self) -> Self:
    #     self._check_default_secret("SECRET_KEY", self.SECRET_KEY)
    #     self._check_default_secret("POSTGRES_PASSWORD", self.POSTGRES_PASSWORD)
    #     self._check_default_secret(
    #         "FIRST_SUPERUSER_PASSWORD", self.FIRST_SUPERUSER_PASSWORD
    #     )
    #
    #     return self


settings = Settings()  # type: ignore
