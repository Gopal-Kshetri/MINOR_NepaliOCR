import React from 'react'
import fileDownload from 'js-file-download'

const Output = (props) => {
  return (
    <div>
          {props.data? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
          <div class="form-group green-border-focus">
            <label for="exampleFormControlTextarea5">Output</label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="3" value={props.data.message}></textarea>
          </div>
            <button className='buttona'  onClick={() => {fileDownload(props.data.message,"mydata.txt")}}>Download  File</button>
            
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Output