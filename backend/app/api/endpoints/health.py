from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.core.database import test_database_connection
import os

router = APIRouter()

@router.get("/")
async def health_check():
    """Health check endpoint"""
    db_status = test_database_connection()
    
    return JSONResponse(
        content={
            "status": "healthy" if db_status else "unhealthy",
            "version": "1.0.0",
            "environment": os.getenv("ENVIRONMENT", "development"),
            "database": "connected" if db_status else "disconnected",
        }
    )

@router.get("/database")
async def database_health():
    """Database specific health check"""
    db_status = test_database_connection()
    
    return JSONResponse(
        content={
            "database_status": "connected" if db_status else "disconnected",
            "database_url": os.getenv("DATABASE_URL", "").split("@")[-1] if db_status else "not_configured"
        }
    ) 