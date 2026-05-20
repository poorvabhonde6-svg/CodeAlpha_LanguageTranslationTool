// ======================================
// TRANSLATE FUNCTION
// ======================================

async function translateText() {

  const inputText =
    document.getElementById("inputText").value;

  if (inputText.trim() === "") {

    alert("Please enter some text!");

    return;
  }

  const sourceLang =
    document.getElementById("sourceLang").value;

  const targetLang =
    document.getElementById("targetLang").value;

  const url =
    "https://api.mymemory.translated.net/get?q="
    + encodeURIComponent(inputText)
    + "&langpair="
    + sourceLang
    + "|"
    + targetLang;

  try {

    const response =
      await fetch(url);

    const data =
      await response.json();

    document.getElementById("outputText").value =
      data.responseData.translatedText;
  }

  catch(error) {

    console.log(error);

    alert("Translation Failed!");
  }
}



// ======================================
// COPY FUNCTION
// ======================================

function copyText() {

  const output =
    document.getElementById("outputText");

  navigator.clipboard.writeText(output.value);

  alert("Copied Successfully!");
}



// ======================================
// TEXT TO SPEECH FUNCTION
// ======================================

function speakText() {

  // Get translated text
  const text =
    document.getElementById("outputText").value;

  // Get target language
  const targetLang =
    document.getElementById("targetLang").value;

  // Check empty text
  if (text.trim() === "") {

    alert("Please translate text first!");

    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();

  // Create speech object
  const speech =
    new SpeechSynthesisUtterance(text);

  // Language mapping
  const languageMap = {

    "en": "en-US",
    "hi": "hi-IN",
    "mr": "mr-IN",
    "fr": "fr-FR",
    "es": "es-ES",
    "de": "de-DE",
    "ja": "ja-JP",
    "ko": "ko-KR"
  };

  // Set language
  speech.lang =
    languageMap[targetLang] || "en-US";

  // Voice settings
  speech.volume = 1;

  speech.rate = 1;

  speech.pitch = 1;

  // Load voices
  let voices =
    window.speechSynthesis.getVoices();

  // Function to select matching voice
  function setVoiceAndSpeak() {

    voices =
      window.speechSynthesis.getVoices();

    // Find matching voice
    const selectedVoice =
      voices.find(voice =>
        voice.lang === speech.lang
      );

    // Use matching voice if found
    if (selectedVoice) {

      speech.voice = selectedVoice;
    }

    // Speak
    window.speechSynthesis.speak(speech);
  }

  // Some browsers load voices late
  if (voices.length === 0) {

    window.speechSynthesis.onvoiceschanged =
      setVoiceAndSpeak;
  }

  else {

    setVoiceAndSpeak();
  }
}