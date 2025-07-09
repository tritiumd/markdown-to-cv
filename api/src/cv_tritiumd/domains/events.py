"""
Domain events for the CV processing system.

This module contains events that represent significant domain occurrences
in the CV generation and processing workflow.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List, Dict, Any
from enum import Enum


class FileType(str, Enum):
    """Enumeration for supported file types."""
    MARKDOWN = "markdown"
    HTML = "html"
    YAML = "yaml"
    PDF = "pdf"


class ProcessingStatus(str, Enum):
    """Enumeration for processing status."""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class BaseEvent:
    """Base class for all domain events."""
    event_id: str
    timestamp: datetime
    correlation_id: Optional[str] = None
    user_id: Optional[int] = None


# File Management Events
@dataclass
class MarkdownFileUploadedEvent(BaseEvent):
    """Event triggered when a markdown file is uploaded."""
    file_uid: str
    filename: str
    file_path: str
    file_size: int
    content_type: str
    owner_id: int


@dataclass
class FileValidationFailedEvent(BaseEvent):
    """Event triggered when file validation fails."""
    filename: str
    content_type: str
    error_message: str
    validation_errors: List[str]


@dataclass
class FileStorageSucceededEvent(BaseEvent):
    """Event triggered when file storage succeeds."""
    file_uid: str
    file_type: FileType
    file_path: str
    database_id: int


@dataclass
class FileStorageFailedEvent(BaseEvent):
    """Event triggered when file storage fails."""
    file_uid: str
    file_type: FileType
    error_message: str
    original_filename: str


# Form Processing Events
@dataclass
class FormDataReceivedEvent(BaseEvent):
    """Event triggered when form data is received."""
    form_uid: str
    form_data: Dict[str, Any]
    language: str
    validation_status: str


@dataclass
class FormValidationCompletedEvent(BaseEvent):
    """Event triggered when form validation completes."""
    form_uid: str
    is_valid: bool
    validation_errors: Optional[List[Dict[str, Any]]] = None


@dataclass
class FormValidationFailedEvent(BaseEvent):
    """Event triggered when form validation fails."""
    form_uid: str
    validation_errors: List[Dict[str, Any]]
    original_data: Dict[str, Any]


# CV Generation Events
@dataclass
class CVGenerationRequestedEvent(BaseEvent):
    """Event triggered when CV generation is requested."""
    request_uid: str
    source_type: FileType  # markdown or yaml
    source_file_uid: str
    target_format: FileType
    language: str
    processing_options: Dict[str, Any]


@dataclass
class CVGenerationStartedEvent(BaseEvent):
    """Event triggered when CV generation starts."""
    request_uid: str
    source_file_path: str
    target_file_path: str
    worker_id: Optional[str] = None
    estimated_duration: Optional[int] = None


@dataclass
class CVGenerationCompletedEvent(BaseEvent):
    """Event triggered when CV generation completes successfully."""
    request_uid: str
    source_file_uid: str
    generated_file_uid: str
    generated_file_path: str
    target_format: FileType
    processing_duration: int
    file_size: int


@dataclass
class CVGenerationFailedEvent(BaseEvent):
    """Event triggered when CV generation fails."""
    request_uid: str
    source_file_uid: str
    error_message: str
    error_code: str
    retry_count: int
    is_retryable: bool


# Conversion Events
@dataclass
class MarkdownToHtmlConversionStartedEvent(BaseEvent):
    """Event triggered when markdown to HTML conversion starts."""
    conversion_uid: str
    source_file_uid: str
    source_file_path: str
    target_file_path: str


@dataclass
class MarkdownToHtmlConversionCompletedEvent(BaseEvent):
    """Event triggered when markdown to HTML conversion completes."""
    conversion_uid: str
    source_file_uid: str
    generated_file_uid: str
    source_file_path: str
    generated_file_path: str
    processing_duration: int


@dataclass
class YamlToHtmlConversionStartedEvent(BaseEvent):
    """Event triggered when YAML to HTML conversion starts."""
    conversion_uid: str
    source_file_uid: str
    source_file_path: str
    target_file_path: str
    language: str


@dataclass
class YamlToHtmlConversionCompletedEvent(BaseEvent):
    """Event triggered when YAML to HTML conversion completes."""
    conversion_uid: str
    source_file_uid: str
    generated_file_uid: str
    source_file_path: str
    generated_file_path: str
    language: str
    processing_duration: int


@dataclass
class ConversionFailedEvent(BaseEvent):
    """Event triggered when any conversion fails."""
    conversion_uid: str
    source_file_uid: str
    conversion_type: str  # md_to_html, yaml_to_html, etc.
    error_message: str
    error_code: str
    source_file_path: str
    retry_count: int


# Database Events
@dataclass
class FileRecordCreatedEvent(BaseEvent):
    """Event triggered when a file record is created in database."""
    file_uid: str
    file_type: FileType
    database_id: int
    file_path: str
    title: str
    owner_id: int


@dataclass
class FileRecordUpdatedEvent(BaseEvent):
    """Event triggered when a file record is updated in database."""
    file_uid: str
    database_id: int
    updated_fields: Dict[str, Any]
    previous_values: Dict[str, Any]


@dataclass
class FileRecordDeletedEvent(BaseEvent):
    """Event triggered when a file record is deleted from database."""
    file_uid: str
    database_id: int
    file_type: FileType
    deletion_reason: str


@dataclass
class DatabaseTransactionFailedEvent(BaseEvent):
    """Event triggered when database transaction fails."""
    transaction_id: str
    operation_type: str  # create, update, delete
    entity_type: str  # file, form, etc.
    entity_uid: str
    error_message: str
    rollback_completed: bool


# Background Task Events
@dataclass
class BackgroundTaskScheduledEvent(BaseEvent):
    """Event triggered when a background task is scheduled."""
    task_id: str
    task_name: str
    task_args: List[Any]
    task_kwargs: Dict[str, Any]
    scheduled_at: datetime
    estimated_duration: Optional[int] = None


@dataclass
class BackgroundTaskStartedEvent(BaseEvent):
    """Event triggered when a background task starts execution."""
    task_id: str
    task_name: str
    worker_id: str
    started_at: datetime


@dataclass
class BackgroundTaskCompletedEvent(BaseEvent):
    """Event triggered when a background task completes successfully."""
    task_id: str
    task_name: str
    worker_id: str
    completed_at: datetime
    execution_duration: int
    result: Any


@dataclass
class BackgroundTaskFailedEvent(BaseEvent):
    """Event triggered when a background task fails."""
    task_id: str
    task_name: str
    worker_id: str
    failed_at: datetime
    error_message: str
    error_traceback: str
    retry_count: int
    max_retries: int


# Output and Retrieval Events
@dataclass
class OutputFileRequestedEvent(BaseEvent):
    """Event triggered when output file is requested."""
    request_uid: str
    file_uid: str
    file_type: FileType
    requester_ip: Optional[str] = None


@dataclass
class OutputFileDeliveredEvent(BaseEvent):
    """Event triggered when output file is successfully delivered."""
    request_uid: str
    file_uid: str
    file_type: FileType
    file_size: int
    delivery_duration: int


@dataclass
class OutputFileNotFoundEvent(BaseEvent):
    """Event triggered when requested output file is not found."""
    request_uid: str
    file_uid: str
    file_type: FileType
    error_message: str


# System Events
@dataclass
class SystemHealthCheckEvent(BaseEvent):
    """Event triggered during system health checks."""
    check_type: str  # database, redis, file_system, etc.
    status: str  # healthy, degraded, unhealthy
    response_time: int
    details: Dict[str, Any]


@dataclass
class SystemErrorEvent(BaseEvent):
    """Event triggered when system-level errors occur."""
    error_type: str
    error_message: str
    error_traceback: str
    affected_component: str
    severity: str  # low, medium, high, critical
    resolution_steps: List[str]


# Workflow Events
@dataclass
class CVWorkflowStartedEvent(BaseEvent):
    """Event triggered when a complete CV workflow starts."""
    workflow_uid: str
    workflow_type: str  # upload_markdown, submit_form
    input_data: Dict[str, Any]
    expected_outputs: List[FileType]


@dataclass
class CVWorkflowCompletedEvent(BaseEvent):
    """Event triggered when a complete CV workflow completes."""
    workflow_uid: str
    workflow_type: str
    generated_files: List[Dict[str, Any]]  # [{"uid": "...", "type": "...", "path": "..."}]
    total_duration: int
    success_rate: float


@dataclass
class CVWorkflowFailedEvent(BaseEvent):
    """Event triggered when a complete CV workflow fails."""
    workflow_uid: str
    workflow_type: str
    failure_stage: str
    error_message: str
    completed_steps: List[str]
    failed_step: str
    recovery_possible: bool