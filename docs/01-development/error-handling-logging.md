# Error Handling & Logging

## Overview

Proper error handling and logging are crucial for maintaining, debugging, and monitoring applications. This guide covers structured logging, error classification, and monitoring integration patterns.

## Error Classification

### 1. Error Types
```python
# backend/app/exceptions.py
from enum import Enum
from typing import Optional, Dict, Any

class ErrorType(Enum):
    VALIDATION_ERROR = "validation_error"
    AUTHENTICATION_ERROR = "authentication_error"
    AUTHORIZATION_ERROR = "authorization_error"
    RESOURCE_NOT_FOUND = "resource_not_found"
    BUSINESS_LOGIC_ERROR = "business_logic_error"
    EXTERNAL_SERVICE_ERROR = "external_service_error"
    DATABASE_ERROR = "database_error"
    SYSTEM_ERROR = "system_error"

class BaseApplicationError(Exception):
    """Base exception for all application errors"""
    
    def __init__(
        self,
        message: str,
        error_type: ErrorType,
        details: Optional[Dict[str, Any]] = None,
        status_code: int = 500
    ):
        self.message = message
        self.error_type = error_type
        self.details = details or {}
        self.status_code = status_code
        super().__init__(self.message)

class ValidationError(BaseApplicationError):
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(message, ErrorType.VALIDATION_ERROR, details, 400)

class AuthenticationError(BaseApplicationError):
    def __init__(self, message: str = "Authentication required"):
        super().__init__(message, ErrorType.AUTHENTICATION_ERROR, status_code=401)

class AuthorizationError(BaseApplicationError):
    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(message, ErrorType.AUTHORIZATION_ERROR, status_code=403)

class ResourceNotFoundError(BaseApplicationError):
    def __init__(self, resource: str, identifier: str):
        message = f"{resource} with identifier {identifier} not found"
        super().__init__(message, ErrorType.RESOURCE_NOT_FOUND, status_code=404)
```

### 2. Error Handler Middleware
```python
# backend/app/middleware/error_handler.py
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import logging
import traceback
from app.exceptions import BaseApplicationError

logger = logging.getLogger(__name__)

async def error_handler_middleware(request: Request, call_next):
    """Global error handling middleware"""
    try:
        response = await call_next(request)
        return response
    except BaseApplicationError as e:
        logger.warning(f"Application error: {e.message}", extra={
            "error_type": e.error_type.value,
            "details": e.details,
            "path": request.url.path,
            "method": request.method
        })
        return JSONResponse(
            status_code=e.status_code,
            content={
                "success": False,
                "error": {
                    "type": e.error_type.value,
                    "message": e.message,
                    "details": e.details
                }
            }
        )
    except HTTPException as e:
        logger.warning(f"HTTP error: {e.detail}", extra={
            "status_code": e.status_code,
            "path": request.url.path,
            "method": request.method
        })
        return JSONResponse(
            status_code=e.status_code,
            content={
                "success": False,
                "error": {
                    "type": "http_error",
                    "message": e.detail
                }
            }
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", extra={
            "traceback": traceback.format_exc(),
            "path": request.url.path,
            "method": request.method
        })
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "type": "internal_error",
                    "message": "An unexpected error occurred"
                }
            }
        )
```

## Structured Logging

