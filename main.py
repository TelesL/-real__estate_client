from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import adicionar_property, listar_properties, atualizar_property, deletar_property, buscar_property_por_id, buscar_properties_por_query
from schemas import PropertySchema, PropertyResponseSchema
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API está funcionando!"}

@app.post("/properties", response_model=PropertyResponseSchema)
def criar_property(property: PropertySchema):
    return adicionar_property(property)

@app.get("/properties", response_model=List[PropertyResponseSchema])
def get_properties():
    return listar_properties()

@app.get("/properties/search", response_model=List[PropertyResponseSchema])
def search_properties(query: str = ""):
    return buscar_properties_por_query(query)

@app.get("/properties/{property_id}", response_model=PropertyResponseSchema)
def get_property_by_id(property_id: str):
    try:
        return buscar_property_por_id(property_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.put("/properties/{property_id}")
def put_property(property_id: str, property: PropertySchema):
    try:
        return atualizar_property(property_id, property.dict())
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.delete("/properties/{property_id}")
def delete_property(property_id: str):
    try:
        return deletar_property(property_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

