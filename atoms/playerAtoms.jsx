import { atom } from 'recoil'

export const playState = atom({
	key: 'playState', // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
})

export const playingTrackState = atom({
	key: 'playingTrackState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
})
