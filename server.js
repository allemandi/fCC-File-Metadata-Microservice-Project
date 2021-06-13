var express = require('express');
var cors = require('cors');
require('dotenv').config();

// as recommended in original project specs, middleware for multipart/form-data and uploading files 
var multer = require("multer");

var app = express();

app.use(cors());

// process.cwd() returns the current working directory
// previously, project template iterations by default were app.use(express.static('public'))
app.use('/public', express.static(process.cwd() + '/public'));

// previously, project template iterations by defaule were res.sendFile(__dirname + '/views/index.html')
// __dirname returns directory containing JS source code file
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

// max File size to set limits
// 25 mb in this case
let maxFileSize = 25 * 1000 *1000;
// multer options, also containing the dest property for where to upload files
var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: maxFileSize
    }
  })

// index.html POST action has method="POST" action="/api/fileanalyse"
// name attribute as required by project spec is upfile
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  
  
  // req.file returns multer single file upload
  let singFile = req.file;

  // if the singFile does not exist (not uploaded)
  if(!singFile)
  {
    //return "File Not Uploaded"
    return res.send("File Not Uploaded");
  }


  //otherwise, return the json response containing name, type, and size of file

  return res.json({
    name: singFile.originalname,
    type: singFile.mimetype,
    size: singFile.size

  })

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
});
