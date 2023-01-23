import { useDispatch } from "react-redux";
import { onSetActiveNote, onEditFormat } from "../../store";

import { format } from "date-fns";
import { useNotesStore } from "../../hooks";

export const NotePage = ({
  _id,
  title,
  description,
  start,
  end,
  category,
  priority,
  color,
  stateNote,
  onOpenModal
}) => {
  //console.log({ _id, title, description, start, end, category, priority, color });
  //console.log(state);
  const dateStart = format(start, "eee : dd/MM/yy- hh:mm aaa");
  //console.log(dateStart);
  const dateEnd = format(end, "eee : dd/MM/yy- hh:mm aaa");
  //console.log(dateEnd);

  // redux
  const dispatch = useDispatch();

  // hook
  const { startDeletingNote } = useNotesStore();

  const onClickNote = () => {
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

  return (
    <div
      className="note__item"
      style={{ display: stateNote ? "" : "none" }}
    >
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
        <button className="btn-edit" onClick={onClickNote}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className="btn-delete" onClick={deleteNote}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
