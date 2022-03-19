import React, { Fragment } from 'react'
import fileDownload from 'js-file-download'
import BounceLoader from "react-spinners/BounceLoader";


const Output = (props) => {

  return (
    <Fragment>
      {props.data ? (
        <div id='wrapper'>
          <h2 style={{ color: 'white' }}> Output</h2>
          <div className='textbox'>
            <textarea id="text" disabled={props.disabled} rows="7" cols='22' value={props.editabletext} onChange={(e) => props.setChanged(e.target.value)}></textarea>
          </div>
          <button className='button' id='editButton' onClick={props.onEdit.bind(this)}>Edit</button>
          <button className='button' id='saveButton' onClick={props.onEdit.bind(this)}>Save</button>
          <button id='downloadButton' onClick={() => { fileDownload(props.editabletext, "mydata.txt") }}><i className="fa fa-download" aria-hidden="true"></i></button>
        </div>

      ) : <div class="loading">
        <BounceLoader color={props.color} loading={props.loading} css={props.override} size={60} />
      </div>
      }
    </Fragment>
  )
}

export default Output