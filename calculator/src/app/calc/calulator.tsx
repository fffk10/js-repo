'use client'

import Button from '@/app/calc/button'
import { useRef, useState } from 'react'

const operator = ['+', '-', '*', '÷']

export default function Calulator() {
  const [disp, setDisp] = useState(0)
  const expressions = useRef<string[]>([])

  const clear = () => {
    setDisp(0)
    expressions.current = []
  }

  const pushNum = (n: string) => {
    console.log(`pushNum=${n}`)
    const num = parseInt(n)
    if (
      disp == 0 ||
      (expressions.current.length > 0 &&
        operator.includes(expressions.current[expressions.current.length - 1]))
    ) {
      setDisp(num)
    } else {
      let str = disp.toString()
      str += num.toString()
      setDisp(parseInt(str))
    }
  }

  const pushOperator = (o: string) => {
    const lastIndex = expressions.current.length - 1
    const lastElem = expressions.current[lastIndex]
    if (operator.includes(lastElem)) {
      // オペレーターを連続してプッシュした場合は置き換え
      expressions.current[expressions.current.length - 1] = o
    } else {
      expressions.current.push(disp.toString())
      expressions.current.push(o)
    }

    console.log('%o', expressions)
  }

  const calc = () => {
    const result = 0
  }

  return (
    <div>
      <p>{disp}</p>

      <div style={{ display: 'flex' }}>
        <Button text='C' onClick={clear} />
        <Button text='' />
        <Button text='' />
        <Button text='÷' onClick={() => pushOperator('÷')} />
      </div>
      <div style={{ display: 'flex' }}>
        <Button text='7' onClick={() => pushNum('7')} />
        <Button text='8' onClick={() => pushNum('8')} />
        <Button text='9' onClick={() => pushNum('9')} />
        <Button text='*' onClick={() => pushOperator('*')} />
      </div>
      <div style={{ display: 'flex' }}>
        <Button text='4' onClick={() => pushNum('4')} />
        <Button text='5' onClick={() => pushNum('5')} />
        <Button text='6' onClick={() => pushNum('6')} />
        <Button text='-' onClick={() => pushOperator('-')} />
      </div>
      <div style={{ display: 'flex' }}>
        <Button text='1' onClick={() => pushNum('1')} />
        <Button text='2' onClick={() => pushNum('2')} />
        <Button text='3' onClick={() => pushNum('3')} />
        <Button text='+' onClick={() => pushOperator('+')} />
      </div>
      <div style={{ display: 'flex' }}>
        <Button text='0' onClick={() => pushNum('0')} />
        <Button text='0' onClick={() => pushNum('0')} />
        <Button text='.' />
        <Button text='=' />
      </div>
    </div>
  )
}
