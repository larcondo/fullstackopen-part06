import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   }
// ]

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // createNote definition removed from here!
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    sendNotes(state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote, sendNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(sendNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer