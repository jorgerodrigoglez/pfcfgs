import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ModalNotes, NotePage } from "../components";
import { useUiStore, useNotesStore } from "../../hooks";
import { NothingSelected } from "./NothingSelected";
import { onFilterNoteCat, onListAllNotes } from "../../store";
import { MenuCat } from "../../notes/components";

export const NotesPage = () => {
  // useState
  const [colorCat, setColorCat] = useState("");

  // redux
  const dispatch = useDispatch();

  // hooks
  const { openModal } = useUiStore();
  const { notes } = useNotesStore();
  //console.log(notes);

  const onOpenModal = () => {
    openModal();
  };

  // filtro de notas
  const filterNotesCat = e => {
    e.preventDefault();
    const { target } = e;
    //console.log(target.value);
    const currentCategory = target.value;
    // capturar el color de la categoria de la nota
    notes.map(note => {
      if (note.category === currentCategory) {
        setColorCat(note.color);
        //console.log(colorCat);
      }
    });
    //console.log(currentCategory);
    dispatch(onFilterNoteCat(currentCategory));
  };

  // listar todas las categorias
  const allListCategories = e => {
    e.preventDefault();
    setColorCat('#FFFFFF');
    dispatch(onListAllNotes(notes));
  };

  return (
    <>
      <ModalNotes />

      <MenuCat
        filterNotesCat={filterNotesCat}
        allListCategories={allListCategories}
        colorCat={colorCat}
      />

      {notes.length === 0 ? (
        <NothingSelected />
      ) : (
        notes.length > 0 && (
          <ul className="note">
            {notes.map(note => (
              <NotePage
                {...note}
                note={note}
                key={uuidv4()}
                onOpenModal={onOpenModal}
              />
            ))}
          </ul>
        )
      )}
      <button className="btn-plus" onClick={onOpenModal}>
        <i className="far fa-plus"></i>
      </button>
    </>
  );
};
