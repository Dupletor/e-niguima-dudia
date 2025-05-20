function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown.style.display === 'none') {
      fetchAvailableLevels();
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
}

function fetchAvailableLevels() {
    fetch('levels.json')
      .then(response => response.json())
      .then(links => {
        const dropdown = document.getElementById('dropdown');
        dropdown.innerHTML = '';

        links.filter(level => level != 6)

    .forEach(level => {
          const btn = document.createElement('button');
          btn.textContent = `Enigma ${level}`;
          btn.style.display = 'block';
          btn.style.margin = '2px';
          btn.onclick = () => {
            window.location.href = `?level=${level}`;
          };
          dropdown.appendChild(btn);
        });
      })
      .catch(err => {
        const dropdown = document.getElementById('dropdown');
        dropdown.innerHTML = '<div style="color: red;">Erro ao carregar níveis.</div>';
      });
}