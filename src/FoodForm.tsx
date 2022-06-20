import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, ListGroup, Card } from "react-bootstrap"
import { Answer } from "./App";
import { Food } from "./App"



export const FoodForm = (p: {
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
}) => {
  const { register, control } = useForm<Food>({
    defaultValues: {
      type: "food",
      meal: "",
      date: new Date(),
      foodList: [],
      selectedTime: ""
    }
  })


  //const [foodList, setFoodList] = useState<string[]>([])



  const saveInput = (meal: string, list: string[], time: string) => {
    p.setAnswers(oldAnswers => oldAnswers.concat({
      type: "food",
      date: new Date(),
      meal: meal,
      foodList: list,
      selectedTime: time
    }))
  }


  return (
    <Form>
      <Form.Group className="mb-3 mt-3">
        <Form.Select {...register("meal")}>
          <option >Choose Type of Meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time of Meal</Form.Label>
        <Form.Control type="time" {...register("selectedTime")}></Form.Control>
      </Form.Group>

      <Controller  //interface between my custom component and the react form hook state
        control={control}
        name="foodList"
        render={({ field }) =>
          <FoodList foodList={field.value} onChange={field.onChange} />
        }
      />

      <Button className="mt-3">Save</Button>
    </Form >
  )
}


//custom component that gets foodList and can send back a modified foodList (iwth the onchange callback)
const FoodList = (p: {
  onChange: (value: string[]) => void, //onchange is a prop from field
  foodList: string[] //value
}) => {
  const [ingredient, setIngredient] = useState("")

  const deleteIngredient = (ing: string) => {
    const updatedFoodList = p.foodList.filter((i) => i !== ing)
    p.onChange(updatedFoodList)
  }

  const addToFoodList = () => {
    if (ingredient !== "" && !p.foodList.includes(ingredient)) {
      const newFoodList = p.foodList.concat(ingredient)
      p.onChange(newFoodList)
    }
    // setFoodList(oldList => oldList.concat(ingredient));
    setIngredient("")
  }


  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIngredient(e.target.value)
  }


  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Type Ingredient or Dish"
          aria-label="Ingredient"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={ingredient}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={addToFoodList}>
          Add
        </Button>
      </InputGroup>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Food List</Card.Header>
        <ListGroup variant="flush">
          {p.foodList.map(ing => (
            <ListGroup.Item className="d-flex justify-content-between" key={ing}>
              {ing}
              <Button variant="danger" onClick={() => deleteIngredient(ing)}>Delete</Button>
            </ListGroup.Item>
          )
          )}
        </ListGroup>
      </Card>
    </>
  )
}