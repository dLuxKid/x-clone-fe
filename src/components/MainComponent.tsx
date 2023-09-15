// icons 
import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { IoShareOutline, IoStatsChart } from 'react-icons/io5'
import ComposeTweet from './serverComponents/ComposeTweet'

export default function MainComponent() {
    return (
        <main className='min-h-screen w-full max-w-2xl flex flex-col border-x-[0.5px] border-gray-500 text-white mx-auto'>
            <h1 className='text-xl font-bold p-4 sticky backdrop-blur top-0 bg-black/10'>Home</h1>
            <div className='border-y-[0.5px] px-4 border-gray-600 flex items-start space-x-2 min-h-32 relative py-4'>
                <div className='w-10 h-10 bg-slate-400 rounded-full flex-none'></div>
                <ComposeTweet />
            </div>
            <div className='flex flex-col'>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}
                            className='border-b-[0.5px] border-gray-600 flex space-x-4 p-4'
                        >
                            <div>
                                <div className='w-10 h-10 bg-slate-200 rounded-full' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='flex items-center justify-between space-x-1'>
                                    <div className='flex items-center space-x-1'>
                                        <div className='font-bold'>Club of Coders</div>
                                        <div className='text-gray-500'>@dLuxKidOnYt</div>
                                        <div className='text-gray-500'>
                                            <BsDot />
                                        </div>
                                        <div className='text-gray-500'>1 hour ago</div>
                                    </div>
                                    <div className='rounded-full p-2 hover:bg-white/20 cursor-pointer'>
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className='text-white text-base mt-1'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tempore voluptate aspernatur repudiandae ipsam mollitia natus quasi voluptas exercitationem assumenda animi doloribus at debitis accusantium, perspiciatis adipisci sint, necessitatibus consectetur?
                                </div>
                                <div className='bg-slate-400 rounded-2xl aspect-square h-96 w-full mt-2'></div>
                                <div className='flex justify-between w-full mt-4'>
                                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                                        <BsChat />
                                    </div>
                                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                                        <AiOutlineRetweet />
                                    </div>
                                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                                        <AiOutlineHeart />
                                    </div>
                                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                                        <IoStatsChart />
                                    </div>
                                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                                        <IoShareOutline />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}
