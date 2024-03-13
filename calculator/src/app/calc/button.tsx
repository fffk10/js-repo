import styles from '@/app/styles/calculator.module.css'

type Props = {
  text?: string
  onClick?: () => void
}

export default function Button({ text, onClick }: Props) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  )
}
