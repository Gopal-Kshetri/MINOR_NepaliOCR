import React from 'react'

const Error = (props) => {
  return (
    <div>
         {props.errorMessage ?(
            <div class="error-msg">
              <i class="fa fa-times-circle"></i>
              Image not uploaded
            </div>
          ):null}
    </div>
  )
}

export default Error