import { useContext, useReducer, createContext } from 'react'
import { MyContext } from './../App.js'

function init(initialCount) {
  return { count: initialCount }
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}

function Test({ initialCount }) {
  const initValue = useContext(MyContext)
  // console.log('from context', initialCount)
  const [state, dispatch] = useReducer(reducer, initValue.v2, init)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset', payload: initValue.v2 })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}

export default Test
