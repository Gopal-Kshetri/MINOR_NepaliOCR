
import React from 'react';
import ImageUpload from './components/ImageUpload';
import Output from './components/Output';


//------------ Kire ko app hai
const App = () => {

  return (
    <div>
      <div class='flexcontainer'>
        <div>Nepali Handwriting Digitizer</div>
      </div>
      <div class='flex2'>
        <div><ImageUpload /></div>
      </div>


    </div>
  )
};

export default App;
