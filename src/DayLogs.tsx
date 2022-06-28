import React from "react"
import { isSameDay, format } from "date-fns"
import { Accordion, Button, Container, Row, Col } from "react-bootstrap"
import { Answer, Food } from "./App"
import { includedFoods } from "./FoodForm"
import { ChatRightDots, Clock, ListUl, } from "react-bootstrap-icons"



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
            <Accordion.Body className="toggled d-flex flex-column">
              {input.type === "food" ? (
                <FoodInput answer={input} />
              ) : (
                <Container>
                  <Row>
                    <Col>Physical:{input.physical.map(p =>
                      <ul>
                        <li>{p}</li>
                      </ul>)}
                    </Col>
                    <Col> Mood: {input.mood.map(m =>
                      <ul>
                        <li>{m}</li>
                      </ul>)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ChatRightDots /> <i>"{input.comments}"</i>
                    </Col>
                  </Row>
                </Container>
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
    <Container className="toggled p-4">
      <div><Clock /> {p.answer.selectedTime} {p.answer.meal}</div>
      <div>foods included: {selectedFoods}</div>
      <div> <ListUl /> {p.answer.foodList}</div>
      <div> Taste: {p.answer.taste}</div>
      <div> Quality: {p.answer.quality}</div>
      <div> Quantity: {p.answer.quantity}</div>
      <div> Overall Exp: {p.answer.overallExp}</div>
    </Container>
  )
}