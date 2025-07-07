# API Documentation Standards

## Overview

Comprehensive API documentation is crucial for developer experience, adoption, and maintenance. This guide establishes standards for documenting APIs using OpenAPI/Swagger and other best practices.

## OpenAPI/Swagger Standards

### Basic Structure
```yaml
openapi: 3.0.3
info:
  title: Fullstack Template API
  version: 1.0.0
  description: |
    A comprehensive API for the fullstack template application.
    
    ## Authentication
    This API uses Bearer token authentication. Include your token in the Authorization header:
    ```
    Authorization: Bearer <your_token>
    ```
    
    ## Rate Limiting
    - 1000 requests per hour for authenticated users
    - 100 requests per hour for unauthenticated users
    
  contact:
    name: API Support
    email: api-support@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server
  - url: http://localhost:8000/api/v1
    description: Development server
```

### Path Documentation
```yaml
paths:
  /users:
    get:
      tags:
        - Users
      summary: List users
      description: |
        Retrieve a paginated list of users. Supports filtering and sorting.
        
        ### Filtering
        - `email`: Filter by email address (partial match)
        - `status`: Filter by user status (active, inactive, pending)
        
        ### Sorting
        - `created_at`: Sort by creation date (asc, desc)
        - `email`: Sort by email address (asc, desc)
      parameters:
        - name: page
          in: query
          description: Page number for pagination
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
            example: 1
        - name: limit
          in: query
          description: Number of items per page
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
            example: 20
        - name: email
          in: query
          description: Filter by email address (partial match)
          required: false
          schema:
            type: string
            example: "john@example.com"
      responses:
        '200':
          description: Successfully retrieved users
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsersResponse'
              examples:
                default:
                  summary: Default response
                  value:
                    success: true
                    data:
                      users:
                        - id: 1
                          email: "john@example.com"
                          firstName: "John"
                          lastName: "Doe"
                          createdAt: "2024-01-01T00:00:00Z"
                      pagination:
                        page: 1
                        limit: 20
                        total: 100
                        totalPages: 5
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
```

### Schema Documentation
```yaml
components:
  schemas:
    User:
      type: object
      required:
        - id
        - email
        - firstName
        - lastName
      properties:
        id:
          type: integer
          format: int64
          description: Unique identifier for the user
          example: 123
        email:
          type: string
          format: email
          description: User's email address
          example: "john@example.com"
        firstName:
          type: string
          minLength: 1
          maxLength: 50
          description: User's first name
          example: "John"
        lastName:
          type: string
          minLength: 1
          maxLength: 50
          description: User's last name
          example: "Doe"
        avatar:
          type: string
          format: uri
          nullable: true
          description: URL to user's avatar image
          example: "https://example.com/avatars/123.jpg"
        createdAt:
          type: string
          format: date-time
          description: When the user was created
          readOnly: true
          example: "2024-01-01T00:00:00Z"
        updatedAt:
          type: string
          format: date-time
          description: When the user was last updated
          readOnly: true
          example: "2024-01-02T00:00:00Z"
      example:
        id: 123
        email: "john@example.com"
        firstName: "John"
        lastName: "Doe"
        avatar: "https://example.com/avatars/123.jpg"
        createdAt: "2024-01-01T00:00:00Z"
        updatedAt: "2024-01-02T00:00:00Z"

    ErrorResponse:
      type: object
      required:
        - success
        - message
      properties:
        success:
          type: boolean
          example: false
        message:
          type: string
          description: Human-readable error message
          example: "Invalid request parameters"
        errors:
          type: object
          description: Field-specific validation errors
          additionalProperties:
            type: string
          example:
            email: "Email is required"
            password: "Password must be at least 8 characters"
        code:
          type: string
          description: Error code for programmatic handling
          example: "VALIDATION_ERROR"
```

### Security Documentation
```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: |
        JWT token-based authentication. Obtain a token by authenticating with the `/auth/login` endpoint.
        
        The token should be included in the Authorization header:
        ```
        Authorization: Bearer <token>
        ```
        
        Tokens expire after 24 hours and need to be refreshed using the `/auth/refresh` endpoint.

security:
  - BearerAuth: []
```

## FastAPI Integration

