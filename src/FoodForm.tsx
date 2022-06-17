import React, { useState } from "react";
import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, ListGroup, Card } from "react-bootstrap"

export const FoodForm = () => {
  //symptom categories : mood & physical symptoms 
  const physicalSymptoms = ["satisfied", "sleepy", "fueled", "stomach cramps", "gas", "bloating", "headache", "fogginess", "acne", "itchiness", "tired"]
  const moodSymptoms = ["happy", "feeling positive", "feeling negative", "sad", "irritability", "angry", "guilty", "ok", "anxious"]

  const [ingredient, setIngredient] = useState("")
  const [foodList, setFoodList] = useState<string[]>([])
  const [myPhysicalSymptoms, setMyPhysicalSymptoms] = useState<string[]>([])
  const [myMood, setMyMood] = useState<string[]>([])


  const toggleSelection = (mySymptomCategory: string[], setSymptoms: React.Dispatch<React.SetStateAction<string[]>>, symptom: string) => {
    if (!mySymptomCategory.includes(symptom)) {
      setSymptoms(oldSymptoms => oldSymptoms.concat(symptom))
    } else {
      const updatedSymptomList = mySymptomCategory.filter(s => s != symptom)
      setSymptoms(updatedSymptomList)
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIngredient(e.target.value)
  }
  const addToFoodList = (ingredient: string) => {
    if (ingredient !== "") {
      const newIngredient = foodList.concat(ingredient)
      setFoodList(newIngredient)
    }
    // setFoodList(oldList => oldList.concat(ingredient));
    setIngredient("")
  }

  const deleteIngredient = (ingredient: any) => {
    const updatedFoodList = foodList.filter((i) => i != ingredient)
    setFoodList(updatedFoodList)
  }

  return (
    <Form>
      <Form.Group>
        <Form.Select>
          <option >Choose Type of Meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </Form.Select>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Type Ingredient or Dish"
            aria-label="Ingredient"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={ingredient}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={() => addToFoodList(ingredient)}>
            Add
          </Button>
        </InputGroup>
        <Card style={{ width: '18rem' }}>
          <Card.Header>Food List</Card.Header>
          <ListGroup variant="flush">
            {foodList.map(ingredient => (
              <ListGroup.Item className="d-flex justify-content-between">
                {ingredient}
                <Button variant="danger" onClick={() => deleteIngredient(ingredient)}>Delete</Button>
              </ListGroup.Item>
            )
            )}
          </ListGroup>
        </Card>
      </Form.Group>

      {/* part 2 form */}
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

      <Form.Group >
        <Form.Label>
          Did I exercise?
        </Form.Label>
        <Form.Check
          inline
          type="radio"
          label="Yes"
          value="yes"
          name="exercice"
        />
        <Form.Check
          inline
          type="radio"
          label="No"
          value="no"
          name="exercice"
        />
      </Form.Group>
      <Form.Group>
        <select className="form-select" aria-label="Type of Exercice">
          <option selected>Open this select menu</option>
          <option value="1">Trekking</option>
          <option value="2">Yoga</option>
          <option value="3">Swimming</option>
          <option value="3">HIIT</option>
          <option value="3">Freestyle</option>
        </select>
      </Form.Group>
      <Form.Control
        as="textarea"
        placeholder="Other Comments..."
        style={{ maxHeight: '100px', width: '400px' }}
      />

      <Button>Save</Button>
    </Form >
  )
}