import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";

const tempNotes = {
  _id: 0,
  title: "",
  description: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  category: "",
  color: "#FF0000",
  priority: "Sin prioridad",
  stateNote: true,
  complete: false
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [
      //tempNotes
    ],
    activeNote: null,
    categories: []
    //colors: []
  },
  reducers: {
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
    },
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.activeNote = null;
      state.categories.push(payload.category);
      // colorProject - Category
      //state.colorProjects.push(payload.color);
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
    // elimina repetidos
    /*onColor: (state, { payload }) => {
      //console.log(payload);
      state.colors = payload;
    },*/
    onFilterNoteCat: (state, { payload }) => {
      //console.log(payload);
      if (state.categories.includes(payload)) {
        state.notes = state.notes.map(note => {
          if (note.category === payload) {
            note.stateNote = true;
            return note;
          } else {
            note.stateNote = false;
            return note;
          }
        });
      }
    },
    onListAllNotes: state => {
      state.notes = state.notes.map(note => {
        note.stateNote = true;
        return note;
      });
    },
    onComplete: (state, { payload }) => {
      //console.log(payload);
      state.notes = state.notes.map(note => {
        if (note._id === payload._id) {
          note.complete = payload.complete;
          return note;
        } else {
          return note;
        }
      });
    },
    onListComplete: (state, { payload }) => {
      //console.log(payload);
      state.notes = state.notes.map(note => {
        if (note.complete === payload) {
          note.stateNote = false;
          return note;
        } else {
          note.stateNote = true;
          return note;
        }
      });
    }
  }
});

export const {
  onSetActiveNote,
  onAddNewNote,
  onUpdateNote,
  onDeleteNote,
  onCat,
  //onColor,
  onFilterNoteCat,
  onListAllNotes,
  onComplete,
  onListComplete
} = notesSlice.actions;
