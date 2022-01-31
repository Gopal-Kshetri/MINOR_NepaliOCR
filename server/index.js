const express = require("express");
const fileUpload = require("express-fileupload");

const {spawn} = require('child_process');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(fileUpload());

app.get("/api", (req, res) => {
    res.json({ message: "Manoj ho" });
  });

  //link python script
app.get('/output', (req, res) => {
var dataToSend;
// spawn new child process to call the python script
const python = spawn('python', ['./Nepali-OCR/test.py']);
// // to send parameters to python script
// const python = spawn('python', ['./Nepali-OCR/test.py', sampleFile.name, 'python']);
// collect data from script
python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
});

python.stderr.on('data', (data) => {
  console.error(`stderr: $data`);
})
// in close event we are sure that stream from child process is closed
python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
    });

})

app.post("/upload",(req,res)=>{
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({message:'No image uploaded'});
  }

  sampleFile = req.files.image;
  uploadPath = __dirname + '/client/uploads/'+sampleFile.name;

  sampleFile.mv(`./Nepali-OCR/${sampleFile.name}`,function(err){
    if(err){
      console.error(err);
      return res.status(500).send(err);

    }
    
    res.json({ fileName: sampleFile.name, filePath: `/uploads/${sampleFile.name}` });
  });

  console.log(sampleFile.name)

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});