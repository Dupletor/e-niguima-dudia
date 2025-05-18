let answerText = "";
let answerBox;

function shouldDisableBoxes(level) {
  return fetch('not-levels.json')
    .then(response => {
      if (!response.ok) throw new Error("Could not load not-levels.json");
      return response.json();
    })
    .then(notLevels => {
      return notLevels.includes(Number(level));
    })
    .catch(error => {
      console.error("Error loading not-levels.json:", error);
      return false;
    });
}

  function disableHintAndAnswerBoxes() {
    const hintBox = document.getElementById('hints');
    const answerBox = document.getElementById('answer');
    hintBox.style.pointerEvents = 'none';
    hintBox.style.opacity = 0;
    answerBox.onclick = null;
    answerBox.style.pointerEvents = 'none';
    answerBox.style.opacity = 0;
  }

  function checkAnswer(element) {
      const correctAnswer = answerText;
      const userInput = prompt("Digite sua resposta:");

      if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        reveal(answerBox);
        const correctAudio = new Audio('certa resposta.mp3');
        correctAudio.play();  // Play correct answer sound
        alert("Acertô mizeravi!");  // Display correct message
      } else {
        element.classList.add('revealed');
        const errorAudio = new Audio('errooo.mp3');
        errorAudio.play();  // Play error sound
        alert("Errooooooooo");  // Display incorrect message
      }
    }
    function reveal(element) {
      if (element.classList.contains('hint-box') || element.classList.contains('answer-box')) {
        const hintText = element.getAttribute('data-hint'); // Get the hint text from the data attribute
        element.textContent = hintText; // Set the text of the box to the hint
        element.classList.add('revealed'); // Apply the reveal style
      } else {
        element.classList.add('revealed');
      }
    }

    function getQueryParam(name, fallback = "today") {
      const params = new URLSearchParams(window.location.search);
      return params.get(name) || fallback;
    }

let desistoCount = 4;

function desistir() {

  if (desistoCount > 1) {
    desistoCount--;
    document.getElementById("desistoBtn").innerText = "Desisto " + desistoCount;
  } else {
    reveal(answerBox);
    document.getElementById("desistoBtn").innerText = "Desistiu";
    document.getElementById("desistoBtn").disabled = true;
  }
}

    const key = getQueryParam("level");
    const basePath = `enigmas/${key}`;
    shouldDisableBoxes(key).then(shouldDisable => {
      if(shouldDisable) {
        disableHintAndAnswerBoxes();
      }
    });

    if(key =='today' || Number(key) > 7)
        spawnRobson();

    const mediaContainer = document.getElementById("media");

    fetch(`${basePath}.mp4`, { method: "HEAD" })
      .then(response => {
        if (response.ok) {
          const video = document.createElement("video");
          video.src = `${basePath}.mp4`;
          video.autoplay = true;
          video.loop = true;
          video.controls = true;
          video.playsInline = true;
          mediaContainer.appendChild(video);

          video.play().catch(() => {
            const msg = document.createElement("div");
            msg.style.color = "orange";
            msg.textContent = "Clique no vídeo para ativar o som.";
            mediaContainer.appendChild(msg);
          });
        } else {
          throw new Error("MP4 not found");
        }
      })
      .catch(() => {
        const img = document.createElement("img");
        img.src = `${basePath}.png`;
        img.alt = "Imagem do enigma";
        mediaContainer.appendChild(img);
      });

    fetch(`${basePath}.txt`)
      .then(response => {
        if (!response.ok) throw new Error("Arquivo não encontrado");
        return response.text();
      })
      .then(text => {
        const lines = text.trim().split("\n");
        if (lines.length < 2) throw new Error("Arquivo inválido");

        const hintsDiv = document.getElementById("hints");

        const generalHints = lines.slice(0, -2);
        const definitionHint = lines[lines.length - 2];
        answerText = lines[lines.length - 1];

        // Add general hints with boxes
        generalHints.forEach((line, index) => {
          const div = document.createElement("div");
          div.className = "hint";

          const label = document.createElement("span");
          label.className = "hint-label";
          label.textContent = `Dica ${index + 1}: `;

          const box = document.createElement("span");
          box.className = "hint-box";
          box.setAttribute('data-hint', line);  // Store the hint in a data attribute
          box.textContent = "";  // Start with empty box
          box.onclick = () => reveal(box);

          div.appendChild(label);
          div.appendChild(box);
          hintsDiv.appendChild(div);
        });

        // Add the definition hint with box
        const defDiv = document.createElement("div");
        defDiv.className = "hint";

        const defLabel = document.createElement("span");
        defLabel.className = "hint-label";
        defLabel.textContent = "Dica Definição: ";

        const defBox = document.createElement("span");
        defBox.className = "hint-box";
        defBox.setAttribute('data-hint', definitionHint);  // Store the definition hint
        defBox.textContent = "";  // Start with empty box
        defBox.onclick = () => reveal(defBox);

        defDiv.appendChild(defLabel);
        defDiv.appendChild(defBox);
        hintsDiv.appendChild(defDiv);

        // Display the answer with box
        const answerDiv = document.getElementById("answer");

        const answerLabel = document.createElement("span");
        answerLabel.className = "hint-label";
        answerLabel.textContent = "Resposta: ";

        answerBox = document.createElement("span");
        answerBox.className = "answer-box";
        answerBox.setAttribute('data-hint', answerText);  // Store the answer text
        answerBox.textContent = "";  // Start with empty box

        answerDiv.appendChild(answerLabel);
        answerDiv.appendChild(answerBox);
      })
      .catch(err => {
        document.getElementById("media").innerHTML = "";
        document.getElementById("hints").innerHTML = "";
        document.getElementById("answer").innerHTML = "";
        const error = document.createElement("div");
        error.className = "not-found";
        error.textContent = "404 – Enigma não encontrado.";
        document.body.appendChild(error);
      });