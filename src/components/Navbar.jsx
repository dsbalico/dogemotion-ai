import React from 'react';
import { GiSittingDog } from 'react-icons/gi';

function Navbar() {
  return (
    <div className='fixed text-gray-900 border-b-4 border-blue-900 top-0 bg-white p-5 shadow-md w-full flex justify-between'>
        <span className='text-2xl font-bold flex gap-1 tracking-tighter'>
            <GiSittingDog className='self-center h-7 w-7 text-yellow-900' />
            Dog Emotion <span className='text-blue-900'>AI</span>
        </span>

        <a target="_blank" href="https://github.com/daniel-balico/dogemotion-ai" className='hover:cursor-pointer self-center'>About this AI</a>
    </div>
  )
}

export default Navbar