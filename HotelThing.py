import pandas as pd

# Load data from your front desk XLSX file into a Pandas DataFrame
front_desk_df = pd.read_excel('C:\\Users\\samir\\Downloads\\daily sales report.xlsx')

# Load data from your credit card transaction file (XLSX) into another Pandas DataFrame
credit_card_df = pd.read_excel('C:\\Users\\samir\\Downloads\\Carte banc. du 01-07 au 17-10-2023.xlsx', sheet_name='Banque')

# Convert the 'STAN' column in credit_card_df to float data type
credit_card_df['STAN'] = credit_card_df['STAN'].astype(float)

# Merge the two DataFrames based on the condition that both 'Remark' and 'STAN' match
merged_df = pd.merge(
    front_desk_df,
    credit_card_df,
    left_on='Remark',
    right_on='STAN',
    how='inner'
)

# Keep only the 'Remark', 'STAN', 'Amount', and 'Montant brut TTC' columns
cleaned_df = merged_df[['Remark', 'STAN', 'Amount', 'Montant brut TTC']]

# Filter rows with matching "STAN" and "Remark"
filtered_df = cleaned_df.dropna(subset=['Remark', 'STAN'])

# Calculate the absolute difference between "Montant brut" and "Amount" and store it in a new column "difference"
filtered_df['difference'] = abs(filtered_df['Montant brut TTC'] - filtered_df['Amount'])

# Print out the DataFrame with the "difference" column
print(filtered_df)

# Find discrepancies based on the 'difference' column
discrepancies = filtered_df[filtered_df['difference'] != 0]

# Print out discrepancies
if not discrepancies.empty:
    print("Discrepancies found:")
    print(discrepancies)
    discrepancies.to_csv("discrepancies1.csv", index=False)
else:
    print("No discrepancies found.")