### 1. Logging Configuration
```python
# backend/app/core/logging_config.py
import logging
import logging.config
from typing import Dict, Any
import json
import os
from datetime import datetime

class JSONFormatter(logging.Formatter):
    """Custom JSON formatter for structured logging"""
    
    def format(self, record):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
            "process_id": os.getpid(),
            "thread_id": record.thread,
        }
        
        # Add extra fields if they exist
        if hasattr(record, 'user_id'):
            log_entry["user_id"] = record.user_id
        if hasattr(record, 'request_id'):
            log_entry["request_id"] = record.request_id
        if hasattr(record, 'operation'):
            log_entry["operation"] = record.operation
        
        # Add exception information
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        
        # Add any additional context
        if hasattr(record, 'context'):
            log_entry.update(record.context)
        
        return json.dumps(log_entry)

def setup_logging():
    """Setup logging configuration"""
    logging_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "json": {
                "()": JSONFormatter,
            },
            "standard": {
                "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "json" if os.getenv("JSON_LOGS", "true") == "true" else "standard",
                "stream": "ext://sys.stdout"
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "json",
                "filename": "logs/app.log",
                "maxBytes": 10485760,  # 10MB
                "backupCount": 5
            }
        },
        "root": {
            "level": os.getenv("LOG_LEVEL", "INFO"),
            "handlers": ["console", "file"]
        },
        "loggers": {
            "uvicorn": {
                "level": "INFO",
                "handlers": ["console"],
                "propagate": False
            },
            "sqlalchemy.engine": {
                "level": "WARNING",
                "handlers": ["console"],
                "propagate": False
            }
        }
    }
    
    logging.config.dictConfig(logging_config)
```

### 2. Contextual Logging
```python
# backend/app/utils/logger.py
import logging
from contextvars import ContextVar
from typing import Dict, Any, Optional
import uuid

# Context variables for request tracking
request_id_var: ContextVar[str] = ContextVar('request_id', default="")
user_id_var: ContextVar[str] = ContextVar('user_id', default="")

class ContextualLogger:
    """Logger that automatically includes context information"""
    
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
    
    def _log_with_context(self, level: int, message: str, **kwargs):
        """Log message with context information"""
        extra = {
            "request_id": request_id_var.get(),
            "user_id": user_id_var.get(),
        }
        extra.update(kwargs)
        self.logger.log(level, message, extra=extra)
    
    def info(self, message: str, **kwargs):
        self._log_with_context(logging.INFO, message, **kwargs)
    
    def warning(self, message: str, **kwargs):
        self._log_with_context(logging.WARNING, message, **kwargs)
    
    def error(self, message: str, **kwargs):
        self._log_with_context(logging.ERROR, message, **kwargs)
    
    def debug(self, message: str, **kwargs):
        self._log_with_context(logging.DEBUG, message, **kwargs)

# Usage
logger = ContextualLogger(__name__)

def set_request_context(request_id: str, user_id: Optional[str] = None):
    """Set request context for logging"""
    request_id_var.set(request_id)
    if user_id:
        user_id_var.set(user_id)
```

### 3. Request Logging Middleware
```python
# backend/app/middleware/request_logging.py
import time
import uuid
from fastapi import Request
from app.utils.logger import logger, set_request_context

async def request_logging_middleware(request: Request, call_next):
    """Middleware to log requests and responses"""
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Set request context
    set_request_context(request_id)
    
    # Log request
    logger.info("Request started", extra={
        "method": request.method,
        "path": request.url.path,
        "query_params": str(request.query_params),
        "client_host": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent")
    })
    
    # Process request
    try:
        response = await call_next(request)
        duration = time.time() - start_time
        
        # Log successful response
        logger.info("Request completed", extra={
            "status_code": response.status_code,
            "duration_ms": round(duration * 1000, 2)
        })
        
        return response
    except Exception as e:
        duration = time.time() - start_time
        
        # Log error
        logger.error("Request failed", extra={
            "error": str(e),
            "duration_ms": round(duration * 1000, 2)
        })
        raise
```

## Database Error Handling

