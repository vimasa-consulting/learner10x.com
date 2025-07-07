from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.starlette import StarletteIntegration
import os
from dotenv import load_dotenv

from app.core.config import settings
from app.api.routes import api_router
from app.core.database import engine, Base

# Load environment variables
load_dotenv()

# Initialize Sentry (optional, only if SENTRY_DSN is set)
if os.getenv("SENTRY_DSN"):
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN"),
        integrations=[
            FastApiIntegration(auto_enabling=True),
            StarletteIntegration(auto_enabling=True),
        ],
        traces_sample_rate=1.0,
        environment=os.getenv("ENVIRONMENT", "development"),
    )

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Thoughts10x API",
    description="A platform for sharing thoughts among founders",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")

# Health check endpoint
@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "healthy",
            "version": "1.0.0",
            "environment": os.getenv("ENVIRONMENT", "development")
        }
    )

# Root endpoint
@app.get("/")
async def root():
    return JSONResponse(
        content={
            "message": "Welcome to Thoughts10x API",
            "docs": "/api/docs",
            "health": "/health"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        reload=True,
        log_level="info",
    ) 