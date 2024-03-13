// tableにはsとgはもたせず、startとgoalに位置情報をもたせる
const start = [0, 1]
const goal = [3, 3]
const table = [
  ['0', '0', '0', '1'],
  ['0', '0', '1', '0'],
  ['0', '1', '1', '0'],
  ['0', '0', '1', '0'],
  ['1', '0', '0', '0'],
]

const bfs = (start, goal, table) => {
  const dx = [0, 0, 1, -1]
  const dy = [1, -1, 0, 0]

  let distance = -1 // 未到達:-1
  // スタート地点からの距離を保存する配列
  const distancearr = deepcopy(
    new Array(table.length).fill(new Array(table[0].length).fill(-1))
  )
  distancearr[start[0]][start[1]] = 0

  // 探索済みマスを管理する配列
  const visitedarr = deepcopy(
    new Array(table.length).fill(new Array(table[0].length).fill(false))
  )
  visitedarr[start[0]][start[1]] = true

  const queue = [start]
  while (queue.length > 0) {
    const q = dequeue(queue)
    const x = q[0]
    const y = q[1]

    // ゴールに到達
    if (x === goal[0] && y === goal[1]) {
      distance = distancearr[x][y]
      break
    }

    // 上下左右を探索
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]

      // テーブルの範囲内かつ道かつ未探索の場合
      if (
        0 <= nx &&
        nx < table.length &&
        0 <= ny &&
        ny < table[0].length &&
        table[nx][ny] === '0' &&
        !visitedarr[nx][ny]
      ) {
        queue.push([nx, ny])
        visitedarr[nx][ny] = true
        distancearr[nx][ny] = distancearr[x][y] + 1
      }
    }
  }

  console.log(`========visited========`)
  console.log('%o', visitedarr)

  console.log(`========distance========`)
  console.log('%o', distancearr)

  return distance
}

const dequeue = (queue) => {
  return queue.shift()
}

const deepcopy = (object) => {
  return JSON.parse(JSON.stringify(object))
}

console.log(bfs(start, goal, table))
