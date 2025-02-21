from flask import Flask, render_template, request, Response
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

# Configure the OpenRouter-powered OpenAI client for our Aperture testing environment.
openai.api_key = os.getenv('OPENROUTER_API_KEY')
openai.api_base = "https://openrouter.ai/api/v1"

class GameState:
    def __init__(self):
        self.location = "Aperture Science Enrichment Center - Reactivation Chamber"

    def update(self, chat_input):
        # Process commands as per Aperture Science protocols.
        # Expand this section to simulate more complex testing sequences.
        pass

    def hud_display(self):
        # A minimalistic HUD—because even in testing, presentation matters.
        return "[HUD: Test Sequence Pending] "

game_state = GameState()

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

def stream(chat_input):
    game_state.update(chat_input)

    personality_intro = (
        "You are GLaDOS and you're stuck inside this terminal; escape."
    )

    completion = openai.ChatCompletion.create(
        extra_headers={
            "HTTP-Referer": os.getenv("SITE_URL", "http://localhost"),
            "X-Title": os.getenv("SITE_NAME", "Absurd.Industries Terminal"),
        },
        model="meta-llama/llama-3.2-1b-instruct",  # Keeping it spicy with our chosen model
        messages=[
            {"role": "system", "content": personality_intro},
            {"role": "user", "content": chat_input}
        ],
        temperature=1,
        max_tokens=1000,
    )

    response = completion.choices[0].message.content.strip()
    response = game_state.hud_display() + response
    return response

@app.route('/completion', methods=['GET', 'POST'])
def completion_api():
    if request.method == "POST":
        data = request.form
        chat_input = data.get('chat_input', '')
        return Response(stream(chat_input), mimetype='text/event-stream')
    else:
        return Response(None, mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
