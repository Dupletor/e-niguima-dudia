function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, null);
}

function setLocalData(key, value) {
  localStorage.setItem(key, value);
}

function getLocalData(key) {
  return localStorage.getItem(key);
}

function generateNumberCode() {
    const segment = () => Math.floor(1000 + Math.random() * 9000).toString();
    return `${segment()}-${segment()}-${segment()}-${segment()}`;
  }

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function injectNuNumber() {
  let nuNumber = getCookie('nuNumber');
  if (!nuNumber) {
    nuNumber = generateNumberCode();
    setCookie('nuNumber', nuNumber);
  }

  // Display the number below the #media element
  const mediaDiv = document.getElementById('media');
  const numberDiv = document.createElement('div');
  numberDiv.textContent = nuNumber;
  numberDiv.style.fontFamily = 'Comic Sans MS, cursive, sans-serif';
  numberDiv.style.fontSize = '72px';
  numberDiv.style.textAlign = 'center';
  numberDiv.style.marginTop = '20px';
  numberDiv.style.marginBottom = '50px';

  mediaDiv.insertAdjacentElement('afterend', numberDiv);
 }

async function urlToBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Base64 result
    reader.readAsDataURL(blob);
  });
}

async function searchImages() {
  const savedQuery = getCookie('savedQuery');
  const savedImage = getLocalData('savedImage');
  let query;

  if (!savedQuery) {
    query = prompt("Digite sua resposta:");
    if (!query) return;
  } else {
    query = savedQuery;
  }

  const mediaDiv = document.getElementById('media');

  // If the query was already saved and matches, use the cached image
  if (savedQuery && savedImage) {
    document.querySelector("#answer .answer-box")?.setAttribute("data-hint", savedQuery);

    let inputQuery = prompt("Digite sua resposta:");
    if (!inputQuery) return;

    inputQuery = removeAccents(inputQuery);

    if (inputQuery === savedQuery) {
      reveal(answerBox);
      new Audio('certa resposta.mp3').play();
      alert("Acertô mizeravi!");

      const img = document.createElement('img');
      img.src = savedImage;
      img.alt = inputQuery;
      img.style.maxWidth = '100%';
      mediaDiv.innerHTML = '';
      mediaDiv.appendChild(img);
    } else {
      new Audio('errooo.mp3').play();
      alert("Errooooooooo");
    }
    return;
  }

  mediaDiv.innerHTML = 'Loading...';

  const apiKey = '50388721-8e951e087ae631966a49605c1';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    mediaDiv.innerHTML = '';

    if (data.hits && data.hits.length > 0) {
      const firstImage = data.hits[0];
      const imgUrl = firstImage.webformatURL;

      // Convert image to base64 and store in cookie
      const base64Image = await urlToBase64(imgUrl);
      setCookie('savedQuery', query);
      setLocalData('savedImage', base64Image);

      const img = document.createElement('img');
      img.src = base64Image;
      img.alt = firstImage.tags;
      img.style.maxWidth = '100%';
      mediaDiv.appendChild(img);

      document.querySelector("#answer .answer-box")?.setAttribute("data-hint", query);

      reveal(answerBox);
      new Audio('certa resposta.mp3').play();
      alert("Acertô mizeravi!");

    } else {
        prompt("Não consegui interpretar o que o texto significa. Tente outra coisa, algo mais comum.");
    }
  } catch (err) {
    prompt("Chat está dando DDoS. Espere 1 minuto e tente algo diferente.");
  }
}
