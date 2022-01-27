const express = require("express");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(fileUpload());

app.get("/api", (req, res) => {
    res.json({ message: "Manoj muji ho" });
  });

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

 
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}` , __dirname);
});