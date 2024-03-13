'use client'

import Button from '@/app/calc/button'
import { clear } from 'console'
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

    // 初期値ではないか、式配列の最後の要素がオペレータの場合は表示する数値を最新化する
    if (expressions.current.length == 0) {
      setDisp(num)
      expressions.current.push(num.toString())
    } else if (
      operator.includes(expressions.current[expressions.current.length - 1])
    ) {
      setDisp(num)
      expressions.current.push(n)
    } else {
      let str = disp.toString()
      str += num.toString()
      setDisp(parseInt(str))
      expressions.current[expressions.current.length - 1] = str
    }
  }

  const pushOperator = (o: string) => {
    const lastIndex = expressions.current.length - 1
    const lastElem = expressions.current[lastIndex]
    if (operator.includes(lastElem)) {
      // オペレーターを連続してプッシュした場合は置き換え
      expressions.current[expressions.current.length - 1] = o
    } else {
      expressions.current.push(o)
    }
  }

  const calc = () => {
    debugger
    let result = 0
    let opeStore = ''
    expressions.current.map((elem) => {
      if (operator.includes(elem)) {
        opeStore = elem
        return
      }

      switch (opeStore) {
        case '+':
          result = result + parseInt(elem)
          break
        case '-':
          result = result - parseInt(elem)
          break
        case '*':
          result = result * parseInt(elem)
          break
        case '÷':
          result = result / parseInt(elem)
          break
        default:
          result = parseInt(elem)
      }
    })

    setDisp(result)
    expressions.current = [result.toString()]
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
        <Button text='=' onClick={calc} />
      </div>
    </div>
  )
}
