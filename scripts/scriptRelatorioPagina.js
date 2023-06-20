function generatePDF() {
    // Obtém a data e hora atuais
    let DataHoje = new Date();

    // Formata a data e hora no formato desejado
    let DataFormatada = DataHoje.getDate() + '-' + parseInt(DataHoje.getMonth() + 1) + '-' + DataHoje.getFullYear() + '-' + DataHoje.getHours() + '-' + DataHoje.getMinutes();

    // Cria um novo objeto jsPDF com orientação 'p' (retrato), unidade 'pt' (pontos) e tamanho 'letter' (carta)
    let doc = new jsPDF('p', 'pt', 'letter');

    // Variáveis para manipular o conteúdo HTML
    let htmlstring = '';
    let tempVarToCheckPageHeight = 0;
    let pageHeight = 0;

    // Obtém a altura da página do PDF
    pageHeight = doc.internal.pageSize.height;

    // Define os elementos especiais que serão tratados de forma diferente durante a conversão do HTML para PDF
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true; // Retorna verdadeiro para ignorar a extração de texto desses elementos
        }
    };

    // Define as margens do documento
    margins = {
        top: 150,
        bottom: 60,
        left: 150,
        right: 150,
        width: 600
    };

    var y = 20;

    // Define a espessura da linha
    doc.setLineWidth(2);

    // Adiciona um texto ao documento PDF na posição (200, y + 30)
    doc.text(200, y = y + 30, "TOTAL MARKS OF STUDENTS");

    // Gera uma tabela a partir do HTML com o ID 'simple_table', define a posição de início (startY) e o tema 'grid'
    // Também define estilos personalizados para as colunas
    doc.autoTable({
        html: '#simple_table',
        startY: 80,
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 50,
            },
            1: {
                cellWidth: 100,
            },
            2: {
                cellWidth: 180,
            }
        },
        styles: {
            minCellHeight: 20
        }
    });

    // Salva o documento PDF com um nome específico baseado na data formatada
    doc.save('Relatório_' + DataFormatada + '.pdf');
}
