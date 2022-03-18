import React from 'react'

const Error = (props) => {
  return (
    <div>
         {props.errorMessage ?(
            <div class="error-msg">
              <i class="fa fa-times-circle"></i>
              <br></br>
              <div class="message">
              Image not uploaded
              </div>
            </div>
          ):null}
    </div>
  )
}

export default Error