import css from './index.module.css'
import {
	ChartBarIcon,
	ClockIcon,
	DotsHorizontalIcon,
	HomeIcon,
} from '@heroicons/react/solid'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiCompassFill } from 'react-icons/ri'
import Image from 'next/image'
export default function SideBar() {
	return (
		<section className={css.mainContainer}>
			<div className={css.logo}>
				<Image
					src='/image/copify.png'
					alt='logo'
					width={100}
					height={100}
					objectFit='contain'
				/>
			</div>
			<div className='flex flex-col space-y-8  items-center'>
				<HomeIcon className={css.homeIcon} />
				<div>
					<RiCompassFill className={css.icons} />
				</div>
				<FaMicrophoneAlt className={css.icons} />
				<ChartBarIcon className={css.icons} />
				<ClockIcon className={css.icons} />
				<DotsHorizontalIcon className={css.icons} />
			</div>
		</section>
	)
}
