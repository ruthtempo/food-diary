import React, { useState } from "react"
import { Button, Table, OverlayTrigger, Popover } from 'react-bootstrap'
import { differenceInCalendarDays, endOfMonth, endOfWeek, getWeeksInMonth, isSameDay, isSameMonth, isToday } from "date-fns";
import { add, startOfMonth, sub, getDate, startOfWeek } from "date-fns/esm";
import format from "date-fns/format";
import { Answer } from './App'
import { DayLogs } from "./DayLogs";


interface CalendarRecord {
  day: Date,
  checked: boolean,
  isCurrentDate: boolean,
  isCurrentMonth: boolean
}

function isThereLog(date: Date, input: Answer[]): boolean {
  for (let i = 0; i < input.length; i++) {
    if (isSameDay(date, input[i].date)) {
      return true
    }
  }
  return false
}

function getDaysArray(selectedMonth: Date, answerInput: Answer[]): CalendarRecord[] {
  const start = startOfMonth(selectedMonth)
  const begginingOfWeek = startOfWeek(start, { weekStartsOn: 1 })

  const end = endOfMonth(selectedMonth)
  const endOfTheWeek = endOfWeek(end, { weekStartsOn: 1 })

  const daysCount = differenceInCalendarDays(endOfTheWeek, begginingOfWeek)
  const daysInMonth: CalendarRecord[] = []

  for (let i = 0; i <= daysCount; i++) {
    const currentDate = add(begginingOfWeek, { days: i })

    daysInMonth.push({
      day: currentDate,
      checked: isThereLog(currentDate, answerInput),
      isCurrentDate: isToday(currentDate),
      isCurrentMonth: isSameMonth(currentDate, selectedMonth)
    })
  }
  return daysInMonth
}

function getWeeks(days: (CalendarRecord)[], currentDate: Date): (CalendarRecord)[][] {
  const numberOfWeeks = getWeeksInMonth(currentDate, { weekStartsOn: 1 })
  const month: (CalendarRecord)[][] = []
  let counter = 0
  //weeks
  for (let j = 1; j <= numberOfWeeks; j++) {
    const week = [] //array will be created 5 times, and will iterate the subloop 7 times every time (5 columns of 7 days each)

    //days
    for (let i = 0; i <= 6; i++) {
      week.push(days[counter])
      counter++
    };
    month.push(week)// x nº of arrays of numbers in total
  }
  return month
}


const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Check with the Calendar</Popover.Header>
    <Popover.Body>
      By clicking on a <strong>highlighted
        day</strong> you can check all your logs!
    </Popover.Body>
  </Popover>
);


export const Calendar = (p: {
  answers: Answer[];
}) => {

  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const [toggleStyle, setToggleStyle] = useState(false)

  const [currentDate, setCurrentDate] = useState(new Date())
  const daysInMonth = getDaysArray(currentDate, p.answers)
  const rows = getWeeks(daysInMonth, currentDate)

  const [selectedDay, setSelectedDay] = useState<Date>()
  function nextMonth() {
    setToggleStyle(!toggleStyle)
    setCurrentDate(add(currentDate, { months: 1 }))
  }

  function prevMonth() {
    setToggleStyle(!toggleStyle)
    setCurrentDate(sub(currentDate, { months: 1 }))
  }
  return (
    <>
      {selectedDay ? (<DayLogs answers={p.answers} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success" className="mb-3 mt-3">Need a Hint? </Button>
          </OverlayTrigger>
          <Table style={{ backgroundColor: "white", maxWidth: 400 }} className="border rounded">
            <thead>
              <tr>
                <th colSpan={7}>
                  <div className="d-flex justify-content-between align-items-center fs-4">
                    <Button variant="primary" className="text-white" onClick={prevMonth}>prev</Button>
                    {format(currentDate, 'MMMM yyyy')}
                    <Button variant="primary" className="text-white" onClick={nextMonth} >next</Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekdays.map(weekday => (
                  <td className="px-0 text-center" key={weekday}><small>{weekday}</small></td>
                ))}
              </tr>
              {rows.map(row => (
                <tr key={row[0].day.toISOString()} >
                  {row.map(day => (
                    <td
                      key={day.day.toISOString()}
                      role={day.checked ? "button" : undefined}
                      className={`px-0 text-center ${day.checked ? "bg-info text-white" : " "} ${day.isCurrentDate ? "today" : ""} ${!day.isCurrentMonth ? "notCurrent" : ""}`}
                      onClick={() => { day.checked && setSelectedDay(day.day) }}
                    >
                      {getDate(day.day)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
      }

    </>
  )
}