import React , {Fragment ,useState} from 'react';
import axios from 'axios';

const ImageUpload = () => {

  const [file,setFile]  = useState('');
  const [filename,setFilename]  = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const[data,setData]= React.useState(null)
  const onChange = e =>{
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',file);

    try{
      const res = await axios.post('/upload',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });

      await axios.get('/output')
      .then((response) => {
        setData(response.data);
      });

      const {fileName, filePath}=res.data;

      setUploadedFile({fileName,filePath})


    }catch(err){
      if(err.response.status === 500){
      console.log("There was a problem with the server")
      }
      else{
        console.log(err.response.data.message)
      }

    }
  }

  return(
      <Fragment>
        <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
          </div>
            <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' />
          </form>
          {data ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{data.message}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      </Fragment>


    )
};

export default ImageUpload;
