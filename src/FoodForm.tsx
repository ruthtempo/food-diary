import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, ListGroup, Card, Tabs, Tab, ProgressBar } from "react-bootstrap"
import { Answer } from "./App";
import { Food } from "./App"
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from '@hookform/error-message';
import Select from 'react-select'


export const includedFoods = [
  { value: "vegetables", label: "Fresh vegetables/legumes" },
  { value: "fruit", label: "Fresh fruit" },
  { value: "raw", label: "Raw food" },
  { value: "fried", label: "Fried food" },
  { value: "caffeine", label: "Caffeine" },
  { value: "alcohol", label: "Alcohol" },
  { value: "meat", label: "Meat" },
  { value: "gluten", label: "Gluten" },
  { value: "dairy", label: "Dairy" },
  { value: "soy", label: "Soy Products" },
  { value: "organic", label: "Organic Food" },
  { value: "canned", label: "Canned food" },
  { value: "fast", label: "Convenient or fast food" },
  { value: "pastries", label: "Pastries" },
  { value: "eggs", label: "Eggs" },
  { value: "fish", label: "Fish" },
  { value: "mustar", label: "Mustard" },
  { value: "peanuts", label: "Peanuts/Nuts" },
  { value: "celery", label: "Celery" },
  { value: "sesame", label: "Sesame" },
  { value: "sulfites", label: "Sulfites" },
]

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


  const { register, control, handleSubmit, formState: { isSubmitSuccessful, errors }, reset } = useForm<Food>({
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
    <>
      <Form onSubmit={handleSubmit(saveInput)}>
        <Tabs
          defaultActiveKey="mealtype"
          className="mb-3 mt-3"
        >
          <Tab eventKey="mealtype" title="1">
            <Form.Group className="mb-3 mt-3 ">
              <Form.Label>Type of meal</Form.Label>
              <Form.Select {...register("meal", { required: "Select a type." })}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </Form.Select>
              <ErrorMessage
                errors={errors}
                name="meal"
                render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time of meal</Form.Label>
              <Form.Control type="time" {...register("selectedTime", { required: "Select a time." })}></Form.Control>
              <ErrorMessage
                errors={errors}
                name="selectedTime"
                render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
              />
            </Form.Group>
            <ProgressBar now={25} />
          </Tab>
          <Tab eventKey="included foods" title="2">
            <Form.Label>My meal included...</Form.Label>
            <Controller
              name="included"
              control={control}
              render={({ field }) =>
                <Select
                  {...field}
                  isMulti
                  value={includedFoods.filter(food => field.value.includes(food.value))}
                  onChange={(selectedValues) => field.onChange(selectedValues.map(v => v.value))} //saving only the value of the array includedfoods to "included"- label not needed
                  options={includedFoods}
                />}
            />
            <Controller  //interface between my custom component and the react form hook state
              control={control}
              name="foodList"
              render={({ field }) =>
                <FoodList foodList={field.value} onChange={field.onChange} />
              }
            />
            <ProgressBar now={55} />
          </Tab>
          <Tab eventKey="rating" title="3">
            <Form.Label>
              How would you rate your meal (1 - Very Poor & 5 - Very Good)
            </Form.Label>
            <Form.Group className="d-flex flex-column">
              {mealRating.map(r =>
                <>
                  <div key={r.type}>
                    <Form.Label className="me-3">{r.type}</Form.Label>
                    {r.rating.map(rat => <Form.Check inline type="radio" label={rat} value={rat} {...register(r.field, {
                      required: "Please rate your meal"
                    })} key={rat} ></Form.Check>)}
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name={r.field}
                    render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                  />
                </>
              )}
              <ProgressBar now={95} />
            </Form.Group>
            <Button className="mt-3" type="submit">Save</Button>
          </Tab>
        </Tabs>
        <Button className="mt-4 me-2" >Prev</Button><Button className="mt-4" >Next</Button>
      </Form >
    </>
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

        <Card className="mb-4 mt-4">
          <Card.Header>Food List</Card.Header>
          <Card.Body>
            <InputGroup>
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
            <ListGroup variant="flush">
              {p.foodList.map(ing => (
                <ListGroup.Item key={ing} className="d-flex justify-content-between">
                  <p>{ing}</p>
                  <Button variant="danger" className="d-flex" onClick={() => deleteIngredient(ing)}>Delete</Button>
                </ListGroup.Item>
              )
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Form.Group>
    </>
  )
}