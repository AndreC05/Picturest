'use client';
import React, { useState } from 'react';

export default function UploadImage({ setFile }) {
  const [state, setState] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div className="h-[450]bg-[#e9e9e9] rounded-lg">
      <label className="m-5 flex flex-col justify-centre items-centre cursor-pointer h-[90%] border-[2px] border-gray-300 border-dashed rounded -lg text-gray-600">
        {!selectedFile ? (
          <div className="lex items-centre flex-col">
            {/* <HiArrowUpCircle className="text-[22px]" />  */}
            <h2 className="font-semibold">Click to Upload</h2>
          </div>
        ) : null}

        {selectedFile ? (
          <img
            src={window.URL.createObjectURL(selectedFile)}
            width={500}
            height={500}
            className="object-contain h-[90%]"
          />
        ) : null}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}
