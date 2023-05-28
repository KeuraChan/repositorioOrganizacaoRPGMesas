function generatePDF() {

    let DataHoje = new Date();
    let DataFormatada = DataHoje.getDate() + '-' + parseInt(DataHoje.getMonth() + 1) + '-' + DataHoje.getFullYear() + '-' + DataHoje.getHours() + '-' + DataHoje.getMinutes();

    let doc = new jsPDF('p', 'pt', 'letter');
    let htmlstring = '';
    let tempVarToCheckPageHeight = 0;
    let pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector  
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"  
            return true
        }
    };
    margins = {
        top: 150,
        bottom: 60,
        left: 150,
        right: 150,
        width: 600
    };

    var y = 20;

    doc.setLineWidth(2);

    doc.text(200, y = y + 30, "TOTAL MARKS OF STUDENTS");

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
    })
    doc.save('Relatório_' + DataFormatada + '.pdf');
}