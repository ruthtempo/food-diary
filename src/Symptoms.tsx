import React, { useState, useEffect } from "react"
import { Form, Card, ListGroup, Button } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Answer } from "./App";
import { Symptoms } from "./App"


//symptom categories : mood & physical symptoms 
const physicalSymptoms = ["satisfied", "sleepy", "fueled", "stomach cramps", "gas", "bloating", "headache", "fogginess", "acne", "itchiness", "tired"]
const moodSymptoms = ["happy", "feeling positive", "feeling negative", "sad", "irritability", "angry", "guilty", "ok", "anxious"]




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
        placeholder="Other Comments..."
        style={{ maxHeight: '100px', width: '400px' }}
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

  return (
    <Form.Group className="mt-3">
      <Card style={{ width: '18rem' }}>
        <Card.Header>{p.title}</Card.Header>
        <ListGroup>
          {p.values.map(symptom => (
            <ListGroup.Item
              onClick={() => toggleSelection(symptom)}
              style={{ backgroundColor: p.value.includes(symptom) ? "green" : "" }} >{symptom}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Form.Group>
  )
}