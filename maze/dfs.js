const INF = 1000000000
const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]
const W = 4
const H = 4
const WALL = 1
const map = [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
]

function dfs(sx, sy, gx, gy) {
  const dist = Array(H)
    .fill()
    .map(() => Array(W).fill(INF))

  dist[sy][sx] = 0

  const stack = [{ x: sx, y: sy }]

  while (stack.length > 0) {
    const cur = stack.pop()

    if (cur.x === gx && cur.y === gy) break

    for (let i = 0; i < 4; i++) {
      const tx = cur.x + dx[i]
      const ty = cur.y + dy[i]

      if (tx < 0 || tx >= W || ty < 0 || ty >= H) continue
      if (map[ty][tx] === WALL) continue
      if (dist[ty][tx] !== INF) continue

      dist[ty][tx] = dist[cur.y][cur.x] + 1
      stack.push({ x: tx, y: ty })
    }
  }

  return dist[gy][gx]
}

console.log(dfs(1, 0, 1, 3)) // 4
console.log(dfs(1, 0, 3, 0)) // 10
