type Dates = {
  day: number
  month: number
  year: number
  hours: number
  minutes: number
  monthName: string
}

const monthList = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
]

export const formattingDate = (date: string = ""): Dates => {
  const dateInstance = new Date(date)

  const day = dateInstance.getDate()
  const month = dateInstance.getMonth()
  const year = dateInstance.getFullYear()
  const hours = dateInstance.getHours()
  const minutes = dateInstance.getMinutes()

  return {
    day,
    month,
    year,
    hours,
    minutes,
    monthName: monthList[month],
  }
}
