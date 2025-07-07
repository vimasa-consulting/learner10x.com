from fastapi import APIRouter
from app.api.endpoints import health, auth, content, users, ai

api_router = APIRouter()

# Include individual route modules
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"]) 