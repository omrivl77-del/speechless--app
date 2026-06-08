const synth = window.speechSynthesis;

const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitchInput = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const currentChars = document.getElementById('current-chars');

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        
        if (voice.lang.includes('he') || voice.lang.includes('IL')) {
            option.textContent = `עברית - ${voice.name}`;
            option.selected = true;
        }
        voiceSelect.appendChild(option);
    });
    
    if(voiceSelect.innerHTML === '') {
        voiceSelect.innerHTML = '<option value="">לא נמצאו קולות תואמים במערכת</option>';
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
    if (synth.speaking) {
        synth.resume();
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        return;
    }

    if (textInput.value !== '') {
        const utterThis = new Utterance(textInput.value);
        
        const selectedVoiceName = voiceSelect.value;
        const selectedVoice = voices.find(v => v.name === selectedVoiceName);
        if (selectedVoice) utterThis.voice = selectedVoice;

        utterThis.rate = rateInput.value;
        utterThis.pitch = pitchInput.value;

        utterThis.onend = () => {
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        };

        utterThis.onerror = () => {
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        };

        synth.speak(utterThis);
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

// תמיכה בדפדפנים שונים
const Utterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

textInput.addEventListener('input', () => {
    currentChars.textContent = textInput.value.length;
});

rateInput.addEventListener('input', () => {
    rateValue.textContent = `${rateInput.value}x`;
});

pitchInput.addEventListener('input', () => {
    pitchValue.textContent = pitchInput.value;
});

playBtn.addEventListener('click', speak);

pauseBtn.addEventListener('click', () => {
    if (synth.speaking && !synth.paused) {
        synth.pause();
        playBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});

stopBtn.addEventListener('click', () => {
    synth.cancel();
    playBtn.disabled = false;
    pauseBtn.disabled = true;
});

clearBtn.addEventListener('click', () => {
    synth.cancel();
    textInput.value = '';
    currentChars.textContent = '0';
    playBtn.disabled = false;
    pauseBtn.disabled = true;
});
