import React, { useState, useEffect } from "react"
import { Form, Card, ListGroup, Button, InputGroup, ListGroupItem } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { isConstructorDeclaration } from "typescript";
import { Answer } from "./App";
import { Symptoms } from "./App"


//symptom categories : mood & physical symptoms 
const physicalSymptoms = ["satisfied", "sleepy", "fueled", "stomach cramps", "gas", "bloating", "headache", "fogginess", "acne", "itchiness", "tiredness", "insomnia"]
const moodSymptoms = ["happy", "content", "feeling optimistic", "feeling pessimistic", "peaceful", "sadness", "frustrated", "irritated", "angry", "guilty", "ok", "anxiety", "racing thoughts", "grumpy"]


export const SymptomsComp = (p: {
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
}) => {

  const { register, handleSubmit, control, formState: { isSubmitSuccessful }, reset } = useForm<Symptoms>({
    defaultValues: {
      type: "symptoms",
      date: new Date(),
      physical: [],
      mood: [],
      comments: ""
    }
  })

  useEffect(() => {
    reset({
      type: "symptoms",
      date: new Date(),
      physical: [],
      mood: [],
      comments: ""
    })
  }, [isSubmitSuccessful])

  let navigate = useNavigate()

  const saveSymptoms = (symptoms: Symptoms) => {
    p.setAnswers(oldAnswers => oldAnswers.concat({
      ...symptoms,
      date: new Date()
    }))
    navigate("/")
  }
  return (
    <Form onSubmit={handleSubmit(saveSymptoms)}>

      <Controller
        name="physical"
        control={control}
        render={({ field }) => <CardSelect title="Physical Symptoms" values={physicalSymptoms} value={field.value} onChange={field.onChange} />}
      />

      <Controller
        name="mood"
        control={control}
        render={({ field }) => <CardSelect title="Mood" values={moodSymptoms} value={field.value} onChange={field.onChange} />}
      />

      <Form.Control
        className="mt-3 mb-4"
        as="textarea"
        placeholder="Additional Comments...(i.e : I've caught a cold..."
        style={{ maxHeight: '100px' }}
        {...register("comments")}
      />

      <Button type="submit">Save</Button>
    </Form>
  )
}




const CardSelect = (p: {
  onChange: (value: string[]) => void, //onchange is a prop from field
  value: string[];
  values: string[];
  title: string,
}) => {

  const toggleSelection = (symptom: string) => {
    if (!p.value.includes(symptom)) {
      const newMoodSymptomSelection = p.value.concat(symptom)
      p.onChange(newMoodSymptomSelection)
    } else {
      const updatedMoodSymptomList = p.value.filter(s => s !== symptom)
      p.onChange(updatedMoodSymptomList)
    }
  }


  //custom input

  const [customSymptom, setCustomSymptom] = useState("")
  const [customSymptoms, setCustomSymptoms] = useState<string[]>([])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCustomSymptom(e.target.value)
  }
  const customAdd = () => {
    if (!customSymptoms.includes(customSymptom) && !p.values.includes(customSymptom)) {
      const newCustomSymptomsList = customSymptoms.concat(customSymptom)
      setCustomSymptoms(newCustomSymptomsList)
    } else if (p.values.includes(customSymptom)) {
      alert("select this symptom from the list")
    }
    setCustomSymptom("")
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === "Enter") {
      event.preventDefault()
      customAdd()
    }
  }

  const deleteCustom = (customSymp: string) => {
    const newCustomList = customSymptoms.filter(s => s !== customSymp)
    setCustomSymptoms(newCustomList)
  }
  return (
    <Form.Group className="mt-3">
      <Card>
        <Card.Header className="text-center">{p.title}</Card.Header>
        <ListGroup>
          {p.values.map(symptom => (
            <ListGroup.Item
              onClick={() => toggleSelection(symptom)}
              className={p.value.includes(symptom) ? "toggled" : ""}
            >{symptom}</ListGroup.Item>
          ))}
          {customSymptoms.map(custom =>
            <ListGroup.Item className="d-flex justify-content-between toggled">
              {custom}
              <Button onClick={() => deleteCustom(custom)}>Delete</Button>
            </ListGroup.Item>)}
        </ListGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Other"
            aria-label="other"
            type="text"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={customSymptom}
            onKeyPress={handleKeyPress}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={() => customAdd()}>
            Add
          </Button>
        </InputGroup>
      </Card>
    </Form.Group>
  )
}