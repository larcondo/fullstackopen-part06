import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import noteService from './services/notes'
import noteReducer, { sendNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  }
})
// console.log(store.getState())
// noteService.getAll().then( notes => 
//   notes.forEach( note => store.dispatch(appendNote(note)))
// )
noteService.getAll().then( notes => store.dispatch(sendNotes(notes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store} >
    <App />
  </Provider>
  // </React.StrictMode>,
)
