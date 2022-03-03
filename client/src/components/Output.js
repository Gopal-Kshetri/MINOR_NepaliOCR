import React from 'react'
import fileDownload from 'js-file-download'

const Output = (props) => {
  return (
    <div>
          {props.data? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{props.data.message}</h3>
            <button className='buttona'  onClick={() => {fileDownload(props.data.message,"mydata.txt")}}>Download  File</button>
            
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Output