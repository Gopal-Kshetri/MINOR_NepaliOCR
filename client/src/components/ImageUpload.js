import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Error from './Error';
import fileDownload from 'js-file-download'

import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import Output from './Output';





const ImageUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [data, setData] = React.useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#66fcf1");
  const [{ alt, src }, setImg] = useState({
    src: null,
    alt: 'Upload an Image'
  });

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const [editabletext, setEditabletext] = React.useState('')

  const [disabled, setDisabled] = React.useState(true)


  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      });
    }
  }

  const onEdit = e => {
    setDisabled(!disabled)

  }





  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });

      await axios.get('/output')
        .then((response) => {
          setData(response.data);
          setEditabletext(response.data.message)
        });



      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath })



    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server")
      }
      else {
        setErrorMessage(err.response.data.errormessage)
        console.log(err.response.data.errormessage)
      }

    }
  }


  return (
    <Fragment className="container">

      <form id="file-upload-form" className="uploader" onSubmit={onSubmit}>
        <input id="file-upload" type="file" accept="image/*" onChange={onChange} />

        <label htmlFor="file-upload" id="file-drag">
          <div id="start">
            <div id='abish'>Upload an image</div>
            <div id="notimage" className="hidden">Please select an image</div>
            <span id="file-upload-btn" className="btn btn-primary">{filename}</span>
          </div>
          <div>
            <img className='preview' src={src} alt='' />
          </div>
        </label>
        <input type="submit" value="Upload" onClick={() => setLoading(!loading)} className='button' />

      </form>

      <div class='output-container'>
        <Output data={data} editabletext={editabletext} onEdit={onEdit} disabled={disabled} setChanged={setEditabletext} color={color} loading={loading} override={override} css={css} />
      </div>

      <Error errorMessage={errorMessage} />
    </Fragment>


  )
};

export default ImageUpload;
