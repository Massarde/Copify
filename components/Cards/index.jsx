import css from './index.module.css'
import Image from 'next/image'
import { MdPlayCircleFilled } from 'react-icons/md'
import { MdOutlinePause } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { playState, playingTrackState } from '@/atoms/playerAtoms'
import { useEffect } from 'react'

export default function Card({ track, chooseTrack = { chooseTrack } }) {
	const { artist, albumUrl, title, id } = track
	const [play, setPlay] = useRecoilState(playState)
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

	const handlePlay = (e) => {
		chooseTrack(track)
		if (track.uri === playingTrack.uri) {
			setPlay(!play)
		}
	}
	return (
		<div className={css.MAIN_CONTAINER}>
			<div className={css.container} onClick={handlePlay}>
				<div className={css.play_title_container}>
					<div>
						{track.uri === playingTrack.uri && play ? (
							<MdOutlinePause className={css.play_btn} />
						) : (
							<MdPlayCircleFilled className={css.play_btn} />
						)}
					</div>
					<div className={css.artist_title_container}>
						<p className={css.artist}>{artist.slice(0, 15)}...</p>
						<p className={css.artist}>{title}</p>
					</div>
					<div className={css.bg_blur}></div>
				</div>

				<Image
					alt='bg'
					src={albumUrl}
					layout='fill'
					priority={true}
					loading={'eager'}
					className={css.background_image}
				/>
			</div>
		</div>
	)
}
