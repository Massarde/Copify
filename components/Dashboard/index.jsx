import css from './index.module.css'
import { SideBar, Body, RightBar } from '@/components/index'
import { playingTrackState } from '@/atoms/playerAtoms'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import Footer from '../Footer'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
})
export default function Dashboard() {
	const { data: session } = useSession()
	const accessToken = session?.accessToken
	const [showPlayer, setShowPlayer] = useState(false)

	useEffect(() => {
		setShowPlayer(true)
	}, [])

	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
	const chooseTrack = (track) => {
		setPlayingTrack(track)
	}

	return (
		<main className={css.MAIN_CONTAINER}>
			<SideBar />
			<Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
			<RightBar spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
			<Footer accessToken={accessToken} trackUri={playingTrack.uri} />
		</main>
	)
}
