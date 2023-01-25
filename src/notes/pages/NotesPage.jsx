//import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ModalNotes, NotePage } from "../components";
import { useUiStore, useNotesStore } from "../../hooks";
import { NothingSelected } from "./NothingSelected";
import { onFilterNoteCat, onListAllNotes, onListComplete } from "../../store";
import { MenuCat } from "../../notes/components";

export const NotesPage = () => {

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
    //console.log(currentCategory);
    dispatch(onFilterNoteCat(currentCategory));
  };

  // listar todas las categorias
  const allListCategories = () => {
    dispatch(onListAllNotes(notes));
  };

  return (
    <>
      <ModalNotes />

      <MenuCat
        filterNotesCat={filterNotesCat}
        allListCategories={allListCategories}
      />

      {notes.length === 0 ? (
        <NothingSelected />
      ) : (
        notes.length > 0 && (
          <ul className="note">
            { notes.map(note => (
                <NotePage {...note} note={note} key={uuidv4()} onOpenModal={onOpenModal}  />
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
