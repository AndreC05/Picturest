// 'use client';
// import UploadImage from './UploadImage';
// import React, { useState } from 'react';

// export default function Form() {
//   const [file, setFile] = useState();

//   const onSave = () => {
//     console.log('File:', file);
//   };
//   return (
//     <div className="bg-white p-2 sm:pb-2 sm:p-16 gap-5 rounded-2xl flex flex-col">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"></div>
//       <UploadImage setFile={(file) => setFile(file)} />
//       <div className="flex justify-end m-2">
//         <button
//           onClick={() => onSave()}
//           className="bg-red-500 p-2 text-white font-semibold px-3 rounded-lg"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
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
      const { publicUrl } = await supabase.storage
        .from('image')
        .getPublicUrl(file.name);
      setImageUrl(publicUrl);
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
