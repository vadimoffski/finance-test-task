export const isTrend = (prev, next) => {
  const prevValue = parseFloat(prev)
  if (!prevValue || !prev) return
  const nextValue = Number(next)
  if (nextValue >= prevValue) {
    return true
  }
  return false
}

export const timeHandler = (timeStamp) => new Date(timeStamp).toLocaleTimeString()
