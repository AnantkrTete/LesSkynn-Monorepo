import os, json
from firebase_admin import credentials, firestore, initialize_app

firebase_creds = os.getenv("FIREBASE_CREDENTIALS")
if not firebase_creds:
    raise RuntimeError("FIREBASE_CREDENTIALS not set")

creds = json.loads(firebase_creds)

# THIS LINE IS REQUIRED
creds["private_key"] = creds["private_key"].replace("\\n", "\n")

cred = credentials.Certificate(creds)
initialize_app(cred)
db = firestore.client()
