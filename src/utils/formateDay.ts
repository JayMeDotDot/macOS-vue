const weekList = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]

function formatDay() {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekIndex = date.getDay()
  const week = weekList[weekIndex]
  const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  return `${month}月${day}日 ${week} ${hours}:${minutes}`
}

export { formatDay }
