import React from "react"
import { isSameDay, format } from "date-fns"
import { Button, Container, ListGroup } from "react-bootstrap"
import { Answer } from "./App"


function seeDayLogs(selectedDay: Date, foodOrSymptom: Answer[]) {

  const dayLogs: Answer[] = foodOrSymptom.filter(input =>
    isSameDay(input.date, selectedDay)
  )

  return dayLogs
}

export const DayLogs = (p: {
  answers: Answer[],
  selectedDay: Date,
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | undefined>>
}) => {

  const dayLogs = seeDayLogs(p.selectedDay, p.answers);

  return (
    <Container className="d-flex flex-column justify-content-center ">
      <h4>Your Logs on {format(p.selectedDay, "ccc, MMM d, y")}</h4>
      <ListGroup as="ol" numbered>
        {dayLogs.map((input, index) => (
          <ListGroup.Item
            key={index}
            as="li"
            className="d-flex justify-content-between align-items-start bg-secondary text-white mb-2"
          >
            <div className=" ps-2 me-auto">
              <div className="fw-bold">{format(input.date, "H:mm:ss a")}</div>
              <p> Registered: {input.type}</p>
              {input.type === "food" ?
                <div>
                  type: {input.meal}
                  foods included: {input.included}
                  food list: {input.foodList}
                  time:{input.selectedTime}
                  taste:{input.taste}
                  quality:{input.quality}
                  quantity:{input.quantity}
                  overall Exp: {input.overallExp}
                </div> :
                <div>
                  type:{input.physical}
                  physical:{input.physical}
                  mood: {input.mood}
                  comments: {input.comments}
                </div>
              }
            </div>
          </ListGroup.Item>

        ))}
      </ListGroup>
    </Container >

  )
}