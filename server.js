//declare the express
var express = require('express');
var app = express();

//declare path
var path = require('path');

//declare multer and set a test destination folder
var multer = require('multer');
var upload = multer({dest:'upload/'});


//declare pdf2json api.
var fs = require('fs'),
    PDFParser = require("pdf2json");


//initialize pdf2json parser to grab pdf text content as raw
var pdfParser = new PDFParser(this, 1);
//depending on what comes back from pdfParser execute different functions



//initialize an array of someArray
var textArray = ["hello"];


//declares a public folder to be static
//to use path to a folder we require Node module path
//-> exposes a join method allows us to chain variables to create
//   a file path: (param of path.join(@first, @second))
//   @first : native Node variable "__dirname" contains the file path
//            of the current folder.
//   @second: name of the folder containing the static recources
app.use('/', express.static(path.join(__dirname, 'public')));


//get is a HTTP method route
//Routes HTTP GET requests to the specific path with the
//specified callback functions.:
//  app.get(@first, @second)
//  @first: path
//  @second: callback function/ function
app.get('/array', function(req, res){
  res.send(textArray);
})



//post is a HTTP method route
//Routes HTTP POST requrests a specified path with the specified
//callback functions.  Since Express 4 does not support res.files anymore
//another way to grab files is required using "multer":
//  app.post(@first, @second, @third):
//  @first: path
//  @second: uses multer that will save one file into a subdirectory of
//           upload, expecting a "pdfFile" name from front-end.
//  @third: callback function
app.post('/upload',  upload.single("pdfFile"), function(req, res, next){
  var file = req.file;

  if(file == undefined){
    res.status(404).send("FILE NOT FOUND");
  }

  //load file path into a pdfParser
  pdfParser.loadPDF(file.path);
  //envoke once then delete the event so that there won't be double callbacks.
  pdfParser.once("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.once("pdfParser_dataReady", pdfData => {
    textArray = pdfParser.getRawTextContent().split(/\s+/);
    res.redirect('/home.html');
  });

});





//this is used to listen to port 3000 and post a "message" on console when
//server.js (this file) is ran.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
