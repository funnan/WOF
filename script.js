let phrase = "";
let revealedLetters = [];
let discardedLetters = [];
const symbols = [",", ";", "-", "!", "?", ".", ":", '"', "'","(",")","#"];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const categories1 = ["Custom", "Random"];
const categories2 = ["tvshows", "movies", "countries","capitals","moods","occupation"];
const categories = categories1.concat(categories2);

// Dynamically add categories to the dropdown
function populateDropdown() {
  const dropdown = document.getElementById("category-dropdown");
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
              // Add event listener to the dropdown for hiding/showing input field
            dropdown.addEventListener('change', handleDropdownChange);
}

// Handle dropdown change
        function handleDropdownChange() {
            const selectedCategory = document.getElementById('category-dropdown').value;
            const phraseInputContainer = document.getElementById('phrase-input-container');

            if (selectedCategory === 'Custom') {
                phraseInputContainer.style.display = 'inline-block';
            } else {
                phraseInputContainer.style.display = 'none';
            }
        }


function startGame() {
  const category = [tvshows, movies, countries,capitals,moods,occupation];
  var selection = "";
  phrase = "";
  const selectedCategory = document.getElementById("category-dropdown").value;
    if (selectedCategory === "Custom") {
      phrase = document.getElementById("phrase-input").value.toUpperCase();
    } 
    else if (selectedCategory === "Random"){
      var randomness = Math.floor(Math.random() * category.length);
      selection = category[randomness];
      //console.log (selection);
      var random = Math.floor(Math.random() * selection.length);
      phrase = selection[random].toUpperCase();
    } else{
      selection = category[categories2.indexOf(selectedCategory)];
      var random = Math.floor(Math.random() * selection.length);
      phrase = selection[random].toUpperCase();
    }
    
  //console.log (phrase);

  revealedLetters = Array(phrase.length).fill(false);
  discardedLetters = [];
  document.getElementById("phrase-input").value = ""; // Clear input field

  // Automatically reveal symbols in the phrase
  for (let i = 0; i < phrase.length; i++) {
    if (symbols.includes(phrase[i]) || phrase[i] === " ") {
      revealedLetters[i] = true;
    }
  }

  displayPhrase();
  updateDiscardedLetters();
  displayAlphabet();
}

function displayPhrase() {
  
  const container = document.getElementById("phrase-container");
  container.innerHTML = ""; // Clear previous content

  // Split the phrase into words
  const words = phrase.split(" ");
  let charIndex = 0;
  
  words.forEach((word) => {
    const wordContainer = document.createElement("div");
    wordContainer.className = "word-container";

    // Create letter boxes for each letter in the word
    for (let i = 0; i < word.length; i++) {
      const box = document.createElement("div");
      box.className = "letter-box";

      if (revealedLetters[charIndex] || symbols.includes(word[i])) {
        box.textContent = word[i];
      } else {
        box.textContent = "";
      }

      wordContainer.appendChild(box);
      charIndex++;
    }

    // Add a space after the word
    charIndex++; // Increment to skip the space in the phrase
    container.appendChild(wordContainer);
  });
}



function displayAlphabet() {
  const container = document.getElementById("alphabet-container");
  container.innerHTML = ""; // Clear previous content

  alphabet.forEach((letter) => {
    const box = document.createElement("div");
    box.className = "alphabet-box";
    box.textContent = letter;
    box.onclick = () => guessLetter(letter, box);
    container.appendChild(box);
  });
}

function guessLetter(letter, box) {
  // Disable the alphabet box after clicking
  box.classList.add("disabled");

  if (phrase.includes(letter)) {
    box.classList.add("green");
    // Update revealedLetters array
    for (let i = 0; i < phrase.length; i++) {
      if (phrase[i] === letter) {
        revealedLetters[i] = true;
      }
    }
  } else {
    // Add letter to discarded list if not already present
    if (!discardedLetters.includes(letter)) {
      discardedLetters.push(letter);
      updateDiscardedLetters();
    }
  }

  displayPhrase();
}

function updateDiscardedLetters() {
  document.getElementById("discarded-letters").textContent =
    "Discarded Letters: " + discardedLetters.join(", ");
}

function revealPhrase() {
  revealedLetters = Array(phrase.length).fill(true);
  displayPhrase();
}


// Populate the dropdown on page load
window.onload = populateDropdown;


