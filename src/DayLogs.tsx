import React from "react"
import { isSameDay, format } from "date-fns"
import { Button, Container, ListGroup } from "react-bootstrap"
import { Answer, Food } from "./App"
import { includedFoods } from "./FoodForm"



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
  function restoreSelection() {
    p.setSelectedDay(undefined)
  }

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
              {input.type === "food" ? (
                <FoodInput answer={input} />
              ) : (
                <div>
                  type:{input.physical}
                  physical:{input.physical}
                  mood: {input.mood}
                  comments: {input.comments}
                </div>
              )}
            </div>
          </ListGroup.Item>

        ))}
      </ListGroup>
      <Button onClick={restoreSelection} className="text-white">Back to Calendar</Button>
    </Container >

  )
}

const FoodInput = (p: {
  answer: Food
}) => {
  const selectedFoods = includedFoods.filter(food => p.answer.included.includes(food.value)).map(f => f.label)
  return (
    <div>
      type: {p.answer.meal}
      foods included: {selectedFoods}
      food list: {p.answer.foodList}
      time:{p.answer.selectedTime}
      taste:{p.answer.taste}
      quality:{p.answer.quality}
      quantity:{p.answer.quantity}
      overall Exp: {p.answer.overallExp}
    </div>
  )
}