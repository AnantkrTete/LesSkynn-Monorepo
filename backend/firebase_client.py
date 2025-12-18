import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    firebase_creds = os.getenv("FIREBASE_SERVICE_ACCOUNT")

    if not firebase_creds:
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT env var not set")

    # IMPORTANT: handle escaped newlines
    firebase_creds = firebase_creds.replace("\\n", "\n")

    cred = credentials.Certificate(json.loads(firebase_creds))
    firebase_admin.initialize_app(cred)

db = firestore.client()
