import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInSeconds, addHours } from "date-fns";

import Swall from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "react-modal";
import { useUiStore, useNotesStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

const initialForm = {
  title: "",
  description: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  category: "",
  color: "",
  priority: "Sin prioridad",
  stateNote: true
};


// options - select
const options = ["Alta", "Media", "Baja"];

export const ModalNotes = () => {
  // redux
  const dispatch = useDispatch();
  const { activeNote } = useSelector( state => state.notes );
  //console.log({activeNote});
  const { format } = useSelector( state => state.ui );
  //console.log( format );

  // hooks
  const{ isOpenModal, closeModal } = useUiStore();
  const{ startSavingNote } = useNotesStore();
  // valores del modal
  const [formValues, setFormValues] = useState( initialForm );
  // form submmited
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cambiar los datos del formulario
  useEffect(() => {
    if(activeNote !== null ){
      setFormValues(activeNote);
    }
  }, [activeNote]);


  // cambio de clase css
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return ( formValues ) || formValues.title.length > 0 
      ? 'is-valid'
      : 'is-invalid'

  }, [formValues.title, formSubmitted]);

  const onCloseModal = () => {
    closeModal();
      // limpia los valores del formulario
      setFormValues(initialForm);
  }

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swall.fire(
        "Las fechas no son correctas",
        "Revisa las fechas ingresadas",
        "error"
      );
      return;
    }

    if (formValues.title.length <= 0) return;
    //console.log({ formValues });
    // crear arr de datos de formulario en useNotesStore
    startSavingNote( formValues );
    // cierra el modal
    onCloseModal();
    setFormSubmitted(false);
    // limpia los valores del formulario
    setFormValues(initialForm);
    
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal__window"
      closeTimeoutMS={200}
    >
      {
        (format) ?  <h1> Editar nota...</h1> : <h1> Nueva nota...</h1>
      }
    

      <form onSubmit={onSubmit} className="modal__window--form">
        <div className="row">
          <div className="modal__window--date-picker">
            <label>Inicio:</label>
            <DatePicker
              selected={formValues.start}
              className="modal__window--date-picker-input"
              onChange={event => onDateChange(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="modal__window--date-picker">
            <label>Fin:</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className="modal__window--date-picker-input"
              onChange={event => onDateChange(event, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <div className="modal__window--title">
          <label>Titulo:</label>
          <input
            type="text"
            className={`modal__window--title-input ${ titleClass }`}
            placeholder="Título"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
        </div>

        <div className="row">
          <div className="modal__window--category">
            <label>Categoria:</label>
            <input
              type="text"
              className="modal__window--category-input"
              placeholder="Categoría"
              name="category"
              autoComplete="off"
              value={formValues.category}
              onChange={onInputChange}
            />
            <div className="modal__window--color">
              <input
                type="color"
                name="color"
                value={formValues.color}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="modal__window--priority">
            <label>Prioridad:</label>
            <select
              name="priority"
              className="modal__window--priority-input"
              onChange={onInputChange}
              value={formValues.priority}
            >
              <option>Sin prioridad</option>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal__window--notes">
          <label>Descripcion:</label>
          <textarea
            type="text"
            className="modal__window--notes-input"
            placeholder="Descripción"
            rows="2"
            name="description"
            value={formValues.description}
            onChange={onInputChange}
          ></textarea>
        </div>

        <div className="align-right">
          <button type="submit" className="modal__window--btn">
            <i className="far fa-save"></i>
            {
              (format) ?  <span> Editar...</span> : <span> Guardar...</span>
            }
          </button>
        </div>
      </form>
    </Modal>
  );
};
