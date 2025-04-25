import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/team-rank/nba')
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', background: '#1E1E1E', display: 'flex' }}>
        </div>
    )
}

export default Index
