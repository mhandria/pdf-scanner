var express = require('express');
var app = express();

var path = require('path');
var multer = require('multer');
var upload = multer({dest:'upload/'});

let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);

var someArray = ["hello"];

function converter(file_path){
  let exact_path = file_path
  pdfParser.loadPDF(exact_path);
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {

      var myArray = pdfParser.getRawTextContent();
      someArray = myArray.split(/\s+/);
      console.log(someArray);
  });

}

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/array', function(req, res){
  converter(file.path);
  res.send(someArray);
})

app.post('/upload', upload.single("pdfFile"), function(req, res){
  var file = req.file;
  // pdfParser.loadPDF(file.path);
  // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  // pdfParser.on("pdfParser_dataReady", pdfData => {
  //     var myArray = pdfParser.getRawTextContent();
  //     someArray = myArray.split(/\s+/);
  // });

  build.  
})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
