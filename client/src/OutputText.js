import React from 'react'

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python', ["../../../Python-Folder/test.py"])

export default function OutputText() {
  return (
    <div>
      {/* pythonProcess.stdout.on('data', (data) => {
              // Do something with the data returned from python script
          }); */}
    </div>
  )
}
