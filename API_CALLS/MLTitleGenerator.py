import pandas as pd
from transformers import BartTokenizer, BartForConditionalGeneration, Seq2SeqTrainingArguments, Seq2SeqTrainer

# 1. Data Preparation

# Loading data
df = pd.read_csv('titles_and_summaries.csv')
titles = df['Title'].tolist()
summaries = df['Summary'].tolist()
catchy_titles = df['Catchy Titles'].tolist()

# Combining title and summary for the model's input
input_texts = [f"{title} {summary}" for title, summary in zip(titles, summaries)]

tokenizer = BartTokenizer.from_pretrained('facebook/bart-base')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-base')

# Tokenize input and target
inputs = tokenizer(input_texts, padding='max_length', truncation=True, max_length=512, return_tensors='pt')
targets = tokenizer(catchy_titles, padding='max_length', truncation=True, max_length=30, return_tensors='pt')

# Dataset class
class CustomDataset:
    def __init__(self, inputs, targets):
        self.inputs = inputs
        self.targets = targets

    def __len__(self):
        return len(self.inputs["input_ids"])

    def __getitem__(self, idx):
        return {
            'input_ids': self.inputs["input_ids"][idx],
            'attention_mask': self.inputs["attention_mask"][idx],
            'labels': self.targets["input_ids"][idx]
        }

dataset = CustomDataset(inputs, targets)

# 2. Model Fine-tuning

training_args = Seq2SeqTrainingArguments(
    output_dir='./results',
    per_device_train_batch_size=8,
    num_train_epochs=1,  
    logging_dir='./logs',
)

trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)

trainer.train()

# Save the model
model.save_pretrained('bart_finetuned')
tokenizer.save_pretrained('bart_finetuned')

# 3. Generating Catchy Titles from test_data.csv

model = BartForConditionalGeneration.from_pretrained('bart_finetuned')
tokenizer = BartTokenizer.from_pretrained('bart_finetuned')

test_df = pd.read_csv('test_data.csv')
test_titles = test_df['Title'].tolist()
test_summaries = test_df['Summary'].tolist()

test_input_texts = [f"{title} {summary}" for title, summary in zip(test_titles, test_summaries)]
encoded_test_data = tokenizer(test_input_texts, padding=True, truncation=True, max_length=512, return_tensors="pt")

generated_tokens = model.generate(**encoded_test_data)
generated_texts = [tokenizer.decode(token, skip_special_tokens=True) for token in generated_tokens]

# Saving the generated titles
test_df['Generated Catchy Titles'] = generated_texts
test_df.to_csv('test_data_with_generated_titles1.csv', index=False)

print("Generated catchy titles saved to test_data_with_generated_titles1.csv")
