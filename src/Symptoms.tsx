import React, { useState } from "react"
import { Form, Card, ListGroup, Button } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { Answer } from "./App";
import { Symptoms } from "./App"


//symptom categories : mood & physical symptoms 
const physicalSymptoms = ["satisfied", "sleepy", "fueled", "stomach cramps", "gas", "bloating", "headache", "fogginess", "acne", "itchiness", "tired"]
const moodSymptoms = ["happy", "feeling positive", "feeling negative", "sad", "irritability", "angry", "guilty", "ok", "anxious"]




export const SymptomsComp = (p: {
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
}) => {

  const { register, handleSubmit, control } = useForm<Symptoms>({
    defaultValues: {
      type: "symptoms",
      date: new Date(),
      physical: [],
      mood: [],
      comments: ""

    }
  })


  const saveSymptoms = (symptoms: Symptoms) => {
    p.setAnswers(oldAnswers => oldAnswers.concat({
      ...symptoms,
      date: new Date()
    }))

  }
  return (
    <Form onSubmit={handleSubmit(saveSymptoms)}>
      <Controller
        name="physical"
        control={control}
        render={({ field }) => <Physical physicalSymptoms={field.value} onChange={field.onChange} />}
      />

      <Controller
        name="mood"
        control={control}
        render={({ field }) => <Mood mood={field.value} onChange={field.onChange} />}
      />

      <Form.Control
        as="textarea"
        placeholder="Other Comments..."
        style={{ maxHeight: '100px', width: '400px' }}
        {...register("comments")}
      />

      <Button type="submit">Save</Button>
    </Form>
  )
}


const Physical = (p: {
  onChange: (value: string[]) => void, //onchange is a prop from field
  physicalSymptoms: string[]
}) => {
  const toggleSelection = (symptom: string) => {

    if (!p.physicalSymptoms.includes(symptom)) {
      const newPhysicalSymptomSelection = p.physicalSymptoms.concat(symptom)
      p.onChange(newPhysicalSymptomSelection)
    } else {
      const updatedSymptomList = p.physicalSymptoms.filter(s => s !== symptom)
      p.onChange(updatedSymptomList)
    }
  }
  return (
    <Form.Group >
      <Card style={{ width: '18rem' }}>
        <Card.Header>physical symptoms</Card.Header>
        <ListGroup>
          {physicalSymptoms.map(symptom => (
            <ListGroup.Item onClick={() => toggleSelection(symptom)} style={{ backgroundColor: p.physicalSymptoms.includes(symptom) ? "green" : "" }}>{symptom}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Form.Group >
  )
}

const Mood = (p: {
  onChange: (value: string[]) => void, //onchange is a prop from field
  mood: string[]
}) => {

  const toggleSelection = (symptom: string) => {
    if (!p.mood.includes(symptom)) {
      const newMoodSymptomSelection = p.mood.concat(symptom)
      p.onChange(newMoodSymptomSelection)
    } else {
      const updatedMoodSymptomList = p.mood.filter(s => s !== symptom)
      p.onChange(updatedMoodSymptomList)
    }
  }

  return (
    <Form.Group>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Mood</Card.Header>
        <ListGroup>
          {moodSymptoms.map(symptom => (
            <ListGroup.Item
              onClick={() => toggleSelection(symptom)}
              style={{ backgroundColor: p.mood.includes(symptom) ? "green" : "" }} >{symptom}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Form.Group>
  )
}