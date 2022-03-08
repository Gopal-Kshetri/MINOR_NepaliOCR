import React , {Fragment ,useState} from 'react';
import axios from 'axios';
// import Output from './Output';
import Error from './Error';
import fileDownload from 'js-file-download'


const ImageUpload = () => {

  const [file,setFile]  = useState('');
  const [filename,setFilename]  = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const[data,setData]= React.useState(null)
  const [errorMessage , setErrorMessage] = useState('')
  const [{alt, src}, setImg] = useState({
        src: null,
        alt: 'Upload an Image'
    });

    const [editabletext,setEditabletext]=React.useState('')

  const onChange = e =>{
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

    if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
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
        setEditabletext(response.data.message)
        

      });



      const {fileName, filePath}=res.data;

      setUploadedFile({fileName,filePath})



    }catch(err){
      if(err.response.status === 500){
      console.log("There was a problem with the server")
      }
      else{
        setErrorMessage(err.response.data.errormessage)
        console.log(err.response.data.errormessage)
      }

    }
  }

  // const ourData  = data.message

  return(
      <Fragment>
          <div className="container">
          
          <form id="file-upload-form" className="uploader" onSubmit={onSubmit}>
          <input id="file-upload" type="file" accept="image/*"  onChange={onChange}/>

          <label htmlFor="file-upload" id="file-drag">
            <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <div id='abish'>Upload an image</div>
            <div id="notimage" className="hidden">Please select an image</div>  
            <span id="file-upload-btn" className="btn btn-primary">{filename}</span>      
            </div>
            <div>
                <img style={{ width: '40%' , height:'25%'}} src={src} alt=''/>
            </div>
          </label>
          <input type="submit" value="Upload" className='button' />
          </form>

          {data? (
        <div class='output'>  
            <h4>Output</h4>
        

          <div class="form-group green-border-focus">
            <label for="exampleFormControlTextarea5"></label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="6" value={editabletext} onChange={(e)=>setEditabletext(e.target.value)}></textarea>
          </div>

          <div>
          <button className='buttona'  onClick={() => {fileDownload(editabletext,"mydata.txt")}}>Download  File</button>
          </div>
            
            
          
        </div>
        
      ) :null}


        <Error errorMessage={errorMessage} />
</div>
      </Fragment>


    )
};

export default ImageUpload;
