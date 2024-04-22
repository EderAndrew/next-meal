import Link from 'next/link'

const Home = () => {
  return (
    <main>
     <h1>Meals App</h1>
     <p><Link href="/meals">Meals</Link></p>
     <p><Link href="/community">Community</Link></p>
    </main>
  )
}

export default Home