import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/react'

import Loader from '@/components/Loader'
import css from './index.module.css'

export default function SignIn({ providers }) {
	const { data: session } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session) {
			router.push('/')
		}
	}, [session])

	if (session) return <Loader />

	return (
		<div className={css.MAIN_CONTAINER}>
			<Head>
				<title>Copify | SignIn</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Image
				src='/image/SoundBlast.png'
				alt='logo'
				width={120}
				height={120}
				objectFit='contain'
			/>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button className={css.btn} onClick={() => signIn(provider.id)}>
						Sign In with {provider.name}
					</button>
				</div>
			))}
		</div>
	)
}

export async function getServerSideProps() {
	const providers = await getProviders()
	return {
		props: { providers },
	}
}
