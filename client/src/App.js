
import React  from 'react';
import ImageUpload from './components/ImageUpload';
// import 'bootstrap/dist/css/bootstrap.min.css'




const App = () => {  

  return(
  <div>
    <h1 class='heading'>
      Tesseract Based OCR System
    </h1>
    <div class='introduction'>
      <h1 class='sub-heading'>
        Introduction
        </h1>
        <div class='intro'>
          <p>This is a simple website that aims to help you recognize text in images.</p>
          </div>
    </div>
    <div>
      <h1 class='img-header'>
        Application
      </h1>
      <div class='img-container'>
    <ImageUpload />
    </div>
    </div>
  </div>
  )
};

export default App;
