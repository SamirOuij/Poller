from firebase_admin import credentials, firestore
import firebase_admin 
import requests

# Setup Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\samir\\Downloads\\polar-82756-firebase-adminsdk-to3li-1b9e353e96.json')
firebase_admin.initialize_app(cred)

# Reference to Firestore
db = firestore.client()
bills_ref = db.collection('bills')

# API Key for Congress API in headers
headers = {
    'x-api-key': '6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9',
}

bills = bills_ref.stream()

for bill in bills:
    bill_data = bill.to_dict()
    bill_id = bill_data.get('bill_id', '')
    
    # Extracting details from bill_id
    try:
        congress, bill_type, bill_number, _ = bill_id.split('-')
        bill_type = bill_type.lower()
        
        # Forming the URL for fetching cosponsors
        endpoint = f"https://api.congress.gov/v3/bill/{congress}/{(bill_type)}/{bill_number}/cosponsors"
        
        response = requests.get(endpoint, headers=headers)
        
        # If request is successful, update Firestore
        if response.status_code == 200:
            cosponsors_data = response.json().get('cosponsors', [])
            bills_ref.document(bill.id).update({'cosponsors': cosponsors_data})
            print(f"Updated cosponsors for bill {bill_id}.")
        
        # If there's an error, print the detailed error message
        else:
            print(f"Error fetching cosponsors for bill {bill_id}. Status code: {response.status_code}")
            print("Error details:", response.text)  # Print the detailed error message from the response
    except Exception as e:
        print(f"Error processing bill {bill_id}. Error: {e}")
