from pydantic import BaseModel
from typing import Optional

class PropertySchema(BaseModel):
    title: str
    description: str
    price: float
    address: str
    image_url: Optional[str] = None

class PropertyResponseSchema(PropertySchema):
    id: Optional[str] = None