### Automatic Documentation
```python
# main.py
from fastapi import FastAPI
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

app = FastAPI(
    title="Fullstack Template API",
    version="1.0.0",
    description="""
    A comprehensive API for the fullstack template application.
    
    ## Features
    - User authentication and management
    - Content creation and management
    - Real-time notifications
    - File upload and processing
    
    ## Getting Started
    1. Register a new account or login with existing credentials
    2. Obtain an authentication token
    3. Use the token in the Authorization header for protected endpoints
    """,
    contact={
        "name": "API Support",
        "email": "api-support@example.com",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    docs_url="/docs",
    redoc_url="/redoc",
)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="Fullstack Template API",
        version="1.0.0",
        description=app.description,
        routes=app.routes,
    )
    
    # Add custom examples
    openapi_schema["info"]["x-logo"] = {
        "url": "https://example.com/logo.png"
    }
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
```

### Endpoint Documentation
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List

router = APIRouter(prefix="/users", tags=["Users"])

class UserResponse(BaseModel):
    """User response model"""
    id: int = Field(..., description="Unique identifier for the user", example=123)
    email: str = Field(..., description="User's email address", example="john@example.com")
    first_name: str = Field(..., description="User's first name", example="John")
    last_name: str = Field(..., description="User's last name", example="Doe")
    created_at: datetime = Field(..., description="When the user was created")
    
    class Config:
        schema_extra = {
            "example": {
                "id": 123,
                "email": "john@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "created_at": "2024-01-01T00:00:00Z"
            }
        }

