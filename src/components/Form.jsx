'use client';
import UploadImage from './UploadImage';
import React, { useState } from 'react';

export default function Form() {
  const [file, setFile] = useState();

  const onSave = () => {
    console.log('File:', file);
  };
  return (
    <div className="bg-white p-16 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => onSave()}
          className="bg-red-500 p-2 text-white font-semibold px-3 rounded-lg"
        >
          Save
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"></div>
      <UploadImage setFile={(file) => setFile(file)} />
    </div>
  );
}
