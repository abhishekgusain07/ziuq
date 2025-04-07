# app/tests/api/test_health.py
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy",
        "message": "Service is running correctly"
    }


def test_readiness_check():
    response = client.get("/api/v1/health/ready")
    assert response.status_code == 200
    assert response.json() == {
        "status": "ready",
        "message": "Service is ready to accept traffic"
    }


def test_liveness_check():
    response = client.get("/api/v1/health/live")
    assert response.status_code == 200
    assert response.json() == {
        "status": "alive",
        "message": "Service is alive"
    }

# app/tests/__init__.py
# This file can be empty but is required for pytest to recognize the directory