@router.get(
    "/",
    response_model=List[UserResponse],
    summary="List users",
    description="""
    Retrieve a paginated list of users with optional filtering and sorting.
    
    **Filtering Options:**
    - `email`: Partial match on email address
    - `status`: Filter by user status (active, inactive, pending)
    
    **Sorting Options:**
    - `created_at`: Sort by creation date (asc, desc)
    - `email`: Sort by email address (asc, desc)
    
    **Rate Limiting:**
    This endpoint is rate limited to 100 requests per minute per user.
    """,
    responses={
        200: {
            "description": "Successfully retrieved users",
            "content": {
                "application/json": {
                    "examples": {
                        "success": {
                            "summary": "Successful response",
                            "value": {
                                "success": True,
                                "data": [
                                    {
                                        "id": 123,
                                        "email": "john@example.com",
                                        "first_name": "John",
                                        "last_name": "Doe",
                                        "created_at": "2024-01-01T00:00:00Z"
                                    }
                                ],
                                "pagination": {
                                    "page": 1,
                                    "limit": 20,
                                    "total": 100,
                                    "total_pages": 5
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {"description": "Invalid request parameters"},
        401: {"description": "Authentication required"},
        500: {"description": "Internal server error"}
    }
)
async def list_users(
    page: int = Query(1, ge=1, description="Page number for pagination"),
    limit: int = Query(20, ge=1, le=100, description="Number of items per page"),
    email: Optional[str] = Query(None, description="Filter by email address"),
    current_user: User = Depends(get_current_user)
):
    """
    List users with pagination and filtering.
    
    Args:
        page: Page number (starts from 1)
        limit: Items per page (1-100)
        email: Optional email filter
        current_user: Authenticated user from dependency
    
    Returns:
        List of users with pagination metadata
        
    Raises:
        HTTPException: 400 if parameters are invalid
        HTTPException: 401 if user is not authenticated
    """
    # Implementation here
    pass
```

## Documentation Best Practices

### Writing Guidelines

#### Clear Descriptions
```yaml
# Good
description: |
  Create a new user account. The email must be unique and will be used for login.
  
  **Validation Rules:**
  - Email must be valid format
  - Password must be at least 8 characters
  - Password must contain at least one uppercase letter, one lowercase letter, and one number
  
  **Side Effects:**
  - Sends welcome email to the user
  - Creates default user preferences
  - Generates authentication token

# Bad
description: Creates user
```

#### Comprehensive Examples
```yaml
examples:
  valid_request:
    summary: Valid user creation request
    value:
      email: "john@example.com"
      password: "SecurePass123!"
      firstName: "John"
      lastName: "Doe"
  invalid_email:
    summary: Invalid email format
    value:
      email: "invalid-email"
      password: "SecurePass123!"
      firstName: "John"
      lastName: "Doe"
```

#### Error Documentation
```yaml
responses:
  '400':
    description: Validation error
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
        examples:
          validation_error:
            summary: Field validation failed
            value:
              success: false
              message: "Validation failed"
              errors:
                email: "Email is required"
                password: "Password must be at least 8 characters"
              code: "VALIDATION_ERROR"
          duplicate_email:
            summary: Email already exists
            value:
              success: false
              message: "Email already registered"
              code: "DUPLICATE_EMAIL"
```

### Code Documentation

#### Docstring Standards
```python
async def create_user(user_data: UserCreate, db: Session = Depends(get_db)) -> User:
    """
    Create a new user account.
    
    This function creates a new user account with the provided information.
    It validates the input data, checks for email uniqueness, hashes the password,
    and stores the user in the database.
    
    Args:
        user_data (UserCreate): User registration data including email, password,
            and personal information. Must pass validation rules.
        db (Session): Database session dependency for executing queries.
    
    Returns:
        User: Newly created user object with generated ID and timestamps.
    
    Raises:
        HTTPException: 400 if validation fails or email already exists.
        HTTPException: 500 if database operation fails.
    
    Example:
        ```python
        user_data = UserCreate(
            email="john@example.com",
            password="SecurePass123!",
            first_name="John",
            last_name="Doe"
        )
        new_user = await create_user(user_data, db)
        ```
    
    Side Effects:
        - Sends welcome email to the user
        - Creates default user preferences
        - Logs user creation event
    
    Note:
        The password is automatically hashed using bcrypt before storage.
        The original password is never stored in plain text.
    """
    # Implementation here
    pass
```

## Testing Documentation

### API Test Examples
```python
# tests/test_users_api.py
"""
Test cases for the Users API endpoints.

This module contains comprehensive tests for all user-related API endpoints,
including authentication, validation, and edge cases.
"""

def test_create_user_success():
    """
    Test successful user creation with valid data.
    
    **Scenario**: User provides all required fields with valid data
    **Expected**: 201 status code and user object returned
    **API Endpoint**: POST /users
    """
    response = client.post("/users", json={
        "email": "test@example.com",
        "password": "SecurePass123!",
        "firstName": "Test",
        "lastName": "User"
    })
    
    assert response.status_code == 201
    assert response.json()["success"] is True
    assert "id" in response.json()["data"]

def test_create_user_invalid_email():
    """
    Test user creation with invalid email format.
    
    **Scenario**: User provides invalid email format
    **Expected**: 400 status code with validation error
    **API Endpoint**: POST /users
    """
    response = client.post("/users", json={
        "email": "invalid-email",
        "password": "SecurePass123!",
        "firstName": "Test",
        "lastName": "User"
    })
    
    assert response.status_code == 400
    assert "email" in response.json()["errors"]
```

## Tools and Automation

### Documentation Generation
```yaml
# .github/workflows/docs.yml
name: Generate API Documentation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  generate-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install fastapi uvicorn
        pip install -r backend/requirements.txt
    
    - name: Generate OpenAPI spec
      run: |
        cd backend
        python -c "
        from app.main import app
        import json
        with open('../docs/openapi.json', 'w') as f:
            json.dump(app.openapi(), f, indent=2)
        "
    
    - name: Generate documentation
      uses: redocly/redoc-cli-github-action@v0.2.5
      with:
        args: 'build docs/openapi.json --output docs/api-docs.html'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs
```

### Validation Tools
```bash
# Package.json scripts for API documentation
{
  "scripts": {
    "docs:validate": "swagger-codegen validate docs/openapi.json",
    "docs:generate": "redoc-cli build docs/openapi.json --output docs/api-docs.html",
    "docs:serve": "redoc-cli serve docs/openapi.json",
    "docs:lint": "spectral lint docs/openapi.json"
  }
}
```

## Versioning Strategy

### API Versioning
```yaml
# Version in URL path
servers:
  - url: https://api.example.com/v1
  - url: https://api.example.com/v2

# Version in header
parameters:
  - name: API-Version
    in: header
    schema:
      type: string
      enum: ["v1", "v2"]
      default: "v1"
```

### Documentation Versioning
```yaml
# Multiple OpenAPI files for different versions
docs/
├── api/
│   ├── v1/
│   │   └── openapi.yaml
│   ├── v2/
│   │   └── openapi.yaml
│   └── latest/
│       └── openapi.yaml
└── generated/
    ├── v1/
    │   └── index.html
    └── v2/
        └── index.html
```

## Maintenance

### Regular Updates
- **Weekly**: Review and update examples
- **Monthly**: Check for outdated endpoints
- **Quarterly**: Major documentation review
- **Per Release**: Update version and changelog

### Quality Checklist
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Error codes documented
- [ ] Authentication explained
- [ ] Rate limiting documented
- [ ] Deprecation notices included
- [ ] Breaking changes highlighted
- [ ] Code examples tested

This documentation standard ensures consistent, comprehensive, and maintainable API documentation that serves both internal developers and external consumers effectively. 