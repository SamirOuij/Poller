import firebase_admin
from firebase_admin import credentials, firestore
import requests
import json

# Firebase Setup
# Setup Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\samir\\Downloads\\polar-82756-firebase-adminsdk-to3li-1b9e353e96.json')
firebase_admin.initialize_app(cred)

# Reference to Firestore
db = firestore.client()
# Open States API Setup
OPEN_STATES_API_KEY = 'e0bbbdf5-691b-44df-a650-4edadfe00832'
headers = {'X-API-KEY': OPEN_STATES_API_KEY, 'Content-Type': 'application/json'}
# GraphQL Query for Washington State Bills
query = """
{
  search_1: bills(first: 5, jurisdiction: "Washington", session: "2021-2022") {
    edges {
      node {
        id
        identifier
        title
        updatedAt
        legislativeSession {
          identifier
          jurisdiction {
            name
          }
        }
        actions {
          date
          description
        }
        sources {
          url
        }
      }
    }
  }
}
"""

# Fetch Data from Open States
response = requests.post('https://openstates.org/graphql', headers=headers, json={'query': query})

print(response.text)

if response.status_code != 200:
    print("Failed to fetch data from Open States API")
    exit(1)

# Extract Bills
bills = response.json()['data']['search_1']['edges']

# Process and Insert into Firebase
for edge in bills:
    bill = edge['node']
    bill_data = {
        "yesVotes": "",
        "noVotes": "",
        "type": True,  # Determine logic for this
        "number": bill['identifier'],
        "bill_id": f"{bill['legislativeSession']['identifier']}-{bill['identifier']}",
        "title": bill['title'],
        "clickable_title": "",
        "summary": "",  # Extract summary if available
        "action_date": bill['actions'][-1]['date'] if bill['actions'] else 'N/A',
        "update_date": bill['updatedAt'],
        "current_chamber": bill['legislativeSession']['jurisdiction']['name'],
        "action_desc": bill['actions'][-1]['description'] if bill['actions'] else 'N/A',
        "congress": "",  # Not applicable
        "chamber": "",  # Determine logic for this
        "state": bill['legislativeSession']['jurisdiction']['name'],
        "url": bill['sources'][0]['url'] if bill['sources'] else '',
        "level": "state"
    }

    try:
        db.collection('bills').document(bill_data['bill_id']).set(bill_data)
    except Exception as e:
        print(f"Error inserting bill {bill_data['bill_id']} into Firestore: {e}")

print("Process completed!")
