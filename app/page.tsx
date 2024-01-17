import Board from '@/components/Board'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main>
      <Header />
      <Sidebar/>
      <Board />
    </main>
  )
}
