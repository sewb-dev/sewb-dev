import {
  FolderArrowDownIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
const FeatureCard = () => {
  return (
    <div className='relative w-full md:max-w-xl'>
      <div className='absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='animation-delay-6000 absolute -bottom-8 right-20 h-72 w-72 animate-blob rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className=' relative space-y-4'>
        <div className='flex items-center gap-3 rounded-lg bg-white p-3 md:p-5 '>
          <QuestionMarkCircleIcon className='h-6 w-6 font-bold text-black' />
          <p className='text-sm text-black md:text-base'>
            Generate dynamic Q and A from text with AI.
          </p>
        </div>
        <div className='flex items-center gap-3 rounded-lg bg-white p-3 md:p-5 '>
          <ScaleIcon className='h-6 w-6 font-bold text-black' />
          <p className='text-sm text-black md:text-base'>
            Get supervised (time and untimed) on the generated Q and A.
          </p>
        </div>
        <div className='flex items-center gap-3 rounded-lg bg-white p-3 md:p-5 '>
          <FolderArrowDownIcon className='h-6 w-6 font-bold text-black' />
          <p className='text-sm text-black md:text-base'>
            Download, share, export and many more...
          </p>
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
  );
};

export default FeatureCard;
