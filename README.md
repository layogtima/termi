# Terminal 🌌🚀

The Terminal is an interactive cyberpunk narrative experience powered by OpenAI's GPT. In this experience, you'll communicate with a forsaken autonomous ship whose Terminal is accessible to you, navigating through a story set in a cyberpunk universe. This project uses HTML, JavaScript, Python, and Flask to create a captivating and immersive experience for the user.

## Features

- Interactive cyberpunk narrative
- Utilizes OpenAI's GPT-4 for dynamic conversations and story progression
- Customizable user interface with retro-futuristic design elements
- Typing and ambient sound effects
- Oscilloscope visualization of audio

## Project Structure

This project contains the following files and directories:

- `index.html` : Main HTML file containing the structure and layout of the Terminal.
- `styles.css` : CSS file for styling the Terminal.
- `script.js` : JavaScript file for handling user interactions and dynamic elements.
- `index.py` : Python Flask application handling GPT API requests and responses.
- `requirements.txt` : Python dependencies for running the Flask application.

## Customizing Your Adventure

Feel free to customize your Terminal experience by modifying the HTML, JavaScript, or Python code. This allows you to create your own adventures, change the user interface, or add new features to the game. Have fun experimenting and making Terminal your own!

## How to run the Terminal?

1. Install [Python](https://www.python.org/downloads/).
2. Install [pip](https://pip.pypa.io/en/stable/installing/).
3. Install [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).
4. Create a virtual environment: `virtualenv .venv`.
5. Activate the Python environment:
   - Windows: `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`
6. Install the requirements: `pip3 install -r requirements.txt`.
7. Launch the Flask webserver: `flask --app index run --debug -p 2042`.
8. Open your browser and navigate to [http://localhost:2042](http://localhost:2042).
9. Enjoy the interactive Terminal experience!

## 🤝 Contributions & To-Do List

Contributions are welcome! Feel free to submit pull requests or open issues on GitHub. Here's our current to-do list:

- Implement option selection for easier user interaction. Right now it's all chat-driven.
- Incorporate event-driven scenarios (e.g., distress signals, meteorite detections) for Terminal-prompted actions.
- Integrate the Python planner from Semantic Kernel for further development.
- Focus on mobile accessibility and deployment to allow easy sharing and playtesting.
- Explore basic authentication and consider integration with the prompt interface. Maybe magic links?
- Reevaluate jQuery usage and consider supporting modern alternatives.
- Rewrite necessary parts of the terminal and deploy it as an open-source library.

## ❓ Questions & Answers? Got you boo!

### What was the Midjourney (v5.1) prompt for the background? 

"first person cyberpunk grunge style in terminal green (#4AF626) color, programmer's workstation with a laptop, plants, tablet, chair, desk, tools, lamp, hologram, soldering iron, star wars diorama, phone --s 750"

### What was the Midjourney (v5.1) prompt for the favicon? 

"first person cyberpunk grunge style in terminal green (#4AF626) color, programmer's workstation with a laptop, plants, tablet, chair, desk, tools, lamp, hologram, soldering iron, star wars diorama, phone --s 750"

### JS Libraries
- https://github.com/propjockey/augmented-ui
- https://animejs.com/
- https://github.com/thetarnav/glitched-writer
- https://github.com/mathiasvr/audio-oscilloscope

### Sources
- Ambient audio
  - https://pixabay.com/sound-effects/sand-in-city-street-thriller-7038/
  - https://pixabay.com/sound-effects/tension-drones-51031/
- Typing sounds
    http://maiagame.com/about.php (thank you Simon!)

## Thank you play testers!
- Rohit
- Parna

## 📄 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details.

Copyleft © 2023 @layogtima (amit@absurd.industries)
