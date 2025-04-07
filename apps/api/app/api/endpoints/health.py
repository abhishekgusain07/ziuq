from fastapi import APIRouter, Response, status

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "message": "Service is running correctly"
    }

@router.get("/ready", status_code=status.HTTP_200_OK)
async def readiness_check():
    """
    Readiness check endpoint
    """
    # Here you can add checks for database connections, external services, etc.
    return {
        "status": "ready",
        "message": "Service is ready to accept traffic"
    }

@router.get("/live", status_code=status.HTTP_200_OK)
async def liveness_check():
    """
    Liveness check endpoint
    """
    return {
        "status": "alive",
        "message": "Service is alive"
    }