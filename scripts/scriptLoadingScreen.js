window.addEventListener("load", function () {
    // Quando a página é completamente carregada, remove a tela de carregamento e mostra o conteúdo do site

    // setTimeout(() =>{
    var loader = document.querySelector(".loader");
    loader.style.display = "none";
    document.getElementById('container').style.display = "block";
    // }, 500);

  });