import React, { useState } from 'react';
import { MdCameraswitch } from 'react-icons/md';
import { TbCapture } from 'react-icons/tb';
import Webcam from "react-webcam";
import dataURLToFile from '../utilities/dataURLToFile';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function WebcamComponent({ setImageFile, setImageView }) {
  const [facingMode, setFacingMode] = useState();

  let videoConstraints = {
    facingMode: facingMode
  };

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  
  
  return (
    <Webcam className=" mx-auto border-4 border-dashed border-white rounded-xl" audio={false} height={400} width={400} screenshotFormat="image/jpeg"  videoConstraints={videoConstraints}>
        {({ getScreenshot }) => (
            <div className='flex md:w-[400px] md:mx-auto gap-2 justify-center mt-2'>
              <button type='button' className='w-full text-blue-900 px-8 py-3 bg-white rounded-lg'
                  onClick={() => {
                      const imageSrc = getScreenshot();
                      setImageView(URL.createObjectURL(dataURLToFile(imageSrc)));
                      setImageFile(dataURLToFile(imageSrc, 'image.jpg'));
                  }}
                  >
                  <TbCapture className='mx-auto text-xl' />
              </button>
              <button className='w-full text-blue-900 px-8 py-3 bg-white rounded-lg' onClick={() => handleClick()}>
                <MdCameraswitch className='mx-auto text-xl' />
              </button>
            </div>
        )}
    </Webcam>
  )
}

export default WebcamComponent