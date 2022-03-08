import React, { Fragment } from 'react'
import fileDownload from 'js-file-download'




const Output = (props) => {

 

  return (
    <Fragment>
          {props.editabletext? (
        <div class='output'>  
            <h4>Output</h4>
        

          <div class="form-group green-border-focus">
            <label for="exampleFormControlTextarea5"></label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="6" value={props.editabletext.message} onChange={(e)=>props.onChange()} readOnly={false}></textarea>
          </div>

          <div>
          <button className='buttona'  onClick={() => {fileDownload(props.editabletext.message,"mydata.txt")}}>Download  File</button>
          </div>
            
            
          
        </div>
        
      ) :null}
    </Fragment>
  )
}

export default Output