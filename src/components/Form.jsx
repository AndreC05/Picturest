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
    <div className="h-[450]bg-[#e9e9e9] rounded-lg">
      <h1 className="font-semibold text-[25px] flex justify-center">
        Upload Image
      </h1>

      <input
        type="file"
        className="text-[15px] align-center text-center"
        onChange={uploadFile}
      />
      <div>
        <h2 className="font-semibold text-[30px] flex justify-center">
          Uploaded Image
        </h2>

        <img
          src={imageUrl}
          alt="Uploaded"
          width={500}
          height={500}
          className="object-contain h-[90%] "
        />
      </div>
    </div>
  );
}
