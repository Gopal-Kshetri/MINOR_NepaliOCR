const express = require("express");
const fileUpload = require("express-fileupload");
var flash = require('connect-flash');
const {spawn} = require('child_process');
var session = require('express-session');

const path = path();
const app = express();

app.use(flash());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'client')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.get("/api", (req, res) => {
    res.json({ message: "Manoj muji ho" });
  });

  //link python script
app.get('/output', (req, res) => {
  let imageFileName = req.flash('flashData')
var dataToSend;
// spawn new child process to call the python script
// const python = spawn('python', ['./Nepali-OCR/test.py']);
// // to send parameters to python script
const python = spawn('python', ['./Python-Folder/main.py', imageFileName]);
// collect data from script
python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
});

python.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
})
// in close event we are sure that stream from child process is closed
python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend)
    res.json({message:dataToSend})
  
    });

})

app.post("/upload",(req,res)=>{
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({errormessage:'No image uploaded'});
  }

  sampleFile = req.files.image;
  req.flash('flashData', sampleFile.name)
  uploadPath = __dirname + '/client/uploads/'+sampleFile.name;

  sampleFile.mv(`./Python-Folder/images/${sampleFile.name}`,function(err){
    if(err){
      console.error(err);
      return res.status(500).send(err);

    }  
    
    res.json({ fileName: sampleFile.name, filePath: `/home/abish/abish/OcrInterface/Python-Folder/${sampleFile.name}` });

  });

  
});
app.listen(process.env.PORT || 5000);

//Discord webhook