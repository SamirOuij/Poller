from firebase_admin import credentials, firestore
import firebase_admin 
import requests

# Setup Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\samir\\Downloads\\polar-82756-firebase-adminsdk-to3li-1b9e353e96.json')
firebase_admin.initialize_app(cred)

# Reference to Firestore
db = firestore.client()

headers = {
    'x-api-key': '6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9',
}

# Fetch the top 20 most recent summaries from the congress.gov API
response = requests.get('https://api.congress.gov/v3/summaries', headers=headers, params={'limit': 20})

if response.status_code != 200:
    print("Failed to fetch data from API for summaries")
    exit(1)

summaries = response.json().get('summaries', [])

for summary in summaries:
    bill_data = {
        "yesVotes": "",
        "noVotes": "",
        "type": True,
        "number": summary['bill']['number'],
        "bill_id": f"{summary['bill']['congress']}-{summary['bill']['type']}-{summary['bill']['number']}-{summary['bill']['originChamberCode']}",
        "title": summary['bill']['title'],
        "clickable_title": "",
        "summary": summary.get('text'),
        "action_date": summary.get('actionDate', 'N/A'),
        "update_date": summary.get('updateDate', 'N/A'),
        "current_chamber": summary.get('currentChamber', 'N/A'),
        "action_desc": summary.get('actionDesc', 'N/A'),
        "congress": summary['bill']['congress'],
        "chamber": summary['bill']['originChamber'],
        "url": summary['bill']['url'],
        "level":"federal"
    }

    try:
        db.collection('bills').document(bill_data['bill_id']).set(bill_data)
    except Exception as e:
        print(f"Error inserting bill {bill_data['bill_id']} into Firestore: {e}")

print("Process completed!")
