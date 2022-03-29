import { useContext, useReducer, createContext } from 'react'
import { MyContext } from '../App.js'

function init(initText) {
  return { text2: initText }
}

function myReducer(state, action) {
  switch (action.tt) {
    case 'hi':
      return { text2: (state.text = 'text') }
    case 'qq':
      return { text2: (state.text = 'qq') }
    case 'reset':
      return init(action.payload)

    default:
      throw new Error()
  }
}

function Test2({ initText }) {
  const [state, dispatch] = useReducer(myReducer, initText, init)
  return (
    <>
      Text: {state.text2}
      <button onClick={() => dispatch({ tt: 'reset', payload: 'reset' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ tt: 'hi' })}>hi</button>
      <button onClick={() => dispatch({ tt: 'qq' })}>qq</button>
    </>
  )
}

export default Test2
