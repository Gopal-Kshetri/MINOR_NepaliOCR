import React, { Fragment } from 'react'
import fileDownload from 'js-file-download'

const Output = (props) => {
  return (
    <Fragment>
          {props.data? (
        <div class='output'>  
            <h4>Output</h4>
        

          <div class="form-group green-border-focus">
            <label for="exampleFormControlTextarea5"></label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="6" value={props.data.message} readOnly={false}></textarea>
          </div>

          <div>
          <button className='buttona'  onClick={() => {fileDownload(props.data.message,"mydata.txt")}}>Download  File</button>
          </div>
            
            
          
        </div>
        
      ) : null}
    </Fragment>
  )
}

export default Output