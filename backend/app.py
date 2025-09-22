from flask import Flask, render_template, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import pandas as pd

import os

app = Flask(__name__)

chatbot = ChatBot(
    'FarmingBot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///farmingbot.sqlite3',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'Sorry, I do not understand. Can you rephrase?',
            'maximum_similarity_threshold': 0.85
        }
    ]
)

csv_path = os.path.join(os.path.dirname(__file__), 'Farming_FAQ_Assistant_Dataset.csv')
df = pd.read_csv(csv_path)
conversation_list = []
for index, row in df.iterrows():
    conversation_list.append(row['Question'])
    conversation_list.append(row['Answer'])

trainer = ListTrainer(chatbot)
trainer.train(conversation_list)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_text = request.json.get("message")
    response = str(chatbot.get_response(user_text))
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