### 1. Database Exception Mapping
```python
# backend/app/utils/db_error_handler.py
from sqlalchemy.exc import (
    IntegrityError, 
    DataError, 
    DatabaseError,
    InvalidRequestError
)
from app.exceptions import ValidationError, ResourceNotFoundError
from app.utils.logger import logger

def handle_database_error(error: Exception, operation: str = "database_operation"):
    """Convert database errors to application errors"""
    logger.error(f"Database error in {operation}", extra={
        "error_type": type(error).__name__,
        "error_message": str(error),
        "operation": operation
    })
    
    if isinstance(error, IntegrityError):
        # Handle constraint violations
        if "foreign key constraint" in str(error).lower():
            raise ValidationError("Referenced resource does not exist")
        elif "unique constraint" in str(error).lower():
            raise ValidationError("Resource already exists")
        else:
            raise ValidationError("Data integrity violation")
    
    elif isinstance(error, DataError):
        raise ValidationError("Invalid data format")
    
    elif isinstance(error, InvalidRequestError):
        raise ValidationError("Invalid database request")
    
    else:
        # Generic database error
        raise DatabaseError("Database operation failed")

# Usage decorator
def handle_db_errors(operation: str):
    """Decorator to handle database errors"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            try:
                return await func(*args, **kwargs)
            except Exception as e:
                handle_database_error(e, operation)
        return wrapper
    return decorator
```

## Business Logic Error Handling

### 1. Domain-Specific Errors
```python
# backend/app/services/user_service.py
from app.exceptions import ValidationError, BusinessLogicError
from app.utils.logger import logger

class UserService:
    @staticmethod
    async def create_user(user_data: dict):
        """Create a new user with business logic validation"""
        try:
            # Validate business rules
            if await UserService._email_exists(user_data["email"]):
                raise ValidationError(
                    "Email already registered",
                    details={"field": "email", "value": user_data["email"]}
                )
            
            if not UserService._is_valid_age(user_data.get("age")):
                raise ValidationError(
                    "User must be at least 18 years old",
                    details={"field": "age", "minimum": 18}
                )
            
            # Create user
            user = await UserRepository.create(user_data)
            
            logger.info("User created successfully", extra={
                "user_id": user.id,
                "email": user.email,
                "operation": "create_user"
            })
            
            return user
            
        except ValidationError:
            # Re-raise validation errors
            raise
        except Exception as e:
            logger.error("User creation failed", extra={
                "error": str(e),
                "user_data": {k: v for k, v in user_data.items() if k != "password"},
                "operation": "create_user"
            })
            raise BusinessLogicError("User creation failed")
```

## Frontend Error Handling

### 1. API Error Handler
```typescript
// frontend/src/lib/api-client.ts
interface ApiError {
  type: string;
  message: string;
  details?: Record<string, any>;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new ApiError(
          data.error?.message || 'Request failed',
          data.error?.type || 'unknown_error',
          data.error?.details
        );
      }
      
      return data.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors
      if (error instanceof TypeError) {
        throw new ApiError('Network error', 'network_error');
      }
      
      throw new ApiError('Unexpected error', 'unexpected_error');
    }
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public type: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

### 2. Error Boundary
```typescript
// frontend/src/components/ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    
    // Log to external service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      this.logErrorToService(error, errorInfo);
    }
  }
  
  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // Implementation depends on your error tracking service
    // Example: Sentry, LogRocket, Bugsnag
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry, but there was an error loading this page.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

## Monitoring Integration

### 1. Error Metrics
```python
# backend/app/utils/metrics.py
from prometheus_client import Counter, Histogram, Gauge
import time

# Error metrics
error_counter = Counter(
    'app_errors_total',
    'Total number of errors',
    ['error_type', 'endpoint', 'method']
)

request_duration = Histogram(
    'app_request_duration_seconds',
    'Request duration in seconds',
    ['endpoint', 'method', 'status_code']
)

active_connections = Gauge(
    'app_active_connections',
    'Number of active connections'
)

def track_error(error_type: str, endpoint: str, method: str):
    """Track error occurrence"""
    error_counter.labels(
        error_type=error_type,
        endpoint=endpoint,
        method=method
    ).inc()

def track_request(endpoint: str, method: str, status_code: int, duration: float):
    """Track request metrics"""
    request_duration.labels(
        endpoint=endpoint,
        method=method,
        status_code=status_code
    ).observe(duration)
```

This comprehensive error handling and logging system provides robust error management, detailed logging, and effective monitoring for both development and production environments. 