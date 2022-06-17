import React from "react"
import { Form, Button } from "react-bootstrap"


const exercices = ["Biking", "Climbing", "HIIT", "Freestyle", "Jogging", "Pilates", "Swimming", "Yoga"]

const duration = [15, 30, 45, 60, 90]
export const ExerciseForm = () => {

  return (
    <>
      <Form>
        <Form.Group>
          <select className="form-select" aria-label="Type of Exercice">
            {exercices.map(exercice => (
              <option value={exercice}>{exercice}</option>
            ))}
          </select>
          <select className="form-select" aria-label="duration">
            {duration.map(d => (
              <option value={d}>{d} min</option>
            ))}
          </select>
        </Form.Group>
        <Button>Save</Button>
      </Form>
    </>
  )
}