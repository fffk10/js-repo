import Image from 'next/image'
import styles from './page.module.css'
import Calulator from '@/app/calc/calulator'

export default function Home() {
  return (
    <div>
      <h2>calclator</h2>

      <Calulator />
    </div>
  )
}
