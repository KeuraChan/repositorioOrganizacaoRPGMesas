document.getElementById('createNewTable').addEventListener('click', () => {
    // O código a seguir é executado quando o elemento com o ID "createNewTable" é clicado.

    // Cria um novo elemento <li> para representar a nova mesa.
    var novaMesa = document.createElement('li');
    novaMesa.className = 'cardMesa'; // Define a classe "cardMesa" para a nova mesa.

    // Define o conteúdo HTML da nova mesa usando a propriedade innerHTML.
    novaMesa.innerHTML = 
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
  ;

    // Adiciona a nova mesa à lista de mesas com o ID "lista_mesas".
    document.getElementById('lista_mesas').appendChild(novaMesa);
});
