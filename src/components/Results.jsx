import React, { useEffect, useState } from 'react';
import animateValue from '../utilities/animateValue';
import descriptions from '../utilities/tips';

function Results({result, warning, imageView, setImageFile, setImageView, setLoading, setResult}) {
    const [dogEmotion, setDogEmotion] = useState('');
    const [description, setDescription] = useState('');

    function classifyEmotion(data) {
        const max = Math.max(...data)
        const index = data.indexOf(max);
    
        if(index === 0) setDogEmotion("Your dog is angry! 😡")
        if(index === 1) setDogEmotion("Your dog is happy! 😃")
        if(index === 2) setDogEmotion("Your dog is relaxed! 😌")
        if(index === 3) setDogEmotion("Your dog is sad! 😔")
    }

    function generateDescription(data) {
        const max = Math.max(...data)
        const index = data.indexOf(max);

        if(index === 0) {
            const random = Math.floor(Math.random() * descriptions.angry.length);
            setDescription(descriptions.angry[random]);
        }
        if(index === 1) {
            const random = Math.floor(Math.random() * descriptions.happy.length); 
            setDescription(descriptions.happy[random]);
        }
        if(index === 2) {
            const random = Math.floor(Math.random() * descriptions.relaxed.length);

            setDescription(descriptions.relaxed[random]);
        }
        if(index === 3) {
            const random = Math.floor(Math.random() * descriptions.sad.length); 
            setDescription(descriptions.sad[random]);
        }
    }

    useEffect(() => {
        classifyEmotion(result.result);
        generateDescription(result.result);

        const angry = document.getElementById("angry");
        const happy = document.getElementById("happy");
        const relaxed = document.getElementById("relaxed");
        const sad = document.getElementById("sad");

        const angry_bar = document.getElementById("angry-bar");
        const happy_bar = document.getElementById("happy-bar");
        const relaxed_bar = document.getElementById("relaxed-bar");
        const sad_bar = document.getElementById("sad-bar");

        // Count Animation
        setTimeout(() => {
            animateValue(angry, angry_bar, 0, result.result[0], 1000);
            animateValue(happy, happy_bar, 0, result.result[1], 1000);
            animateValue(relaxed, relaxed_bar, 0, result.result[2], 1000);
            animateValue(sad, sad_bar, 0, result.result[3], 1000);
          }, 1000)

    }, [])

    return (
        <div className='mt-4'>
            {
                warning ? (
                    <p className="text-center bg-yellow-50 rounded-xl shadow p-2 text-gray-600 text-sm"><span className='text-yellow-600 font-medium'>Warning:</span> Our system noticed that the picture you've submitted may not be a dog. Expect non-sense and inaccurate results.</p>
                ): null
            }
            <div className='md:flex gap-4 justify-center mt-4'>
                <img className='w-[340px] mx-auto md:mx-0 rounded-xl' src={imageView} />
                <div className='self-center md:mt-0'>
                    <h1 className='text-3xl font-bold mb-2 mt-2 md:mt-0 text-center md:text-left'>{ dogEmotion }</h1>
                    <p className='mb-4 text-center md:text-left'><span className='font-medium'>Tip:</span> { description }</p>
                    <div className='flex w-full mx-auto gap-2'>
                        <p className='self-center text-lg font-medium w-[120px]'>Angry: </p>
                        <div className='w-full bg-gray-200 self-center rounded-lg'>
                            <div id="angry-bar" className="h-5 bg-blue-900 w-[0%] self-center rounded-lg"></div>
                        </div>
                        <p className='w-[95px]'><span id="angry">0</span>%</p>
                    </div>
                    <div className='flex w-full mx-auto gap-2'>
                        <p className='self-center text-lg font-medium w-[120px]'>Happy: </p>
                        <div className='w-full bg-gray-200 self-center rounded-lg'>
                            <div id="happy-bar" className="h-5 bg-blue-900 w-[0%] self-center rounded-lg"></div>
                        </div>
                        <p className='w-[95px]'><span id="happy">0</span>%</p>
                    </div>
                    <div className='flex w-full mx-auto gap-2'>
                        <p className='self-center text-lg font-medium w-[120px]'>Relaxed: </p>
                        <div className='w-full bg-gray-200 self-center rounded-lg'>
                            <div id="relaxed-bar" className="h-5 bg-blue-900 w-[0%] self-center rounded-lg"></div>
                        </div>
                        <p className='w-[95px]'><span id="relaxed">0</span>%</p>
                    </div>
                    <div className='flex w-full mx-auto gap-2'>
                        <p className='self-center text-lg font-medium w-[120px]'>Sad: </p>
                        <div className='w-full bg-gray-200 self-center rounded-lg'>
                            <div id="sad-bar" className="h-5 bg-blue-900 w-[0%] self-center rounded-lg"></div>
                        </div>
                        <p className='w-[95px]'><span id="sad">0</span>%</p>
                    </div>

                    <button onClick={() => {
                        setImageFile(''); setImageView('');
                        setResult({show: false}); setLoading(false);
                    }} className='w-full bg-blue-900 mt-4 rounded-lg text-white py-1.5'>Try Again</button>
                </div>
            </div>
        </div>
    )
}

export default Results