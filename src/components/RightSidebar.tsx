import { BsSearch } from 'react-icons/bs'

export default function RightSidebar() {
    return (
        <section className='sticky top-2 mt-2 flex flex-col space-y-4 h-screen min-w-[275px] w-full max-w-[392px] px-6 overflow-scroll right-section'
        >
            <div className='relative h-full w-full'>
                <input
                    id='searchBox'
                    title='search twitter'
                    type="text"
                    placeholder='Search Twitter'
                    className='w-full h-full rounded-full outline-none border-0 bg-neutral-900/90 py-4 pl-14 pr-4 focus:border focus:border-blue-pry peer text-white'
                />
                <label htmlFor='searchBox' className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-blue-pry'>
                    <BsSearch className='w-5 h-5' />
                </label>
            </div>
            <div className='flex flex-col rounded-xl bg-neutral-900 my-4 text-white'>
                <h3 className='font-bold text-xl my-4 px-4'> What's happening</h3>
                <div>
                    {
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i}
                                className='hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200 cursor-pointer'
                            >
                                <div className='font-bold text-lg'>#Trending {i + 1}</div>
                                <div className='text-xs text-natural-400'>35.4k</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col rounded-xl bg-neutral-900 my-4 text-white'>
                <h3 className='font-bold text-xl my-4 px-4'>Who to follow</h3>
                <div >
                    {
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i}
                                className='hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200 cursor-pointer flex items-center justify-between space-x-2'
                            >
                                <div className='flex space-x-2 items-center'>
                                    <div className='w-10 h-10 bg-neutral-600 rounded-full'></div>
                                    <div className='flex flex-col'>
                                        <p className='font-bold text-base hover:underline'>Other User</p>
                                        <p className='font-normal text-sm text-gray-500'>@otheruser1234</p>
                                    </div>
                                </div>
                                <div>
                                    <button title='follow' type='button' className='rounded-full px-6 py-2 bg-white text-neutral-950 font-semibold hover:opacity-80'>Follow</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
