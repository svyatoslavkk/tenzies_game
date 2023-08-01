import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {nanoid} from "nanoid";
import { Confetti } from 'react-confetti';

export default function App() {

  const [numbers, setNumbers] = useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  /* Message if all numbers are filled */
  React.useEffect(() => {
    const allHeld = numbers.every(number => number.isHeld)
    const firstValue = numbers[0].value
    const allSameValue = numbers.every(numbers => numbers.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [numbers])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  /* To get an array of 10 random numbers */
  function allNewDice () {
    const diceValues = [];
    for (let i = 0; i < 10; i++) {
      diceValues.push(generateNewDie());
    }
    return diceValues;
  }

  /* To set random values to all 10 numbers */
  const diceElements = numbers.map(number => 
    <Die 
      key={number.id} 
      value={number.value} 
      isHeld={number.isHeld} 
      holdDice={() => holdDice(number.id)}
    />
  )

  function Die({ value, isHeld, holdDice }) {
    const dieStyle = {
      backgroundColor: isHeld ? "#59E391" : "white",
    };

    return (
      <div className="die" style={dieStyle} onClick={holdDice} >
        {value}
      </div>
    );
  }

  /* To roll new values */
  function rollDice() {
    if (!tenzies) {
      setNumbers(oldDice => oldDice.map(number => {
        return number.isHeld ?
          number :
          generateNewDie() 
      }))
    } else {
      setTenzies(false)
      setNumbers(allNewDice())
    }
  }

  /* To choose color for any of numbers */
  function holdDice (id) {
    setNumbers(oldDice => oldDice.map(number => {
      return number.id === id ? 
        {...number, isHeld: !number.isHeld}
        :
        number
    }))
  }

  return (
    <div className="centered-container">
      <div className="App">
        <div className="tenzies-content">
          {tenzies && <Confetti />}
          <div>
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls</p>
          </div>
          <div className="dice-container">
            {diceElements}
          </div>
          <button className='button' onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}
