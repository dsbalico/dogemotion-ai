import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const focusedStyle = {
  borderColor: '#cbd5e1'
};

const acceptStyle = {
  borderColor: '#22c55e',
};

const rejectStyle = {
  borderColor: '#dc2626'
};

function DropzoneComponent({ setImageView, setImageFile }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setImageView(URL.createObjectURL(acceptedFiles[0]));
    setImageFile(acceptedFiles[0]);
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop, accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className='bg-blue-800 p-3 rounded-xl mt-4'>
      <div className='hover:cursor-pointer transition-all duration-300 bg-blue-900 border-4 border-white border-dashed h-56 rounded-xl flex justify-center' {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div className='self-center text-center'>
          <FaCloudUploadAlt className='text-white mx-auto w-14 h-14' />
          <p className='text-white text-lg sm:text-xl'>Drop Image here, or Click to Select Image</p>
        </div>
      </div>
    </div>
  )
}

export default DropzoneComponent