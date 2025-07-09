"""
Domain commands for the CV processing system.

This module contains commands that represent actions/operations
to be performed in the CV generation and processing workflow.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List, Dict, Any, Union
from enum import Enum


class FileType(str, Enum):
    """Enumeration for supported file types."""
    MARKDOWN = "markdown"
    HTML = "html"
    YAML = "yaml"
    PDF = "pdf"


class Priority(str, Enum):
    """Enumeration for command priority levels."""
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"


@dataclass
class BaseCommand:
    """Base class for all domain commands."""
    command_id: str
    timestamp: datetime
    correlation_id: Optional[str] = None
    user_id: Optional[int] = None
    priority: Priority = Priority.NORMAL
    timeout_seconds: Optional[int] = None
    retry_count: int = 0
    max_retries: int = 3


# File Management Commands
@dataclass
class UploadMarkdownFileCommand(BaseCommand):
    """Command to upload a markdown file."""
    filename: str
    file_content: bytes
    content_type: str
    owner_id: int
    validate_content: bool = True
    auto_convert_to_html: bool = True


@dataclass
class ValidateFileCommand(BaseCommand):
    """Command to validate an uploaded file."""
    file_uid: str
    file_path: str
    filename: str
    content_type: str
    validation_rules: List[str]
    strict_mode: bool = False


@dataclass
class StoreFileCommand(BaseCommand):
    """Command to store a file to disk and database."""
    file_uid: str
    file_content: Union[bytes, str]
    file_path: str
    file_type: FileType
    filename: str
    owner_id: int
    metadata: Dict[str, Any] = None


@dataclass
class DeleteFileCommand(BaseCommand):
    """Command to delete a file from disk and database."""
    file_uid: str
    file_type: FileType
    delete_from_disk: bool = True
    delete_from_database: bool = True
    deletion_reason: str = "user_request"


# Form Processing Commands
@dataclass
class ProcessFormDataCommand(BaseCommand):
    """Command to process form data submission."""
    form_data: Dict[str, Any]
    language: str
    owner_id: int
    validation_schema: str = "FormSchema"
    auto_generate_cv: bool = True


@dataclass
class ValidateFormDataCommand(BaseCommand):
    """Command to validate form data against schema."""
    form_uid: str
    form_data: Dict[str, Any]
    validation_schema: str
    strict_validation: bool = True


@dataclass
class SaveFormDataCommand(BaseCommand):
    """Command to save validated form data."""
    form_uid: str
    form_data: Dict[str, Any]
    file_path: str
    format: str = "yaml"  # yaml, json
    owner_id: int


# CV Generation Commands
@dataclass
class GenerateCVCommand(BaseCommand):
    """Command to generate CV in specified format."""
    request_uid: str
    source_file_uid: str
    source_type: FileType
    target_format: FileType
    language: str = "vi"
    template_options: Dict[str, Any] = None
    output_quality: str = "standard"  # draft, standard, high


@dataclass
class ConvertMarkdownToHtmlCommand(BaseCommand):
    """Command to convert markdown file to HTML."""
    conversion_uid: str
    source_file_uid: str
    source_file_path: str
    target_file_path: str
    pandoc_options: Dict[str, Any] = None
    template_name: str = "pandoc-cv.html5"


@dataclass
class ConvertYamlToHtmlCommand(BaseCommand):
    """Command to convert YAML form data to HTML."""
    conversion_uid: str
    source_file_uid: str
    source_file_path: str
    target_file_path: str
    language: str
    template_options: Dict[str, Any] = None


@dataclass
class ConvertYamlToMarkdownCommand(BaseCommand):
    """Command to convert YAML form data to Markdown."""
    conversion_uid: str
    source_file_uid: str
    source_file_path: str
    target_file_path: str
    language: str
    markdown_template: str = "default"


@dataclass
class GeneratePDFCommand(BaseCommand):
    """Command to generate PDF from HTML."""
    conversion_uid: str
    source_file_uid: str
    html_file_path: str
    pdf_file_path: str
    pdf_options: Dict[str, Any] = None
    paper_size: str = "A4"
    orientation: str = "portrait"


# Database Commands
@dataclass
class CreateFileRecordCommand(BaseCommand):
    """Command to create a file record in database."""
    file_uid: str
    file_type: FileType
    file_path: str
    title: str
    owner_id: int
    metadata: Dict[str, Any] = None


@dataclass
class UpdateFileRecordCommand(BaseCommand):
    """Command to update a file record in database."""
    file_uid: str
    updates: Dict[str, Any]
    version_increment: bool = True
    update_timestamp: bool = True


@dataclass
class DeleteFileRecordCommand(BaseCommand):
    """Command to delete a file record from database."""
    file_uid: str
    soft_delete: bool = True
    deletion_reason: str = "user_request"


@dataclass
class QueryFileRecordsCommand(BaseCommand):
    """Command to query file records from database."""
    query_uid: str
    filters: Dict[str, Any]
    owner_id: Optional[int] = None
    file_types: List[FileType] = None
    limit: int = 100
    offset: int = 0
    order_by: str = "timestamp"
    order_direction: str = "desc"


# Background Task Commands
@dataclass
class ScheduleBackgroundTaskCommand(BaseCommand):
    """Command to schedule a background task."""
    task_name: str
    task_args: List[Any]
    task_kwargs: Dict[str, Any]
    delay_seconds: int = 0
    schedule_at: Optional[datetime] = None
    task_queue: str = "default"


@dataclass
class CancelBackgroundTaskCommand(BaseCommand):
    """Command to cancel a scheduled background task."""
    task_id: str
    reason: str = "user_request"
    force_cancel: bool = False


@dataclass
class RetryBackgroundTaskCommand(BaseCommand):
    """Command to retry a failed background task."""
    task_id: str
    reset_retry_count: bool = False
    delay_seconds: int = 0
    updated_args: List[Any] = None
    updated_kwargs: Dict[str, Any] = None


# File Retrieval Commands
@dataclass
class RetrieveFileCommand(BaseCommand):
    """Command to retrieve a file for download/viewing."""
    file_uid: str
    file_type: FileType
    requester_ip: Optional[str] = None
    access_purpose: str = "download"  # download, view, edit
    include_metadata: bool = False


@dataclass
class RetrieveFileContentCommand(BaseCommand):
    """Command to retrieve file content."""
    file_uid: str
    file_path: str
    encoding: str = "utf-8"
    chunk_size: Optional[int] = None


@dataclass
class StreamFileCommand(BaseCommand):
    """Command to stream file content."""
    file_uid: str
    file_path: str
    chunk_size: int = 8192
    start_byte: int = 0
    end_byte: Optional[int] = None


# System Commands
@dataclass
class PerformHealthCheckCommand(BaseCommand):
    """Command to perform system health check."""
    check_types: List[str]  # database, redis, file_system, external_services
    detailed_report: bool = False
    timeout_per_check: int = 30


@dataclass
class CleanupTempFilesCommand(BaseCommand):
    """Command to cleanup temporary files."""
    older_than_hours: int = 24
    file_patterns: List[str] = None
    dry_run: bool = False
    target_directories: List[str] = None


@dataclass
class BackupDataCommand(BaseCommand):
    """Command to backup system data."""
    backup_type: str  # full, incremental, differential
    include_files: bool = True
    include_database: bool = True
    backup_location: str
    compression_level: int = 6


@dataclass
class RestoreDataCommand(BaseCommand):
    """Command to restore system data."""
    backup_location: str
    restore_type: str  # full, selective
    target_timestamp: Optional[datetime] = None
    restore_files: bool = True
    restore_database: bool = True
    verify_integrity: bool = True


# Workflow Commands
@dataclass
class StartCVWorkflowCommand(BaseCommand):
    """Command to start a complete CV workflow."""
    workflow_uid: str
    workflow_type: str  # upload_markdown, submit_form
    input_data: Dict[str, Any]
    expected_outputs: List[FileType]
    workflow_options: Dict[str, Any] = None


@dataclass
class ResumeWorkflowCommand(BaseCommand):
    """Command to resume a paused/failed workflow."""
    workflow_uid: str
    resume_from_step: str
    updated_input_data: Dict[str, Any] = None
    skip_completed_steps: bool = True


@dataclass
class CancelWorkflowCommand(BaseCommand):
    """Command to cancel a running workflow."""
    workflow_uid: str
    cleanup_partial_results: bool = True
    cancellation_reason: str = "user_request"


# Notification Commands
@dataclass
class SendNotificationCommand(BaseCommand):
    """Command to send notification."""
    notification_type: str  # email, webhook, system
    recipient: str
    subject: str
    message: str
    notification_data: Dict[str, Any] = None
    delivery_options: Dict[str, Any] = None


@dataclass
class LogEventCommand(BaseCommand):
    """Command to log domain events."""
    event_type: str
    event_data: Dict[str, Any]
    log_level: str = "INFO"
    correlation_id: Optional[str] = None
    additional_metadata: Dict[str, Any] = None


# Configuration Commands
@dataclass
class UpdateConfigurationCommand(BaseCommand):
    """Command to update system configuration."""
    config_section: str
    config_updates: Dict[str, Any]
    validate_before_apply: bool = True
    restart_required: bool = False


@dataclass
class ReloadConfigurationCommand(BaseCommand):
    """Command to reload configuration from source."""
    config_sections: List[str] = None  # None means all sections
    validate_after_reload: bool = True
    notify_components: bool = True


# Monitoring Commands
@dataclass
class CollectMetricsCommand(BaseCommand):
    """Command to collect system metrics."""
    metric_types: List[str]  # performance, usage, errors
    time_range_minutes: int = 60
    aggregation_level: str = "minute"  # second, minute, hour
    include_predictions: bool = False


@dataclass
class GenerateReportCommand(BaseCommand):
    """Command to generate system reports."""
    report_type: str  # usage, performance, errors, audit
    time_range_start: datetime
    time_range_end: datetime
    report_format: str = "json"  # json, html, pdf
    include_charts: bool = True
    email_recipients: List[str] = None