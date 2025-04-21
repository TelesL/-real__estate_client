from database import db
from schemas import PropertySchema
from uuid import uuid4

def adicionar_property(property: PropertySchema):
    """Adiciona um novo imóvel ao banco de dados."""
    id_unico = str(uuid4())  # Gerar um ID único
    doc_ref = db.collection("properties").document(id_unico)
    doc_ref.set(property.dict())  # Define os dados do imóvel no Firestore
    return {"id": id_unico, **property.dict()}

def listar_properties():
    """Lista todos os imóveis cadastrados no banco de dados."""
    properties_ref = db.collection("properties").stream()  # Pega todos os documentos
    properties = []
    for doc in properties_ref:
        data = doc.to_dict()
        data["id"] = doc.id  # Inclui o ID do documento no retorno
        properties.append(data)
    return properties

def buscar_property_por_id(property_id: str):
    doc_ref = db.collection("properties").document(property_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise Exception("Imóvel não encontrado.")  # Erro se o imóvel não for encontrado
    data = doc.to_dict()
    data["id"] = doc.id
    return data

def atualizar_property(property_id: str, dados: dict):
    """Atualiza as informações de um imóvel existente."""
    doc_ref = db.collection("properties").document(property_id)
    doc_ref.update(dados)  # Atualiza o imóvel com os novos dados
    return {"id": property_id, **dados}

def deletar_property(property_id: str):
    """Deleta um imóvel pelo ID."""
    doc_ref = db.collection("properties").document(property_id)
    doc_ref.delete()  # Deleta o imóvel
    return {"message": "Imóvel deletado com sucesso"}


def buscar_properties_por_query(query: str):
    print(f"Buscando imóveis com o termo: {query}")
    # Corrigir a referência para acessar a coleção de propriedades corretamente
    properties_ref = db.collection('properties').stream()

    query_lower = query.strip().lower()  # Normalizando a busca

    results = []
    for property in properties_ref:
        property_data = property.to_dict()
        title = property_data.get("title", "").lower()
        address = property_data.get("address", "").lower()

        print(f"Verificando imóvel: título = {title}, endereço = {address}")  # Verifica os dados lidos

        if query_lower in title or query_lower in address:
            property_data["id"] = property.id
            results.append(property_data)

    if not results:
        print(f"Nenhum imóvel encontrado para o termo: {query_lower}")  # Mensagem de depuração

    return results
