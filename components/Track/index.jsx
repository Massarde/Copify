import { playingTrackState, playState } from '@/atoms/playerAtoms'
import Image from 'next/image'
import { useState } from 'react'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { ImPlay3 } from 'react-icons/im'
import { MdOutlinePause } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import css from './index.module.css'
import { DeviceSize } from '../../data/data.js'
import { useMediaQuery } from 'react-responsive'
export default function Track({ track, chooseTrack }) {
	const [play, setPlay] = useRecoilState(playState)
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
	const [fav, setFav] = useState(false)
	const handlePlay = (e) => {
		chooseTrack(track)
		if (track.uri === playingTrack.uri) {
			setPlay(!play)
		}
	}
	const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
	return (
		<div className={css.MAIN_CONTAINER}>
			<div className={css.track_container}>
				<div className={css.img_container}>
					<Image
						alt='bg'
						src={track.albumUrl}
						layout='fixed'
						width={100}
						height={100}
					/>
				</div>
				<div className={css.description}>
					{isMobile ? (
						<h4>{track.title.slice(0, 20)}...</h4>
					) : (
						<h4>{track.title}</h4>
					)}
					<p>{track.artist}</p>
				</div>
			</div>
			<div className={css.icons_container}>
				{track.uri === playingTrack.uri && play ? (
					<FaHeadphonesAlt className={css.play_btn} />
				) : (
					<FaHeadphonesAlt className={css.play_btn_dark} />
				)}
				<div className={css.circle_icons}>
					<div className={css.heart_container} onClick={() => setFav(!fav)}>
						<FaHeart
							className={
								!fav
									? css.icon_heart
									: `${css.icon_heart_selected} ${css.icon_heart}`
							}
						/>
					</div>
					<div className={css.player_container} onClick={handlePlay}>
						{track.uri === playingTrack.uri && play ? (
							<MdOutlinePause className={css.icon_pause} />
						) : (
							<ImPlay3 className={css.icon_play} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
