import React from 'react'
import { FolderArrowDownIcon,QuestionMarkCircleIcon, ScaleIcon } from "@heroicons/react/24/outline";
const FeatureCard = () => {
  return (
    <div className="relative w-full md:max-w-xl">
    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
    <div className=" relative space-y-4">
      <div className="p-3 md:p-5 bg-white rounded-lg flex items-center gap-3 ">
        <QuestionMarkCircleIcon className='h-6 w-6 text-black font-bold'/>
        <p className='text-black text-sm md:text-base'>Generate dynamic Q and A from text with AI.</p>
      </div>
      <div className="p-3 md:p-5 bg-white rounded-lg flex items-center gap-3 ">
        <ScaleIcon className='h-6 w-6 text-black font-bold'/>
        <p className='text-black text-sm md:text-base'>Get supervised (time and untimed) on the generated Q and A.</p>
      </div>
      <div className="p-3 md:p-5 bg-white rounded-lg flex items-center gap-3 ">
        <FolderArrowDownIcon className='h-6 w-6 text-black font-bold'/>
        <p className='text-black text-sm md:text-base'>Download, share, export and many more...</p>
      </div>
      {/* <div className="p-3 md:p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
        <div className="flex-1">
          <div className="h-4 w-56 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="w-20 h-6 rounded-lg bg-yellow-300"></div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
        <div className="flex-1">
          <div className="h-4 w-44 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="w-28 h-6 rounded-lg bg-pink-300"></div>
        </div>
      </div> */}
    </div>
  </div>
  )
}

export default FeatureCard