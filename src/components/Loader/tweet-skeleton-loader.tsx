
import { BsDot } from 'react-icons/bs'

export default function TweetSkeletonLoader() {
    return (
        <div className='border-b-[0.5px] border-gray-600 flex space-x-4 p-4'>
            <div>
                <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse' />
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex items-center justify-between space-x-1'>
                    <div className='flex items-center space-x-1'>
                        <div className='font-bold bg-gray-300 h-4 w-20 animate-pulse' />
                        <div className='text-gray-500 font-normal bg-gray-300 h-4 w-16 animate-pulse' />
                        <div className='text-gray-500 mt-1'>
                            <BsDot />
                        </div>
                        <div className='text-gray-500 bg-gray-300 h-4 w-16 animate-pulse' />
                    </div>
                    <div className='rounded-full p-2 bg-gray-300 h-8 w-8 hover:bg-white/20 cursor-pointer' />
                </div>
                <div className='text-white text-base mt-1 bg-gray-300 h-4 w-full animate-pulse' />
                <div className='bg-slate-400 rounded-2xl aspect-square h-96 w-full mt-2 animate-pulse' />
                <div className='flex justify-between w-full mt-4'>
                    <div className='p-2 rounded-full bg-gray-300 h-8 w-8 hover:bg-white/10 cursor-pointer transition duration-200 animate-pulse' />
                    <div className='p-2 rounded-full bg-gray-300 h-8 w-8 hover:bg-white/10 cursor-pointer transition duration-200 animate-pulse' />
                    <div className='p-2 rounded-full bg-gray-300 h-8 w-8 hover:bg-white/10 cursor-pointer transition duration-200 animate-pulse' />
                    <div className='p-2 rounded-full bg-gray-300 h-8 w-8 hover:bg-white/10 cursor-pointer transition duration-200 animate-pulse' />
                    <div className='p-2 rounded-full bg-gray-300 h-8 w-8 hover:bg-white/10 cursor-pointer transition duration-200 animate-pulse' />
                </div>
            </div>
        </div>

    )
}
