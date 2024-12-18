'use client';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

export default function Upload() {
  const [imageUrl, setImageUrl] = useState();

  const uploadFile = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert('No file selected!');
      return;
    }

    const { data, error } = await supabase.storage
      .from('image')
      .upload(file.name, file);

    if (error) {
      alert('Error uploading file:', error.message);
    } else {
      alert('File uploaded successfully!');
      const { data } = await supabase.storage
        .from('image')
        .getPublicUrl(file.name);
      setImageUrl(data.publicUrl);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={uploadFile} />
      {/* {imageUrl && ( */}
      <div>
        <h2>Uploaded Image</h2>
        <img src={imageUrl} alt="Uploaded" />
      </div>
      {/* )} */}
    </div>
  );
}
