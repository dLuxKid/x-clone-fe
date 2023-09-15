// next imports
import Link from 'next/link'
// icons
import { BiHomeCircle, BiUser } from 'react-icons/bi'
import { BsBell, BsBookmark, BsEnvelope, BsTwitter, BsThreeDots } from 'react-icons/bs'
import { HiOutlineHashtag } from 'react-icons/hi'



const navigation_items = [
    {
        icon: BsTwitter
    },
    {
        title: 'Home',
        icon: BiHomeCircle
    },
    {
        title: 'Explore',
        icon: HiOutlineHashtag
    },
    {
        title: 'Notifications',
        icon: BsBell
    },
    {
        title: 'Messages',
        icon: BsEnvelope
    },
    {
        title: 'Bookmarks',
        icon: BsBookmark
    },
    {
        title: 'Profile',
        icon: BiUser
    },
]

export default function LeftSidebar() {
    return (
        <header className="sticky top-0 h-screen min-w-[275px] w-full max-w-xs hidden lg:flex flex-col items-center justify-between text-white px-8">
            <div className='w-full flex flex-col items-stretch h-full my-4 space-y-4 max-w-[275px]'>
                {navigation_items.map((item, i) => (
                    <Link href={`/${item?.title?.toLowerCase()}`} key={i} className='hover:bg-white/10 transition duration-200 rounded-3xl py-2 px-4 flex items-center justify-start w-fit space-x-2 text-xl'>
                        <span><item.icon /></span>
                        {item.title && <p>{item.title}</p>}
                    </Link>
                ))}
                <button title='tweet' type='button' className='bg-blue-pry my-4 rounded-full p-4 text-xl max-w-[275px] font-semibold text-center hover:bg-opacity-80 transition duration-200'>Tweet</button>
            </div>
            <button title='profile' className='my-4 w-full max-w-[275px] hover:bg-white/20 bg-transparent rounded-full py-2 px-4 transition duration-200 flex items-center justify-between space-x-2'>
                <div className='flex items-center space-x-2'>
                    <div className='rounded-full h-12 w-12 bg-slate-400'></div>
                    <div className='text-left'>
                        <p className='font-semibold text-sm'>dLuxKid</p>
                        <p className='text-xs font-normal'>@Marvellous</p>
                    </div>
                </div>
                <div>
                    <BsThreeDots />
                </div>
            </button>
        </header>
    )
}
