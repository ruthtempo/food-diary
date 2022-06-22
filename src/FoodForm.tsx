import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, ListGroup, Card } from "react-bootstrap"
import { Answer } from "./App";
import { Food } from "./App"
import { useNavigate } from "react-router-dom";

const includedFoods = ["Fresh Vegetables", "fresh fruit", "Raw food", "Fried food", "Meat", "Gluten", "Dairy", "Soy Products", "Organic Food", , "Canned food", "Convenient or fast food", "Candy or other processed sweets", "Other Allergens (eggs, fish, mustard, peanuts and other nuts, celery, sesame, sulfites )"]

const mealRating = [
  {
    type: "Taste",
    field: "taste",
    rating: [1, 2, 3, 4, 5]
  },
  {
    type: "Quality",
    field: "quality",
    rating: [1, 2, 3, 4, 5]
  }, {
    type: "Quantity",
    field: "quantity",
    rating: [1, 2, 3, 4, 5]
  }, {
    type: "Overall Exp.",
    field: "overallExp",
    rating: [1, 2, 3, 4, 5]
  }
] as const;



export const FoodForm = (p: {
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
}) => {

  let navigate = useNavigate()

  const { register, control, handleSubmit, formState: { isSubmitSuccessful }, reset } = useForm<Food>({
    defaultValues: {
      type: "food",
      meal: "",
      included: [],
      date: new Date(),
      foodList: [],
      selectedTime: "10:00",
      overallExp: undefined,
    }
  })

  useEffect(() => {
    reset({
      type: "food",
      meal: "",
      included: [],
      date: new Date(),
      foodList: [],
      selectedTime: "10:00",
      overallExp: undefined,
    })
  }, [isSubmitSuccessful])


  const saveInput = (food: Food) => {

    p.setAnswers(oldAnswers => oldAnswers.concat({
      ...food,
      date: new Date(),


    }))

    navigate("/")
  }


  return (
    <Form onSubmit={handleSubmit(saveInput)}>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Type of meal</Form.Label>
        <Form.Select {...register("meal", { required: "select Type of Meal" })}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time of meal</Form.Label>
        <Form.Control type="time" {...register("selectedTime", { required: "Please select a time." })}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>My meal included: </Form.Label>
        {includedFoods.map(f =>
          <Form.Check type="checkbox" value={f} label={f} key={f} {...register("included")} />
        )}
      </Form.Group>
      <Controller  //interface between my custom component and the react form hook state
        control={control}
        name="foodList"
        render={({ field }) =>
          <FoodList foodList={field.value} onChange={field.onChange} />
        }
      />

      <Form.Label>
        How would you rate your meal (1 - Very Poor & 5 - Very Good)
      </Form.Label>
      <Form.Group className="d-flex flex-column">
        {mealRating.map(r =>
          <div key={r.type}>
            <Form.Label className="me-3">{r.type}</Form.Label>
            {r.rating.map(rat => <Form.Check inline type="radio" label={rat} value={rat} {...register(r.field)} key={rat} ></Form.Check>)}
          </div>
        )}
      </Form.Group>
      <Button className="mt-3" type="submit">Save</Button>
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
      <Form.Group>
        <InputGroup className="mb-3 mt-4">
          <Form.Control
            placeholder="Enter Ingredient or Dish"
            aria-label="Ingredient"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={ingredient}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={addToFoodList}>
            Add
          </Button>
        </InputGroup>
        <Card style={{ width: '18rem' }} className="mb-4">
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
      </Form.Group>
    </>
  )
}