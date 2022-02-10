import { playingTrackState, playState } from '@/atoms/playerAtoms'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import css from './index.module.css'
import SpotifyPlayer from 'react-spotify-web-playback'
export default function Footer({ accessToken, trackUri }) {
	const [play, setPlay] = useRecoilState(playState)
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
	useEffect(() => {
		if (trackUri) {
			setPlay(true)
		}
	}, [trackUri])
	if (!accessToken) return null
	return (
		<div className={css.MAIN_CONTAINER}>
			<SpotifyPlayer
				styles={{
					activeColor: '#fff',
					bgColor: '#181818',
					color: '#fff',
					loaderColor: '#fff',
					sliderColor: '#1cb954',
					trackArtistColor: '#ccc',
					trackNameColor: '#fff',
					height: '70px',
					sliderTrackColor: '#535353',
					sliderTrackBorderRadius: '4px',
					sliderHandleColor: '#fff',
					errorColor: '#fff',
				}}
				token={accessToken}
				showSaveIcon
				callback={(state) => {
					setPlay(state.isPlaying)
				}}
				play={play}
				uris={trackUri ? [trackUri] : []}
				magnifySliderOnHover={true}
				autoPlay={true}
			/>
		</div>
	)
}
