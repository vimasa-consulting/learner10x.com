# Third-Party Integrations

## Overview

Third-party integrations are essential for modern applications. This guide covers common integration patterns, authentication methods, and error handling strategies for external services like payment processors, email services, and APIs.

## Common Integration Patterns

### 1. Payment Processing (Stripe)
```python
# backend/app/services/payment_service.py
import stripe
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentService:
    @staticmethod
    async def create_payment_intent(amount: int, currency: str = "usd"):
        """Create a payment intent for client-side confirmation"""
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                metadata={'integration_check': 'accept_a_payment'}
            )
            return {"client_secret": intent.client_secret}
        except stripe.error.StripeError as e:
            raise PaymentError(f"Payment failed: {str(e)}")

    @staticmethod
    async def handle_webhook(payload: bytes, signature: str):
        """Handle Stripe webhook events"""
        try:
            event = stripe.Webhook.construct_event(
                payload, signature, settings.STRIPE_WEBHOOK_SECRET
            )
            
            if event['type'] == 'payment_intent.succeeded':
                payment_intent = event['data']['object']
                # Handle successful payment
                await PaymentService.process_successful_payment(payment_intent)
                
            return {"received": True}
        except ValueError:
            raise WebhookError("Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise WebhookError("Invalid signature")
```

### 2. Email Service (SendGrid)
```python
# backend/app/services/email_service.py
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content
from app.core.config import settings

class EmailService:
    def __init__(self):
        self.sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
    
    async def send_email(self, to_email: str, subject: str, content: str):
        """Send email using SendGrid"""
        try:
            from_email = Email(settings.FROM_EMAIL)
            to_email = To(to_email)
            content = Content("text/html", content)
            
            mail = Mail(from_email, to_email, subject, content)
            response = self.sg.send(mail)
            
            return {"message_id": response.headers.get('X-Message-Id')}
        except Exception as e:
            raise EmailError(f"Email sending failed: {str(e)}")
    
    async def send_template_email(self, to_email: str, template_id: str, data: dict):
        """Send email using SendGrid template"""
        try:
            message = Mail(
                from_email=settings.FROM_EMAIL,
                to_emails=to_email
            )
            message.template_id = template_id
            message.dynamic_template_data = data
            
            response = self.sg.send(message)
            return {"message_id": response.headers.get('X-Message-Id')}
        except Exception as e:
            raise EmailError(f"Template email failed: {str(e)}")
```

### 3. File Storage (AWS S3)
```python
# backend/app/services/storage_service.py
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

class StorageService:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        self.bucket_name = settings.S3_BUCKET_NAME
    
    async def upload_file(self, file_content: bytes, file_key: str, content_type: str):
        """Upload file to S3"""
        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_key,
                Body=file_content,
                ContentType=content_type
            )
            return self.get_file_url(file_key)
        except ClientError as e:
            raise StorageError(f"File upload failed: {str(e)}")
    
    def get_file_url(self, file_key: str) -> str:
        """Generate signed URL for file access"""
        try:
            return self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': file_key},
                ExpiresIn=3600  # 1 hour
            )
        except ClientError as e:
            raise StorageError(f"URL generation failed: {str(e)}")
```

## Authentication Patterns

### 1. OAuth 2.0 (Google, GitHub)
```python
# backend/app/services/oauth_service.py
import httpx
from app.core.config import settings

class OAuthService:
    @staticmethod
    async def exchange_code_for_token(code: str, provider: str):
        """Exchange OAuth code for access token"""
        if provider == "google":
            return await OAuthService._google_token_exchange(code)
        elif provider == "github":
            return await OAuthService._github_token_exchange(code)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    @staticmethod
    async def _google_token_exchange(code: str):
        """Exchange Google OAuth code for token"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "code": code,
                    "grant_type": "authorization_code",
                    "redirect_uri": settings.GOOGLE_REDIRECT_URI
                }
            )
            return response.json()
    
    @staticmethod
    async def get_user_info(access_token: str, provider: str):
        """Get user information from OAuth provider"""
        if provider == "google":
            return await OAuthService._get_google_user_info(access_token)
        elif provider == "github":
            return await OAuthService._get_github_user_info(access_token)
    
    @staticmethod
    async def _get_google_user_info(access_token: str):
        """Get Google user information"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            return response.json()
```

### 2. API Key Authentication
```python
# backend/app/services/api_client.py
import httpx
from typing import Optional
from app.core.config import settings

class APIClient:
    def __init__(self, base_url: str, api_key: str, timeout: int = 30):
        self.base_url = base_url
        self.api_key = api_key
        self.timeout = timeout
        self.client = httpx.AsyncClient(
            base_url=base_url,
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=timeout
        )
    
    async def get(self, endpoint: str, params: Optional[dict] = None):
        """Make GET request to external API"""
        try:
            response = await self.client.get(endpoint, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise APIError(f"API request failed: {e.response.status_code}")
        except httpx.TimeoutException:
            raise APIError("API request timed out")
    
    async def post(self, endpoint: str, data: dict):
        """Make POST request to external API"""
        try:
            response = await self.client.post(endpoint, json=data)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise APIError(f"API request failed: {e.response.status_code}")
    
    async def close(self):
        """Close HTTP client"""
        await self.client.aclose()
```

## Error Handling & Resilience

### 1. Retry Logic with Exponential Backoff
```python
# backend/app/utils/retry.py
import asyncio
import random
from functools import wraps
from typing import Callable, Any

def retry_with_backoff(max_retries: int = 3, base_delay: float = 1.0):
    """Decorator for retrying functions with exponential backoff"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs) -> Any:
            for attempt in range(max_retries):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise e
                    
                    # Exponential backoff with jitter
                    delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    await asyncio.sleep(delay)
            
        return wrapper
    return decorator

# Usage
@retry_with_backoff(max_retries=3, base_delay=1.0)
async def call_external_api():
    # API call that might fail
    pass
```

