
import React  from 'react';
import ImageUpload from './components/ImageUpload';

const App = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/output")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return(
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      Nepali Handwriting Digitizer
    </h4>
    <ImageUpload />
    <p>{!data ? "Loading..." :data }</p>
    
  </div>
  )
};

export default App;
