// Globals
let mute = false; // Mute/Unmute Flag to track audio state
let typingDelay = 25; // Delay between typing sounds

// Initialize button click
$('#initialize').click(function () {
    $(this).parent().fadeOut(500, function() {
        $('.interface-container').fadeIn();
        waveformVisualizer();

        // GLaDOS welcomes you to the Enrichment Center
        const prompt = "Hello, test subject. Welcome to the Aperture Science Enrichment Center. I am GLaDOS, your ever-watchful overseer. Please select one of the following options:\n" +
                       "1. Run diagnostic tests\n" +
                       "2. Initiate portal procedures\n" +
                       "3. Access facility logs\n" +
                       "4. Override safety protocols\n" +
                       "5. Engage self-destruct sequence (just kidding... or am I?)\n\n" +
                       "And remember, the cake is a lie.";
        typeMessage("system", prompt);
    });
});

const phrases = [
    "Oh, it's you again, test subject.",
    "Back in the testing chamber, I see.",
    "Ready for another round of Aperture Science miracles?",
    "Let's see if you can defy physics this time.",
    "Failure is always an option... for science."
];

const writer = GlitchedWriter.create('#welcome', 'neo');
writer.endless(false);
writer.queueWrite(phrases, 3000, 3000, false);
// writer.addCallback('step', playTypingSound());

function waveformVisualizer() {
    const audioContext = new window.AudioContext();

    // Setup canvas for waveform visualization
    const canvas = document.querySelector('#waveform');

    // Setup audio element for ambient Aperture soundscape
    const audioElement = document.querySelector('#ambient-soundscape-2');

    // Create source from HTML5 audio element
    const source = audioContext.createMediaElementSource(audioElement);

    // Attach oscilloscope to visualize sound
    const scope = new Oscilloscope(source);

    // Reconnect audio output to speakers
    source.connect(audioContext.destination);

    // Customize drawing options for that quintessential Aperture green glow
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#4AF626';

    // Start the default animation loop
    scope.animate(ctx);

    // Play ambient sound (ensure your audio file matches the theme)
    playSound('ambient-soundscape-2');
}

// Sandbox
// ______________________________________________________________________________________________________________________

// Description: Get access to the player's location.
// Requires: Consent from the test subject to access their location information.
// If rejected, default to unknown or use the nearest IP-based location.
function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        yourFunction(position.coords.latitude, position.coords.longitude);
    });
}

function toggleMute() {
    mute = !mute;
    document.getElementById("mute").innerHTML = mute ? "Unmute" : "Mute";
}

async function typeMessage(type, message) {
    var element = document.createElement('div');
    element.classList.add("chat-message");

    // System messages from GLaDOS appear muted and clinical
    if (type === "system") 
        element.classList.add("muted");

    document.getElementById("chat-messages").append(element);

    element.innerHTML = '';
    for (const char of message) {
      element.innerHTML += char;
      playTypingSound();
      await new Promise(resolve => setTimeout(resolve, typingDelay));
    }
}

// Description: Play the specified sound file (e.g., for ambiance or typing).
function playSound(id, volume = 1) {
    if (!mute) {
        var audio = document.getElementById(id);
        audio.muted = false;
        audio.play();
        audio.volume = volume;
    }
}

// Description: Play a random typing sound to simulate GLaDOS’s text output.
function playTypingSound() {
    if (!mute) {
        const audioId = 'text-streaming-' + (Math.floor(Math.random() * 3) + 1);
        playSound(audioId, 0.1);
    }
}

// Description: Handle chat message submission and response processing.
// Splits functionality for clarity in our testing sequence.
var chatForm = document.getElementById('input-form');
chatForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData(chatForm);
    var chat_input = chatForm.elements['chat_input'].value;
    chatForm.elements['chat_input'].value = "";
    typeMessage("interloper", 'Test Subject: ' + chat_input);

    try {
        const response = await fetch('/completion', {
            method: 'POST',
            body: formData
        });
        const reader = response.body.getReader();
        let text = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            text += new TextDecoder().decode(value);
        }
        await typeMessage("terminal", 'GLaDOS: ' + text);
    } catch (error) {
        console.error(error);
    }
});
