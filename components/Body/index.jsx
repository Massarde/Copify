import { Cards, Search, Track } from '@/components'
import { useState } from 'react'
import css from './index.module.css'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
export default function Body({ spotifyApi, chooseTrack }) {
	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [newReleases, setNewReleases] = useState([])
	const { data: session } = useSession()
	const accessToken = session?.accessToken

	//==USE_EFFECT==>
	//spotifyApi
	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])
	//search...
	useEffect(() => {
		if (!accessToken) return
		if (!search) return setSearchResults([])
		spotifyApi.searchTracks(search).then((res) => {
			setSearchResults(
				res.body.tracks.items.map((track) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
						pop: track.popularity,
					}
				})
			)
		})
	}, [search, accessToken])

	//new releases...
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
	}, [search, accessToken])
	return (
		<section className={css.MAIN_CONTAINER}>
			<Search search={search} setSearch={setSearch} />
			{searchResults.length === 0 ? (
				<div className={css.cards_container}>
					{newReleases
						.map((track) => (
							<div key={track.id}>
								<Cards track={track} chooseTrack={chooseTrack} />
							</div>
						))
						.slice(0, 4)}
				</div>
			) : (
				<div className={css.cards_container}>
					{searchResults
						.map((track) => (
							<div key={track.id}>
								<Cards track={track} chooseTrack={chooseTrack} />
							</div>
						))
						.slice(0, 4)}
				</div>
			)}
			<div className={css.Genres_Release_Container}>
				<div className={css.genres}>
					<h3>Genres</h3>
					<ul className={css.genres_btn_container}>
						<li>Classic</li>
						<li>House</li>
						<li>Minimal</li>
						<li>Hip-hop</li>
						<li>Electronic</li>
						<li>Funk</li>
						<li>Blues</li>
						<li>Country</li>
						<li>Techno</li>
					</ul>
					<button>All Genres</button>
				</div>
				<div className={css.new_release_container}>
					<h3>{searchResults.length === 0 ? 'New Release' : 'Tracks'}</h3>
					<div className={css.new_release}>
						{searchResults.length === 0 ? (
							<div>
								{newReleases.map((track) => (
									<div key={track.id}>
										<Track track={track} chooseTrack={chooseTrack} />
									</div>
								))}
							</div>
						) : (
							<div>
								{searchResults.map((track) => (
									<div key={track.id}>
										<Track track={track} chooseTrack={chooseTrack} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={css.footer_space}></div>
		</section>
	)
}
