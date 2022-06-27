import React from "react"
import { isSameDay, format } from "date-fns"
import { Accordion, Button, Container, ListGroup } from "react-bootstrap"
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
    <Container className="d-flex flex-column justify-content-center mt-3 mb-3">
      <h4>Your Logs on {format(p.selectedDay, "ccc, MMM d, y")}</h4>
      <Accordion>
        {dayLogs.map((input, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header> {format(input.date, "H:mm:ss a")} | Registered: {input.type}</Accordion.Header>
            <Accordion.Body>
              {input.type === "food" ? (
                <FoodInput answer={input} />
              ) : (
                <div className="d-flex flex-column">
                  physical:{input.physical}
                  mood: {input.mood}
                  comments: {input.comments}
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Button onClick={restoreSelection} className="text-white">Back to month overview</Button>
    </Container >

  )
}

const FoodInput = (p: {
  answer: Food
}) => {
  const selectedFoods = includedFoods.filter(food => p.answer.included.includes(food.value)).map(f => f.label)
  return (

    <ListGroup className="toggled">
      <ListGroup.Item>type: {p.answer.meal}</ListGroup.Item>
      <ListGroup.Item>foods included: {selectedFoods}</ListGroup.Item>
      <ListGroup.Item> food list: {p.answer.foodList}</ListGroup.Item>
      <ListGroup.Item>time: {p.answer.selectedTime}</ListGroup.Item>
      <ListGroup.Item> taste: {p.answer.taste}</ListGroup.Item>
      <ListGroup.Item>  quality: {p.answer.quality}</ListGroup.Item>
      <ListGroup.Item>  quantity: {p.answer.quantity}</ListGroup.Item>
      <ListGroup.Item> overall Exp: {p.answer.overallExp}</ListGroup.Item>
    </ListGroup>
  )
}