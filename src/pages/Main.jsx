import React, { useEffect, useState } from 'react';
import { AiFillFileImage, AiOutlineRedo } from 'react-icons/ai';
import { BiRightArrow } from 'react-icons/bi';
import { FaCloudUploadAlt, FaCog } from 'react-icons/fa';
import { GiSittingDog } from 'react-icons/gi';
import { TbCapture } from 'react-icons/tb';
import DropzoneComponent from '../components/DropzoneComponent';
import Navbar from '../components/Navbar';
import Results from '../components/Results';
import WebcamComponent from '../components/WebcamComponent';
import { checkIfDog, classifyDogEmotion } from '../services/dec.service';

function Main2() {
	const [useCamera, setUseCamera] = useState(false);
	const [imageFile, setImageFile] = useState('');
	const [imageView, setImageView] = useState('');
	
	const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
	const [loading, setLoading] = useState(false);
	const [result, setResult] =  useState({show: false});
	const [warning, setWarning] = useState(false);

	useEffect(() => {
		if(imageFile !== '') setDisableSubmitBtn(false);
		else setDisableSubmitBtn(true);
	}, [imageFile])

	async function handleSubmit() {
		setLoading(true);
		
		const img = imageFile;
		const formData = new FormData();
		formData.append("image", img);

		await checkIfDog(formData)
			.then(res => {
				const max = Math.max(...res.data)
        		const index = res.data.indexOf(max);

				if(index === 1) setWarning(true);
				else setWarning(false)
			}).catch((e) => { console.log(e); setLoading(false) }); 

		await classifyDogEmotion(formData)
			.then(res => {
			  if(Array.isArray(res.data)) 
				setResult({show: true, result: res.data})
			})
			.catch(() => setLoading(false));

		return setLoading(false)
	}

	return (
		<div>
			<Navbar />
			<div className='text-black mx-5 text-gray-800 md:w-[800px] lg:w-[1000px] md:mx-auto lg:px-5 my-24'>		
				<header className='md:flex md:gap-4'>
					<div className='mt-2 lg:mt-0 self-center'>
						<p className='text-sm text-gray-500 tracking-widest'>
							AI Adventures #1
						</p>
						<h1 className='font-bold text-3xl lg:text-4xl'><span className='text-blue-900'>AI</span> that recognizes your dog's emotions! 🐶</h1>
						<p className='mt-1 text-lg'>Our AI tool uses advanced machine learning to classify and recognize a range of emotions in dogs. It helps you understand and connect with your furry friend by providing insight into their emotions.</p>
					</div>
				</header>
				 
				 { result.show ? (
						<Results 
							result={result} 
							imageView={imageView}
							warning={warning}
							setImageFile={setImageFile}
							setImageView={setImageView}
							setResult={setResult}
							setLoading={setLoading}
						/>
					): (
						loading && result.show === false ? (
							<div className='flex justify-center'>
								<div className='self-center p-5 text-center text-black rounded-xl'>
									<img className='animate-pulse w-[300px] md:w-[390px] mx-auto mt-4 rounded-lg' src={imageView} />
									<p className='text-sm text-gray-700 flex justify-center gap-1 mt-0.5'><FaCog className='self-center text-blue-900 animate-spin' />Analyzing Image...</p>
								</div>
							</div>
						): (
							<> 
								{ imageView === '' || imageFile === '' ? (
									useCamera ? (
										<div className='mt-4 bg-blue-900 p-3 rounded-xl border-gray-300'>
											<WebcamComponent setImageFile={setImageFile} setImageView={setImageView} />
										</div>
									): <DropzoneComponent setImageFile={setImageFile} setImageView={setImageView} />
								): (
									<div className='bg-blue-900 rounded-xl text-center py-2 mt-4'>
										<img className='w-[300px] md:w-[390px] mx-auto mt-4 border-4 border-white border-dashed rounded-lg' src={imageView} />
										<button onClick={() => {setImageView(''); setImageFile('')}} className='mt-2 w-auto mx-auto text-blue-900 px-8 py-3 bg-white rounded-lg'>
											<AiOutlineRedo className='mx-auto text-xl' />
										</button>
									</div>
								)}
								
								<div className='flex justify-between gap-2 mt-4'>
									<button onClick={() => handleSubmit()} 
										className='bg-blue-900 flex justify-center gap-0.5 shadow w-full py-2 text-white rounded-xl disabled:opacity-50' disabled={disableSubmitBtn}>
										<BiRightArrow className='self-center' />
										Submit 
									</button>
									<button onClick={() => {
										setUseCamera(!useCamera);
										setImageView(''); setImageFile('');
										}} 
										className='bg-gray-300 shadow w-full py-2 rounded-xl text-white'>
											{
												useCamera ? (<div className='flex justify-center gap-1 text-gray-800'>
													<FaCloudUploadAlt className='text-xl self-center' />
													<p>Upload Image</p>
												</div>)
												: (<div className='flex justify-center gap-1 text-gray-800'>
													<TbCapture className='text-xl self-center' />
													<p>Use Camera</p>
												</div>)
											}
									</button>
								</div>
							</>
						)
					)
				}

				<p className='text-lg mt-8 py-5 border-gray-300 border-t border-b '>Our AI-powered tool is designed to help you get a deeper understanding of your furry friend's emotions. Using advanced machine learning algorithms, our tool is able to classify and recognize a range of emotions in dogs, including happiness, sadness, relaxed, and anger. With this tool, you'll be able to get a better sense of what your dog is feeling, and respond accordingly to ensure their well-being and happiness. Whether you're a dog owner, trainer, or just love dogs, our emotion recognition tool is the perfect companion to help you better connect with and understand your four-legged friend.</p>
				
				<div className='mt-4 md:flex md:justify-between'>
					<div className='self-center'>
						<h3 className='text-2xl font-bold'>How to classify your dog emotion?</h3>
						<ol className='list-decimal marker:text-blue-900 px-4 mt-2 text-lg'>
							<li className='w-full lg:w-[720px]'>Drag and Drop your image in the dropzone or click it to upload image. Alternatively, you can use your camera to take a picture of your dog.</li>
							<li>Click the submit button to let our AI analyze your image.</li>
							<li>Sit back and relax while waiting for the result.</li>
						</ol>
					</div>

					<AiFillFileImage className='self-center hidden md:block w-32 h-32 text-blue-900' />
				</div>
			</div>

			<footer className='bg-white p-2 text-center border-t-4 border-blue-900 py-6'>
				<GiSittingDog className='bg-gray-200 p-1 rounded-full mx-auto text-4xl text-yellow-800' />
				<h1 className='font-bold text-xl mt-2'>Dog Emotion <span className='text-blue-900'>AI</span></h1>
				
				<p className='text-sm text-gray-600'>Made by <span className='text-blue-900'>Daniel Shan Balico</span> 2023</p>
			</footer>
		</div>
	)
}

export default Main2