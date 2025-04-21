from dotenv import load_dotenv
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()

cred_info = json.loads(os.getenv("GOOGLE_CREDENTIALS_JSON"))

# Corrige a quebra de linha na chave privada
cred_info["private_key"] = cred_info["private_key"].replace("\\n", "\n")

cred = credentials.Certificate(cred_info)
firebase_admin.initialize_app(cred)

db = firestore.client()