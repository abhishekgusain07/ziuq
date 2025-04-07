from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class BaseSchema(BaseModel):
    class Config:
        orm_mode = True
        populate_by_name = True


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None