import React, { useState } from "react";
import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, ListGroup, Card } from "react-bootstrap"


export const FoodForm = () => {
  const [ingredient, setIngredient] = useState("")
  const [foodList, setFoodList] = useState<string[]>([])

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
    const updatedFoodList = foodList.filter((i) => i !== ingredient)
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
      <Button>Save</Button>
    </Form >
  )
}