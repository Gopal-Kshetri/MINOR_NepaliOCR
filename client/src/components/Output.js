import React, { Fragment } from 'react'
import fileDownload from 'js-file-download'
import MoonLoader from "react-spinners/MoonLoader";







const Output = (props) => {

  return (
    <Fragment>
          {props.data? (
        <div  id ='wrapper'class='output'>  
            <h4>Output</h4>
          <textarea  id="text" disabled={props.disabled} rows="10" cols='30' value={props.editabletext} onChange={(e)=>props.setChanged(e.target.value)}></textarea>  

          <button className='button'  onClick={props.onEdit.bind(this)}>Edit</button>
          <button className='button'  onClick={props.onEdit.bind(this)}>Save</button>
          <div>
          <button className='buttona'  onClick={() => {fileDownload(props.editabletext,"mydata.txt")}}>Download  File</button>
          
          </div>
            
            
          
        </div>
        
      ) :<MoonLoader color={props.color} loading={props.loading} css={props.override} size={150} />}

    </Fragment>
  )
}

export default Output