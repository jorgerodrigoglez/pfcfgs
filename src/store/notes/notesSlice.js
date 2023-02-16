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
  color: "#FF8000",
  priority: 0,
  priorityColor:"#FFF",
  stateNote: true,
  complete: false,
  //check: false
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [
      //tempNotes
    ],
    activeNote: null,
    categories: [],
    colors: [],
    colorsPriority: [
      {
        id: 5,
        color: '#FFF',
        text: 'Sin prioridad',
        class: 'sin-prioridad'
      },
      {
        id: 4,
        // cyan
        color: '#00FFFF',
        text: 'Baja',
        class: 'baja'
      },
      {
        id: 3,
        // amarillo
        color: '#FFFF00',
        text: 'Media',
        class: 'media'
      },
      {
        id: 2,
        // naranja
        color: '#FF8000',
        text: 'Alta',
        class: 'alta'
      },
      {
        id: 1,
        // rojo
        color: '#FF0000',
        text: 'Urgente',
        class: 'urgente'
      },
    ],
    //notesPriorities: [],
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
    onColor: (state, { payload }) => {
      //console.log(payload);
      state.colors = payload;
    },

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
    },
    onListCompleteCat: (state, { payload }) => {
      //console.log({payload});
      // Idem que onFilterNoteCat, pero con modificaciones 
      // se requiere el noteState, note.complete y el note.color
      state.notes = state.notes.filter(note => {
        if (note.color === payload.colorCat && note.complete === !payload.stateBtn) {
          note.stateNote = true;
          return note;
        } else {
          note.stateNote = false;
          return note;
        }
      });
    },

    onPriorityNotes: (state) => {
      //console.log(payload);
      state.notes.map( note => {

        if(note.priorityColor === '#FF0000'){
          note.priority = 1;
        }
        if(note.priorityColor === '#FF8000'){
          note.priority = 2;
        }
        if(note.priorityColor === '#FFFF00'){
          note.priority = 3;
        }
        if(note.priorityColor === '#00FFFF'){
          note.priority = 4;
        }
        if(note.priorityColor === '#FFF'){
          note.priority = 5;
        }

        state.notes === state.notes.sort((a,b) => a.priority - b.priority);
        
      })
    },
  }
});

export const {
  onSetActiveNote,
  onAddNewNote,
  onUpdateNote,
  onDeleteNote,
  onCat,
  onColor,
  onFilterNoteCat,
  onListAllNotes,
  onComplete,
  onListComplete,
  onListCompleteCat,
  onPriorityNotes,
} = notesSlice.actions;
