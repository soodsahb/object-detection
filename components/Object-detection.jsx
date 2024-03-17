"use client"

import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import {load as cocoSSDLoad} from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'
import { renderPredictions } from '@/utils/RenderPredictions'

const Detector = () => {
    const webcamref=useRef(null);
    const[isloading,setIsLoading] =useState(true);
    let detectInterval;
    const canvasRef=useRef(null);

 const showMyvideo=()=>{
    if(webcamref.current!==null&&webcamref.current.video?.readyState===4){
        const videoWidth=webcamref.current.video.videoWidth;
        const videoHeight=webcamref.current.video.videoHeight;

        webcamref.current.video.width=videoWidth;
        webcamref.current.video.height=videoHeight;
    }
 }

 const runCoco=async ()=>{
  setIsLoading(true);
    const net =await cocoSSDLoad();
    setIsLoading(false);

    detectInterval=setInterval(()=>{
       runObjectDetection(net);
    },10)
 }

 async function runObjectDetection(net){

    if(canvasRef.current&&webcamref.current!==null&&webcamref.current.video?.readyState===4){
        canvasRef.current.width=webcamref.current.video.videoWidth
        canvasRef.current.height= webcamref.current.video.videoHeight;

        const detectedObjects=await net.detect(webcamref.current.video,undefined,0.8);

        const context=canvasRef.current.getContext("2d");

        renderPredictions(detectedObjects,context)
    }
 }

 useEffect(()=>{
    showMyvideo();
    runCoco();
 },[])

  return (<div className='mt-8'>
     {isloading?<div className='gradient-title'>Loading model...</div>:<div className='text-white mt-8 relative flex justify-center items-center gradient p-1.5 rounded-md'>

<Webcam className='lg:h-[720px] rounded-md w-full' muted ref={webcamref}></Webcam>
 <canvas ref={canvasRef} className='absolute top-0 left-0  z-99 w-full lg:h-[720px]'></canvas>

</div>}
  </div>
   
  )
}

export default Detector