import Head from 'next/head'
import { Dashboard } from '@/components'
import css from '@/styles/main.module.css'
import { useRouter } from 'next/router'

import { getProviders, signIn, useSession } from 'next-auth/react'
import Loader from '@/components/Loader'

export default function Home() {
	const router = useRouter()
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/auth/signin')
		},
	})
	if (status === 'loading') return <Loader />
	return (
		<div className=''>
			<Head>
				<title>Copify App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Dashboard />
		</div>
	)
}
