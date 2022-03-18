import React, { useState } from 'react';
import './App.css';

function getClue() {
  return fetch('http://jservice.io/api/random');
}

function JeopardyCard(props) {
  const {
    category,
    question,
    answer,
    value,
    showAnswer
  } = props;

  return (
    <div>
      <div className="Jeopardy-box flex-box-column" style={{"height": "7em"}}>
        <div style={{"font-size": "2em", "text-shadow": "2px 2px 0px black", "font-weight": "bold"}}>{category.toUpperCase()} ({value})</div>
      </div>
      <div className="Jeopardy-box flex-box-column" style={{"height": "18em", "overflow-y": "auto"}}>
        <div style={{"font-size": "2em", "padding": "0.5em"}}>{showAnswer ? answer : question}</div>
      </div>
    </div>
  )
}


function App() {
  const START = 0;
  const QUESTION = 1;
  const GUESSED = 2;
  const SUMMARY = 3;

  const [clue, setClue] = useState({
    question: "...",
    answer: "...",
    category: "...",
    value: "",
    showAnswer: false
  });

  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Welcome to Jeopardy! Here are your clues for today...');
  const [gameState, setGameState] = useState(START);
  const [cluesAnswered, setCluesAnswered] = useState([]);

  const addClueAnswered = (question, answer, category, value, userAnswer, isCorrect) => {
    setCluesAnswered([...cluesAnswered, {
      question,
      answer,
      category,
      value,
      userAnswer,
      isCorrect
    }]);
  }

  const setLastClueAnsweredCorrectly = () => {
    const newCluesAnswered = cluesAnswered;
    newCluesAnswered[cluesAnswered.length - 1]['isCorrect'] = true;
    setCluesAnswered(newCluesAnswered);
  }

  const nextClue = () => {
    setGuess("");
    if (cluesAnswered.length == 6) {
      setGameState(SUMMARY);
      return;
    }

    setGameState(QUESTION);
    getClue().then((clue) => {
      clue.json().then((response) => {
        const generatedClue = response[0];
        console.log(generatedClue);
        setClue({
          question: generatedClue.question,
          answer: generatedClue.answer,
          category: generatedClue.category.title,
          value: generatedClue.value || 0,
          showAnswer: false
        })
        setMessage(`"${generatedClue.category.title}" for ${generatedClue.value}...`)
      });
    });
  }

  const initializeClue = () => {
    nextClue();
  }

  const handleGuess = () => {
    setGameState(GUESSED);
    if (isAnswerCorrect()) {
      addClueAnswered(clue.question, clue.answer, clue.category, clue.value, guess, true);
      setMessage("Right!")
    } else {
      addClueAnswered(clue.question, clue.answer, clue.category, clue.value, guess, false);
      toggleShowAnswer();
      setMessage("Wrong!")
    }
  }

  const handleCorrectOverride = () => {
    if (!isAnswerCorrect()) {
      setMessage("Incorrectly marked as wrong... points added back to your score!")
      setLastClueAnsweredCorrectly();
    }
  }

  if (gameState === START) {
    setGameState(QUESTION);
    initializeClue();
  }

  const toggleShowAnswer = () => {
    setClue({...clue, showAnswer: !clue.showAnswer})
  }

  const isAnswerCorrect = () => {
    return guess.toLowerCase() === clue.answer.toLowerCase();
  }

  return (
    <div className="App flex-box-column" style={{"background-color": "#00003A", "minHeight": "100%"}}>
      <div className="Jeopardy-title">
        Jeopardy
      </div>
      { gameState !== SUMMARY &&
        <div className="flex-box-column">
          <div>
            <JeopardyCard value={clue.value} category={clue.category} question={clue.question} answer={clue.answer} showAnswer={clue.showAnswer}/>
          </div>
          <div className='form-group form-inline mt-4' autocomplete="off">
            <form onSubmit={e => e.preventDefault()}>
              <input autocomplete="off" disabled={gameState === GUESSED} className='form-control' value={guess} onChange={(event) => {setGuess(event.target.value)}} type="text" />
              <button disabled={gameState === GUESSED} className='btn btn-primary mx-2' onClick={handleGuess}>Guess</button>
              {
                gameState === GUESSED && !isAnswerCorrect() &&
                <button className='btn btn-success' type="button" onClick={nextClue}>Next Clue</button>
              }
            </form>
          </div>
          <div>
            <button className='btn btn-outline-danger btn-sm mr-2' type="button" onClick={toggleShowAnswer}>
              {
                !clue.showAnswer ? "Show Answer" : "Show Question"
              }
            </button>
            <span>
              {gameState === QUESTION
                ? <button className='btn btn-outline-warning btn-sm' type="button" onClick={nextClue}>Skip Clue</button>
                : <button onClick={handleCorrectOverride} className='btn btn-outline-secondary btn-sm' >I was right!</button>
              }
            </span>
          </div>
          <div>
            <p className='mt-4 h4'>{message}</p>
          </div>
          <div>
            <p className='mt-4 h4'>
              { 'You have: ' }
              { cluesAnswered.filter((clueAnswered) => clueAnswered.isCorrect).length }
              { ' right, out of ' }
              { cluesAnswered.length }
              { ' answered.' }
            </p>
          </div>
        </div>
      }
      { gameState == SUMMARY &&
        <div class="container flex-box-column">
          <p>Summary:</p>
          <p>
            { 'You answered '}
            { cluesAnswered.filter((cluesAnswered) => cluesAnswered.isCorrect).length }
            { ' correctly, out of today\'s ' }
            { cluesAnswered.length }
            { ' clues' }
          </p>
          <p>
            { 'On the show you would have made $' }
            { cluesAnswered.reduce((total, clueAnswered) => (clueAnswered.isCorrect ? total + clueAnswered.value : total - clueAnswered.value), 0) }
          </p>
          <table class="table-dark table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">Clue Value</th>
              </tr>
            </thead>
            <tbody>
            {cluesAnswered.map((clueAnswered, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{clueAnswered.question}</td>
                <td>{clueAnswered.answer}</td>
                <td>{clueAnswered.value}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default App;
