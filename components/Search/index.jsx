import css from './index.module.css'
import { BsFilterRight } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { ImExit } from 'react-icons/im'
import { MdOutlineSecurity } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { IoMdNotifications } from 'react-icons/io'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
export default function Search({ search, setSearch }) {
	const { data: session } = useSession()
	const [isHover, setIsHover] = useState(false)
	return (
		<div className={css.MASTER_CONTAINER}>
			<div className={css.user_container}>
				<div className={css.settings}>
					<div className={css.icons}>
						<MdOutlineSecurity />
					</div>
					<div className={css.icons}>
						<IoMdSettings />
					</div>
					<div className={css.icons}>
						<IoMdNotifications />
					</div>
				</div>
				<div
					className={css.user}
					onClick={() => signOut({ redirect: false })}
					onMouseEnter={() => setIsHover(!isHover)}
					onMouseLeave={() => setIsHover(!isHover)}
				>
					<div className={css.arrow_icon}>
						<IoIosArrowDown />
					</div>
					{!isHover ? (
						<div className={css.user_image}>
							<Image
								src={session.user.image}
								alt='user image'
								width={40}
								height={40}
								layout='responsive'
							/>
						</div>
					) : (
						<div className={css.exit_icon}>
							<ImExit />
						</div>
					)}
				</div>
			</div>
			<div className={css.MAIN_CONTAINER}>
				<div className={css.search_circle} />
				<input
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search...'
					className={css.input_class}
				/>
				<div className={css.TAGS_CONTAINER}>
					<div className={css.tags}>
						<button className={css.tag_btn}>Minimal</button>
						<button className={css.tag_btn}>House</button>
						<button className={css.tag_btn}>HipHop</button>
					</div>
				</div>
				<div className={css.filter_container}>
					<i className={css.icon}>
						<BsFilterRight />
					</i>
					<p>Filter</p>
				</div>
			</div>
		</div>
	)
}
