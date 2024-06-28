import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const MORSE_CODE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
  6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----', ' ': '   ',
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
  '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
  '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
  '   ': ' '
};

const translateToMorse = (text) => {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE[char] || '')
    .join(' ');
};

const translateToEnglish = (morse) => {
  return morse
    .split('   ')
    .map(word => word
      .split(' ')
      .map(code => MORSE_CODE[code] || '')
      .join(''))
    .join(' ');
};

function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isMorse, setIsMorse] = useState(false);

  const handleTranslate = () => {
    if (isMorse) {
      setTranslatedText(translateToEnglish(text));
    } else {
      setTranslatedText(translateToMorse(text));
    }
    toast.success('Translation Successful!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    toast.info('Copied to Clipboard!');
  };

  const handleToggle = () => {
    setIsMorse(!isMorse);
    setText('');
    setTranslatedText('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Morse Code Translator</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isMorse ? "Enter Morse Code" : "Enter English Text"}
        />
        <button onClick={handleTranslate}>
          Translate
        </button>
        <button onClick={handleCopy}>
          Copy to Clipboard
        </button>
        <button onClick={handleToggle}>
          Toggle to {isMorse ? "English" : "Morse"}
        </button>
        <p>Translation: {translatedText}</p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
