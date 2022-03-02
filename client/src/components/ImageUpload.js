import React , {Fragment ,useState} from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download'


const text = 'adhabdhb'
const ImageUpload = () => {

  const [file,setFile]  = useState('');
  const [filename,setFilename]  = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const[data,setData]= React.useState(null)
  const[downloadLink,setDownloadLink]=React.useState('null')

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

      
      console.log(downloadLink)



    }catch(err){
      if(err.response.status === 500){
      console.log("There was a problem with the server")
      }
      else{
        console.log(err.response.data.message)
      }

    }
  }

  // const ourData  = data.message



  return(
      <Fragment>
        {/* <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
          </div>
            <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' />
          </form> */}

          
          <form id="file-upload-form" className="uploader" onSubmit={onSubmit}>
          <input id="file-upload" type="file" accept="image/*"  onChange={onChange}/>

          <label htmlFor="file-upload" id="file-drag">
            <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <div>Upload an image</div>
            <div id="notimage" className="hidden">Please select an image</div>        
            </div>
            <div id="response" className="hidden">
            <div id="messages"></div>
            <progress className="progress" id="file-progress" value="0">
                <span>0</span>%
            </progress>
            </div>
          </label>
          <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' />
          </form>




          {data ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{data.message}</h3>
            <button onClick={() => {fileDownload(data.message,"mydata.txt")}}>Download  File</button>
            {/* <a href={downloadLink} download={'downloaded.txt'}>Click here to download</a> */}
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      </Fragment>


    )
};

export default ImageUpload;
