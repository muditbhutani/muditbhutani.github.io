// INIT speechsynth API

const synth = window.speechSynthesis;

// DOM Elements

const rate = document.querySelector('#rate');
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//INIT the voices array!

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // loop through voices and create an option for each one!

  voices.forEach(voice => {
      //create option Element

      const option = document.createElement('option');
      option.textContent = voice.name + '(' + voice.lang + ')';

      // Set needed opton attributes

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
  });
};

// getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged =getVoices;
}

// Speak

const speak = () => {
  // check if speaking!

  if(synth.speaking){
    console.error('Already Speaking!');
    return;
  }

  if(textInput.value !== ''){
    // Get speak text!

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end

    speakText.onend = e => {
      console.log('Done Speaking!');
    }

    speakText.onerror = e => {
      console.error('Something went wrong!');
    }

    // Selected Voice!

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices!

    voices.forEach(voice => {
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak

    synth.speak(speakText);
  }
};

textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});


// Rate value change!
rate.addEventListener('change', e => {
  rateValue.textContent = rate.value;
})

// Rate value change!
pitch.addEventListener('change', e => {
  pitchValue.textContent = pitch.value;
})

// Voice Select Change

voiceSelect.addEventListener('change', e => speak());
