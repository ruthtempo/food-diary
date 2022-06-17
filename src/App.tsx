import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FoodForm } from './FoodForm';

import './App.css';

function App() {
  return (
    <Container>
      <Button>Register Meal</Button>
      <FoodForm />
    </Container>
  );
}

export default App;
