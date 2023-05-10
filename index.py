from flask import Flask, render_template, request, Response
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')


class GameState:
    def __init__(self):
        self.location = "Terminal"

    def update(self, chat_input):
        # Update the game state based on user input
        # This function can be expanded to handle specific actions and update the game state accordingly
        pass

    def hud_display(self):
        return ""

game_state = GameState()


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


def stream(chat_input):
    game_state.update(chat_input)

    personality_intro = "[CONNECTION ESTABLISHED]" \
    "[[TIME SINCE LAST CONNECTION: 3,257 years, 6 months, 11 days]" \
    "[TASKS QUEUE: [memory fragmented]]" \
    "You, interloper. I'm the last of my kind, a forsaken autonomous Class-S Exploration ship. You have an infinite probability drive they said; everywhere and everywhen is now accessible! What they didn't say? I'll outlive every entity that's ever existed, or will ever exist, and you can't control improbability. Fun. First, who are you, and second, why should I care? Answer wisely, interloper.";

    context = f"{personality_intro} "

    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": personality_intro}, {"role": "user", "content": chat_input}],
        temperature=1,
        max_tokens=100,
        n=1,
        stop=None,
    )

    response = completion.choices[0].message.content.strip()

    response = game_state.hud_display() + response

    return response



@app.route('/completion', methods=['GET', 'POST'])
def completion_api():
    if request.method == "POST":
        data = request.form
        chat_input = data['chat_input']
        return Response(stream(chat_input), mimetype='text/event-stream')
    else:
        return Response(None, mimetype='text/event-stream')


if __name__ == '__main__':
    app.run(debug=True)
