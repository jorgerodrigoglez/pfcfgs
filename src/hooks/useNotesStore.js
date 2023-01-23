import { useSelector, useDispatch } from "react-redux";
import { onAddNewNote, onUpdateNote, onSetActiveNote, onDeleteNote } from "../store";

export const useNotesStore = () => {
  const dispatch = useDispatch();
  const { notes, activeNote, categories, colors } = useSelector(state => state.notes);

  // activar nota -- este evento es para el calendario
  const setActiveEvent = ( event ) => {
    dispatch( onSetActiveNote( event ) );
  }

  // Guardar nota
  const startSavingNote = async note => {

    if(note._id){
      // actualizar
      dispatch(onUpdateNote({ ...note }))
    }else{
      // guardar
      dispatch(onAddNewNote({ ...note, _id: new Date().getTime() }));
    }
  };

  // Eliminar nota
  const startDeletingNote = async id => {
    dispatch(onDeleteNote(id));
  }


  return {
    // propiedades
    notes,
    activeNote,
    categories,
    colors,
    // metodos
    startSavingNote,
    setActiveEvent,
    startDeletingNote,
  };
};
