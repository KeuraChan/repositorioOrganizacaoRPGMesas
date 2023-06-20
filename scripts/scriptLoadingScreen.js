window.addEventListener("load", function () {
    // Quando a página é completamente carregada, remove a tela de carregamento e mostra o conteúdo do site

    // Obtém a referência para o elemento com a classe "loader"
    var loader = document.querySelector(".loader");

    // Define a propriedade "display" do elemento "loader" como "none" para ocultá-lo
    loader.style.display = "none";

    // Obtém a referência para o elemento com o ID "container"
    var container = document.getElementById('container');

    // Define a propriedade "display" do elemento "container" como "block" para mostrá-lo
    container.style.display = "block";
});
