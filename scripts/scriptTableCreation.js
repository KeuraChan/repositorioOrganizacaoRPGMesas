document.getElementById('createNewTable').addEventListener('click', () => {
    var novaMesa = document.createElement('li');
    novaMesa.className = 'cardMesa';

    novaMesa.innerHTML = `
      <div onclick="window.location.href='table.html'">
        <h3 class="cardMesa-titulo">Nome da Mesa</h3>
        <div class="cardMesa-header">
          <img src="../media/logo_mesa.png" alt="Imagem do Card" class="cardMesa-img" />
          <div class="cardMesa-buttons">
            <button class="config-button">
              <i class="fa-solid fa-gear"></i>
            </button>
            <button class="delete-button">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('lista_mesas').appendChild(novaMesa);
  });