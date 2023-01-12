import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempNotes = {
  _id: new Date().getTime(),
  title: "",
  description: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  category: "sin categoría",
  color: "",
  priority: "Sin prioridad",
  stateNote: true
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [
      //tempNotes
    ],
    activeNote: null,
    categories: [],
  },
  reducers: {
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
    },
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.activeNote = null;
      state.categories.push(payload.category);
    },
    onUpdateNote: (state, { payload }) => {
      state.notes = state.notes.map(note => {
        if (note._id === payload._id) {
          // modifica la nota
          return payload;
        }
        // deja igual la nota
        return note;
      });
      state.activeNote = null;
    },
    onDeleteNote: (state, { payload }) => {
      state.notes = state.notes.filter(note => note._id !== payload);
    },
    // elimina repetidos
    onCat: (state, { payload }) => {
      //console.log(payload);
      state.categories = payload;
      /*state.categories = state.categories.filter(cat => {
          if(state.notes.categories !== payload ){
            return payload;
          }
      })*/
    },
    onFilterNoteCat: (state, { payload }) => {
      //console.log(payload);
      if(state.categories.includes(payload)){
        state.notes = state.notes.map( note => {
          if(note.category === payload){
            note.stateNote = true;
            return note;
          }else{
            note.stateNote = false;
            return note;
          }
    
        })
      }
    },
  }
});

export const {
  onSetActiveNote,
  onAddNewNote,
  onUpdateNote,
  onDeleteNote,
  onCat,
  onFilterNoteCat,
} = notesSlice.actions;
