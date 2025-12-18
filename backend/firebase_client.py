import os
import json
from firebase_admin import credentials, firestore, initialize_app

firebase_creds = os.getenv("FIREBASE_CREDENTIALS")
if not firebase_creds:
    raise RuntimeError("FIREBASE_CREDENTIALS not set")

cred = credentials.Certificate(json.loads(firebase_creds))
initialize_app(cred)

db = firestore.client()
