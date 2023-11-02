from firebase_admin import credentials, firestore
import firebase_admin 
import requests
import csv

bioguide_ids_list = set()
with open('C:\\Users\\samir\\Downloads\\legislators-current.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        bioguide_ids_list.add(row['bioguide_id'])
# Setup Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\samir\\Downloads\\polar-82756-firebase-adminsdk-to3li-1b9e353e96.json')
firebase_admin.initialize_app(cred)

# Reference to Firestore
db = firestore.client()
members_ref = db.collection('members')

# API Key for Congress API in headers
headers = {
    'x-api-key': '6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9',
}
headers2 = {
    'x-api-key' :'th3NfTb5zEogdex6EMUDKZKO2VpaWaC8nWselOQL',
}
for bioguideId in bioguide_ids_list:
    # Fetch main member data
    member_endpoint = f"https://api.congress.gov/v3/member/{bioguideId}?api_key=6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9"
    response_member = requests.get(member_endpoint, headers=headers2)
    if response_member.status_code == 200:
        # Fetch sponsored and cosponsored legislation
        member_legislation_endpoint = f"https://api.congress.gov/v3/member/{bioguideId}/api_key=6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9"
        response_legislation = requests.get(member_legislation_endpoint, headers=headers)
    
        # Store the complete member data into Firestore
        print(f"Updated data for member {bioguideId}.")

print("Finished updating Firestore with member data.")