import React, { useReducer, useCallback, useRef, useEffect } from 'react';
import './App.css';

import List from './components/List/List.jsx'
import Input from './components/Input/Input.jsx'

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, { text: action.payload, id: Date.now(), }]
      break;
    case 'EDITABLE':
      return state.map((item) => {
        item.id == action.payload ? item.isEdit = true : item.isEdit = false
        return item
      })
      break;
    case 'EDIT':
      return state.map((item) => {
        if (item.id == action.payload.id) {
          item = { ...item, text: action.payload.value }
        }

        item.isEdit = false

        return item
      })
      break;
    case 'DONE':
      return state.map((item) => {
        if (item.id == action.payload) {
          item = { ...item, done: !item.done } // Если state объект то делается поверхностное сравнение
        }

        item.isEdit = false

        return item
      })
      break;
    case 'DELETE':
      return state.filter((item) => {
        return item.id !== action.payload
      })
      break;
    case 'CLEAR_EDITABLE':
      return state.map((item) => ({ ...item, isEdit: false }))
      break;
    case 'SET_ALL':
      return action.payload
      break;
    default:
      return state
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducerFunction, [])
  const $app = useRef()
  const refState = useRef()
  refState.current = state

  useEffect(() => {
    let parsedFromLocalStorage = JSON.parse(window.localStorage.getItem('Htodo') || '[]')
    dispatch({ type: 'SET_ALL', payload: parsedFromLocalStorage})
    window.addEventListener('beforeunload', (event) => {
      localStorage.setItem('Htodo', JSON.stringify(refState.current))
    })
  }, [])

  // propertyes
  const createTodoHandle = useCallback((value) => {
    dispatch({ type: 'CREATE', payload: value })
  }, [])

  const editTodoHandle = useCallback((id, value) => {
    dispatch({ type: 'EDIT', payload: { id, value } })
  }, [])

  const editableHandle = useCallback((id) => {
    dispatch({ type: 'EDITABLE', payload: id })
  }, [])

  const doneHandle = useCallback((id) => {
    dispatch({ type: 'DONE', payload: id })
  }, [])

  const deleteHandle = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id })
  }, [])

  const appClickHandle = useCallback(function (event) {
    if (event.target === $app.current) {
      dispatch({ type: 'CLEAR_EDITABLE' })
    }
  }, [])

  return (
    <div className="App" ref={$app} onClick={appClickHandle}>
      <Input onCreateHandle={createTodoHandle} />
      <List
        onItemEdit={editTodoHandle}
        items={state}
        editableHandle={editableHandle}
        onDoneHandle={doneHandle}
        onDeleteHandle={deleteHandle} />
    </div>
  );
}

export default App;
