import React from "react"
import { isSameDay, format } from "date-fns"
import { Accordion, Button, Container, Row, Col, Badge } from "react-bootstrap"
import { Answer, Food } from "./App"
import { includedFoods } from "./FoodForm"
import { BandaidFill, ChatRightDots, CheckCircleFill, Clock, HeartFill, ZoomIn, } from "react-bootstrap-icons"
import { Rating } from "react-simple-star-rating"



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
      <Button onClick={restoreSelection} className=" mb-3" variant="light">Back to month overview</Button>
      <h4><Badge style={{ width: "100%" }} className="py-2 " bg="secondary">Your Logs on {format(p.selectedDay, "ccc, MMM d, y")}</Badge></h4>
      <Accordion>
        {dayLogs.map((input, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header className="d-flex justify-content-between">
              {format(input.date, "H:mm:ss a")} | {input.type}
            </Accordion.Header>
            <Accordion.Body className=" d-flex flex-column" style={{ backgroundColor: "whitesmoke" }}>
              {input.type === "food" ? (
                <FoodInput answer={input} />
              ) : (
                <Container className="p-0">
                  <Row>
                    {input.physical.length > 0 && <Col>  {input.physical.map((p, index) =>
                      <ul key={index}>
                        <li className="list"><BandaidFill className="me-2 icon" /> {p}</li>
                      </ul>)}
                    </Col>
                    }
                    {input.mood.length > 0 && (<Col>{input.mood.map((m, index) =>
                      <ul key={index}>
                        <li className="list"> <HeartFill className="me-2 icon" />{m}</li>
                      </ul>)}
                    </Col>
                    )}
                  </Row>
                  {input.comments &&
                    <Row>
                      <Col>
                        <ChatRightDots /> <i>"{input.comments}"</i>
                      </Col>
                    </Row>
                  }
                </Container>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container >

  )
}

const FoodInput = (p: {
  answer: Food
}) => {
  const selectedFoods = includedFoods.filter(food => p.answer.included.includes(food.value)).map(f => f.label)
  return (
    <Container className="p-2 d-flex flex-column justify-space-between">
      <div><Clock className="me-3 icon" /> {p.answer.selectedTime} {p.answer.meal}</div>
      <div className=" mt-2"><CheckCircleFill className=" me-3 icon" /> {selectedFoods.join(", ")}</div>
      {p.answer.foodList.length > 0 && <div className=" mt-2"> <ZoomIn className="me-3 icon" /> <i>{p.answer.foodList.join(", ")}</i></div>}
      <div className="d-flex justify-content-between mt-3"> Taste: <Rating ratingValue={p.answer.taste} readonly size={25} /></div>
      <div className="d-flex justify-content-between"> Quality: <Rating ratingValue={p.answer.quality} readonly size={25} /></div>
      <div className="d-flex justify-content-between"> Quantity: <Rating ratingValue={p.answer.quantity} readonly size={25} /></div>
      <div className="d-flex justify-content-between"> Overall Exp: <Rating ratingValue={p.answer.overallExp} readonly size={25} /></div>
    </Container >
  )
}