### 2. Circuit Breaker Pattern
```python
# backend/app/utils/circuit_breaker.py
import time
from enum import Enum
from typing import Callable, Any

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, timeout: float = 60.0):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    async def call(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with circuit breaker protection"""
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerError("Circuit breaker is open")
        
        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e
    
    def _on_success(self):
        """Handle successful call"""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        """Handle failed call"""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
```

## Rate Limiting & Throttling

### 1. Client-Side Rate Limiting
```python
# backend/app/utils/rate_limiter.py
import asyncio
from collections import defaultdict
from typing import Dict, Optional

class RateLimiter:
    def __init__(self, calls_per_second: int = 10):
        self.calls_per_second = calls_per_second
        self.last_call_times: Dict[str, float] = defaultdict(float)
        self.call_counts: Dict[str, int] = defaultdict(int)
    
    async def acquire(self, key: str) -> bool:
        """Acquire permission to make a call"""
        current_time = asyncio.get_event_loop().time()
        
        # Reset counter if a second has passed
        if current_time - self.last_call_times[key] >= 1.0:
            self.call_counts[key] = 0
            self.last_call_times[key] = current_time
        
        if self.call_counts[key] < self.calls_per_second:
            self.call_counts[key] += 1
            return True
        
        return False
    
    async def wait_if_needed(self, key: str):
        """Wait if rate limit is exceeded"""
        if not await self.acquire(key):
            sleep_time = 1.0 - (asyncio.get_event_loop().time() - self.last_call_times[key])
            if sleep_time > 0:
                await asyncio.sleep(sleep_time)
            await self.acquire(key)
```

## Configuration Management

### 1. Environment-Based Configuration
```python
# backend/app/core/config.py
from pydantic import BaseSettings, Field
from typing import Optional

class IntegrationSettings(BaseSettings):
    # Stripe
    stripe_secret_key: str = Field(..., env="STRIPE_SECRET_KEY")
    stripe_publishable_key: str = Field(..., env="STRIPE_PUBLISHABLE_KEY")
    stripe_webhook_secret: str = Field(..., env="STRIPE_WEBHOOK_SECRET")
    
    # SendGrid
    sendgrid_api_key: str = Field(..., env="SENDGRID_API_KEY")
    from_email: str = Field(..., env="FROM_EMAIL")
    
    # AWS S3
    aws_access_key_id: str = Field(..., env="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: str = Field(..., env="AWS_SECRET_ACCESS_KEY")
    aws_region: str = Field("us-east-1", env="AWS_REGION")
    s3_bucket_name: str = Field(..., env="S3_BUCKET_NAME")
    
    # OAuth
    google_client_id: str = Field(..., env="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., env="GOOGLE_CLIENT_SECRET")
    google_redirect_uri: str = Field(..., env="GOOGLE_REDIRECT_URI")
    
    # External APIs
    external_api_base_url: str = Field(..., env="EXTERNAL_API_BASE_URL")
    external_api_key: str = Field(..., env="EXTERNAL_API_KEY")
    external_api_timeout: int = Field(30, env="EXTERNAL_API_TIMEOUT")
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = IntegrationSettings()
```

## Testing External Integrations

### 1. Mock External Services
```python
# tests/conftest.py
import pytest
from unittest.mock import AsyncMock, patch

@pytest.fixture
def mock_stripe():
    with patch('stripe.PaymentIntent.create') as mock_create:
        mock_create.return_value = {
            'client_secret': 'pi_test_1234567890_secret_abcdef'
        }
        yield mock_create

@pytest.fixture
def mock_sendgrid():
    with patch('sendgrid.SendGridAPIClient.send') as mock_send:
        mock_response = AsyncMock()
        mock_response.headers = {'X-Message-Id': 'test_message_id'}
        mock_send.return_value = mock_response
        yield mock_send

# tests/test_integrations.py
async def test_payment_intent_creation(mock_stripe):
    """Test payment intent creation"""
    result = await PaymentService.create_payment_intent(1000)
    assert 'client_secret' in result
    mock_stripe.assert_called_once_with(
        amount=1000,
        currency='usd',
        metadata={'integration_check': 'accept_a_payment'}
    )
```

### 2. Integration Testing with Test Environments
```python
# tests/integration/test_external_apis.py
import pytest
from app.services.email_service import EmailService
from app.core.config import settings

@pytest.mark.integration
@pytest.mark.skipif(not settings.TESTING_WITH_EXTERNAL_APIS, reason="External API testing disabled")
async def test_send_email_integration():
    """Test actual email sending (requires test API keys)"""
    email_service = EmailService()
    result = await email_service.send_email(
        to_email="test@example.com",
        subject="Test Email",
        content="This is a test email"
    )
    assert 'message_id' in result
```

## Monitoring & Logging

### 1. Integration Monitoring
```python
# backend/app/utils/monitoring.py
import logging
import time
from functools import wraps

logger = logging.getLogger(__name__)

def monitor_integration(service_name: str):
    """Decorator to monitor external service calls"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            try:
                result = await func(*args, **kwargs)
                duration = time.time() - start_time
                logger.info(f"{service_name} call succeeded in {duration:.2f}s")
                return result
            except Exception as e:
                duration = time.time() - start_time
                logger.error(f"{service_name} call failed after {duration:.2f}s: {str(e)}")
                raise
        return wrapper
    return decorator

# Usage
@monitor_integration("stripe")
async def create_payment_intent(amount: int):
    # Implementation
    pass
```

This guide provides a solid foundation for integrating with external services while maintaining reliability, security, and observability. 