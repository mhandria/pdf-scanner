let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);
pdfParser.loadPDF("./Docs/MGMT.pdf");

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    //fs.writeFile("./Docs/MGMTcontent.txt", pdfParser.getRawTextContent());
    var doc = fs.readFileSync("./Docs/MGMTcontent.txt", "utf-8").split("\n");

    var i;
    var count = 0;
    for (i = 0; i < doc.length; i++) {
        //console.log(doc[i] + "\n");
        if (doc[i].toUpperCase().startsWith("MEETING")) {
            count++;
            console.log(doc[i].toString());
        }
    }
    console.log(count);
    setTimeout(function () { }, 100000);
});



