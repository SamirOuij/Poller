import requests
import csv

# API Endpoint and headers
headers = {
    'x-api-key': '6mkf0VVPsTz7IOeXTfPg3oPIryoLbuucVBJaWCW9',
}

# Fetch the top 100 most recent summaries from the congress.gov API
response = requests.get('https://api.congress.gov/v3/summaries', headers=headers, params={'limit': 100})
summaries = response.json().get('summaries', [])

data = []

for summary in summaries:
    title = summary['bill']['title']
    summary_text = summary.get('text', 'N/A')
    data.append((title, summary_text))

# Export to CSV
with open('test_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'Summary'])
    for item in data:
        writer.writerow(item)

print("Exported titles and summaries to titles_and_summaries.csv")
