import css from './index.module.css'
import { IoIosApps } from 'react-icons/io'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playState, playingTrackState } from '@/atoms/playerAtoms'
import Image from 'next/image'
export default function RecentPlayed({ chooseTrack, spotifyApi }) {
	const { data: session } = useSession()
	const accessToken = session?.accessToken
	const [recentlyPlayed, setRecentlyPlayed] = useState([])
	const [newReleases, setNewReleases] = useState([])

	const [play, setPlay] = useRecoilState(playState)
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

	useEffect(() => {
		if (!accessToken) return

		spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
			setRecentlyPlayed(
				res.body.items.map(({ track }) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
					}
				})
			)
		})
	}, [accessToken])
	useEffect(() => {
		if (!accessToken) return
		spotifyApi.getNewReleases().then((res) => {
			setNewReleases(
				res.body.albums.items.map((track) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.images[0].url,
						pop: track.popularity,
					}
				})
			)
		})
	}, [accessToken])
	const handlePlay = (nr_track) => {
		chooseTrack(nr_track)
		if (nr_track.uri === playingTrack.uri) {
			setPlay(!play)
		}
	}
	return (
		<div className={css.MAIN_CONTAINER}>
			<div className={css.head_section}>
				<p className={css.rp_text}>Recently Played</p>
				<div className={css.rp_icon}>
					<IoIosApps />
				</div>
			</div>
			<div className={css.mid_section}>
				{recentlyPlayed.length === 0 ? (
					<div className={css.recentlyPlayed_container}>
						<p>
							Only Premium users can access Recently Played <span>!</span>
						</p>
						{newReleases.map((nr_track) => (
							<div
								key={nr_track.id}
								className={css.track_container}
								onClick={() => handlePlay(nr_track)}
							>
								<div className={css.img_container}>
									<Image
										alt='bg'
										src={nr_track.albumUrl}
										layout='fixed'
										width={50}
										height={50}
									/>
								</div>
								<div className={css.description_container}>
									<h4>{nr_track.title.slice(0, 20)}...</h4>
									<p>{nr_track.artist}</p>
								</div>
								<div className={css.play_container}>
									{nr_track.uri === playingTrack.uri && play ? (
										<FaHeadphonesAlt className={css.play_btn} />
									) : (
										<FaHeadphonesAlt className={css.play_btn_dark} />
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className={css.recentlyPlayed_container}>
						<div className={css.remove_space}></div>
						{recentlyPlayed.map((nr_track, index) => (
							<div
								key={index}
								className={css.track_container}
								onClick={() => handlePlay(nr_track)}
							>
								<div className={css.img_container}>
									<Image
										alt='bg'
										src={nr_track.albumUrl}
										layout='fixed'
										width={50}
										height={50}
									/>
								</div>
								<div className={css.description_container}>
									<h4>{nr_track.title.slice(0, 20)}...</h4>
									<p>{nr_track.artist}</p>
								</div>
								<div className={css.play_container}>
									{nr_track.uri === playingTrack.uri && play ? (
										<FaHeadphonesAlt className={css.play_btn} />
									) : (
										<FaHeadphonesAlt className={css.play_btn_dark} />
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className={css.footer_section}>
				<button className={css.btn}>View All</button>
			</div>
		</div>
	)
}
