from firebase_admin import credentials, firestore
import firebase_admin 
import requests

# Setup Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\samir\\Downloads\\polar-82756-firebase-adminsdk-to3li-1b9e353e96.json')
firebase_admin.initialize_app(cred)

# Reference to Firestore
db = firestore.client()
bills = db.collection('bills').stream()

# Update each document
for bill in bills:
    db.collection('bills').document(bill.id).update({"level": "federal"})

print("All bills have been updated with a 'level' field set to 'federal'.")