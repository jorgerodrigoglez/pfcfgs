import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onSetActiveNote, onEditFormat, onComplete } from "../../store";

import { format } from "date-fns";
import { useNotesStore } from "../../hooks";

export const NotePage = ({
  note,
  _id,
  title,
  description,
  start,
  end,
  category,
  priority,
  color,
  stateNote,
  complete,
  onOpenModal
}) => {
  //console.log({ _id, title, description, start, end, category, priority, color });
  //console.log(state);
  //console.log(complete);
  //console.log(note);
  const dateStart = format(start, "eee : dd/MM/yy- hh:mm aaa");
  //console.log(dateStart);
  const dateEnd = format(end, "eee : dd/MM/yy- hh:mm aaa");
  //console.log(dateEnd);

  // redux
  const dispatch = useDispatch();

  // hook
  const { startDeletingNote } = useNotesStore();

  const onEditNote = () => {
    dispatch(
      onSetActiveNote({
        _id,
        title,
        description,
        start,
        end,
        category,
        priority,
        color,
        stateNote
      })
    );
    // abre el modal
    onOpenModal();
    // edita los textos del modal
    dispatch(onEditFormat());
  };

  const deleteNote = e => {
    e.preventDefault();
    //console.log(_id);
    startDeletingNote(_id);
  };

  // mostrar u ocultar completadas
  const completeTask = e => {
    //console.log(_id,complete,note);
    e.preventDefault();
    // crea el objeto y cambia su valor
    const newComplete = {
      ...note,
      complete: !note.complete
    };

    dispatch(onComplete(newComplete));
  };

  return (
    <li className="note__item" style={{ display: stateNote ? "" : "none" }}>
      <div className="note__item__check" onClick={completeTask}>
        <p htmlFor="checkComplete">
          {complete ? "Completada" : "No Completada"}
        </p>
      </div>

      <div style={{ backgroundColor: color }}>
        <div className="note__item__category">
          <span>{category}</span>
        </div>

        <div className="note__item__body">
          <h1 className="note__item__title">{title}</h1>
          <p className="note__item__description">{description}</p>
        </div>

        <div className="note__item__priority">
          <span>Prioridad:</span> {priority}
        </div>

        <div className="note__item__date">
          <div className="note__item__date--start">
            <span>De:</span> {dateStart}
          </div>
          <div className="note__item__date--end">
            <span>A:</span> {dateEnd}
          </div>
        </div>
      </div>

      <div className="note__item__delete" style={{ backgroundColor: color }}>
        <button className="btn-edit" onClick={onEditNote}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className="btn-delete" onClick={deleteNote}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};
