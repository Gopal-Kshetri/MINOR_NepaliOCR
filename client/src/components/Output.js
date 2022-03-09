import React, { Fragment } from 'react'
import fileDownload from 'js-file-download'
import MoonLoader from "react-spinners/MoonLoader";







const Output = (props) => {

  return (
    <Fragment>
          {props.data? (
        <div  id ='wrapper'> 
          <h2 style={{color:'white'}}> Output</h2>
        <div className='textbox'>
          <textarea  id="text" disabled={props.disabled} rows="10" cols='42' value={props.editabletext} onChange={(e)=>props.setChanged(e.target.value)}></textarea>  
          </div>  
          <button className='button' id='editButton' onClick={props.onEdit.bind(this)}>Edit</button>
          <button className='button' id='saveButton' onClick={props.onEdit.bind(this)}>Save</button>
          <div>
          <button className='button' id='downloadButton' onClick={() => {fileDownload(props.editabletext,"mydata.txt")}}>Download  File</button>
          
          </div>
            
            
          
        </div>
        
      ) : <div className='loading'>
      <MoonLoader color={props.color} loading={props.loading} css={props.override} size={150} />
          </div>
}
    </Fragment>
  )
}

export default Output