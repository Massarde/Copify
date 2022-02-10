import css from './index.module.css'
import { MdOutlineSecurity } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { IoMdNotifications } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { ImExit } from 'react-icons/im'
import { RecentPlayed } from '..'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
export default function RightBar({ chooseTrack, spotifyApi }) {
	const { data: session } = useSession()
	const [isHover, setIsHover] = useState(false)
	return (
		<div className={css.MAIN_CONTAINER}>
			<div className={css.BTNs_CONTAINER}>
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
			<div>
				<RecentPlayed spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
			</div>
		</div>
	)
}
