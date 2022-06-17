import React, { useState } from "react"
import { Form, Card, ListGroup, Button } from "react-bootstrap"


//symptom categories : mood & physical symptoms 
const physicalSymptoms = ["satisfied", "sleepy", "fueled", "stomach cramps", "gas", "bloating", "headache", "fogginess", "acne", "itchiness", "tired"]
const moodSymptoms = ["happy", "feeling positive", "feeling negative", "sad", "irritability", "angry", "guilty", "ok", "anxious"]


const toggleSelection = (mySymptomCategory: string[], setSymptoms: React.Dispatch<React.SetStateAction<string[]>>, symptom: string) => {
  if (!mySymptomCategory.includes(symptom)) {
    setSymptoms(oldSymptoms => oldSymptoms.concat(symptom))
  } else {
    const updatedSymptomList = mySymptomCategory.filter(s => s !== symptom)
    setSymptoms(updatedSymptomList)
  }
}

export const Symptoms = () => {

  const [myPhysicalSymptoms, setMyPhysicalSymptoms] = useState<string[]>([])
  const [myMood, setMyMood] = useState<string[]>([])

  return (
    <Form>
      <Form.Group>
        <Card style={{ width: '18rem' }}>
          <Card.Header>physical symptoms</Card.Header>
          <ListGroup>
            {physicalSymptoms.map(symptom => (
              <ListGroup.Item onClick={() => toggleSelection(myPhysicalSymptoms, setMyPhysicalSymptoms, symptom)} style={{ backgroundColor: myPhysicalSymptoms.includes(symptom) ? "green" : "" }}>{symptom}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Form.Group>

      <Form.Group>
        <Card style={{ width: '18rem' }}>
          <Card.Header>Mood</Card.Header>
          <ListGroup>
            {moodSymptoms.map(symptom => (
              <ListGroup.Item onClick={() => toggleSelection(myMood, setMyMood, symptom)} style={{ backgroundColor: myMood.includes(symptom) ? "green" : "" }}>{symptom}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Form.Group>
      <Form.Control
        as="textarea"
        placeholder="Other Comments..."
        style={{ maxHeight: '100px', width: '400px' }}
      />

      <Button>Save</Button>
    </Form>
  )
}