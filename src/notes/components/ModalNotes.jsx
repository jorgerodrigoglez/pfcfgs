import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInSeconds, addHours } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

import Swall from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "react-modal";
import { useUiStore, useNotesStore } from "../../hooks";
import { onCat } from "../../store";
import { catNotRep } from "../../helpers";

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
  color: "#8000FF",
  priority: "Sin prioridad",
  stateNote: true
};

// options - select
const options = ["Alta", "Media", "Baja"];
// options --color
const colors = [
  {
    id: 1,
    color: "#BBBB20"
  },
  {
    id: 2,
    color: "#00FF80"
  },
  {
    id: 3,
    color: "#8000FF"
  },
  {
    id: 4,
    color: "#FF8000"
  },
  {
    id: 5,
    color: "#800080"
  },
  {
    id: 6,
    color: "#FF0000"
  },
  {
    id: 7,
    color: "#FF00FF"
  }
];

export const ModalNotes = () => {
  // redux
  const dispatch = useDispatch();
  const { activeNote, categories } = useSelector(state => state.notes);
  //console.log({activeNote});

  const { format } = useSelector(state => state.ui);
  //console.log( format );

  // hooks
  const { isOpenModal, closeModal } = useUiStore();
  const { startSavingNote, notes } = useNotesStore();
  // valores del modal
  const [formValues, setFormValues] = useState(initialForm);
  //const { color } = formValues;
  //console.log(formValues.color);
  //console.log(formValues.category);

  const [inputOpt, setInputOpt] = useState("Select project");
  //console.log(inputOpt);
  // form submmited
  const [formSubmitted, setFormSubmitted] = useState(false);

  // bloquear input color / MOdalNotes
  const [checkInputColor, setCheckInputColor] = useState(false);
  //console.log(checkInputColor);
  
  // introduce nuevas categorias en el store sin repeticion - MenuCat
  const inCategories = catNotRep(notes);
  //console.log(inCategories);
  useEffect(() => {
    dispatch(onCat(inCategories));
  }, [notes]);

  useEffect(() => {
    notes.map(note => {
      inCategories.map(cat => {
        if (note.category === cat) {
          setCheckInputColor(true);
          formValues.color = note.color
        } else {
          setCheckInputColor(false);
        }
      });
    });
  }, [notes]);

  /////////

  // Cambiar los datos del formulario
  useEffect(() => {
    if (activeNote !== null) {
      setFormValues(activeNote);
    }
  }, [activeNote]);

  // cambio de clase css
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues || formValues.title.length > 0
      ? "is-valid"
      : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onCloseModal = () => {
    closeModal();
    // limpia los valores del formulario
    setFormValues(initialForm);
  };

  const onInputChange = ({ target }) => {
    // cambia valores del formulario
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

  // bloquear input color / MOdalNotes
  const changeChecking = e => {
    e.preventDefault();
    setCheckInputColor(false);
    formValues.category = ""; // no lee el valor
  };

  // cambia el color del select color
  const changeInputOpt = e => {
    e.preventDefault();
    //state - selecciona opciones del select
    setInputOpt(e.target.value);
    setCheckInputColor(true);
    // cambia color segun el select
    categories.map( cat => {
      if(inputOpt === cat){
        formValues.category = inputOpt;
        setFormValues({...formValues, cat});
      }
    });
    notes.map( note => {
      if(inputOpt === note.category){
        const updateColor = note.color;
        formValues.color = updateColor;
        //console.log({updateColor});
        setFormValues({...formValues, updateColor});
      }
    })
  };

  const onSubmit = e => {
    e.preventDefault();
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

    if (formValues.category.length <= 0) return;
    //console.log({ formValues });
    // crear arr de datos de formulario en useNotesStore
    startSavingNote(formValues);
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
      {format ? <h1> Editar nota...</h1> : <h1> Nueva nota...</h1>}

      <form onSubmit={onSubmit} className="modal__window--form">
        <div className="row">
          <div className="modal__window--project">
            <label>Proyecto:{formValues.category}</label>
            <input
              type="text"
              //style={{ backgroundColor: color }}
              className="modal__window--project-input"
              placeholder="Proyecto"
              name="category"
              autoComplete="off"
              value={formValues.category}
              onChange={onInputChange}
              disabled={checkInputColor ? "disabled" : null}
              //onClick={changeInputColor}
            />
            <div>
              <button
                id="idCheck"
                className="modal__window--project-checkbox"
                onClick={changeChecking}
              >
                Nuevo proyecto
              </button>
            </div>
          </div>
          <div className="modal__window--project" onChange={changeInputOpt}>
            <label htmlFor="">Select project</label>
            <select
              name="category"
              className="modal__window--project-select"
              onChange={onInputChange}
              value={formValues.category}
            >
              <option>Select project</option>
              { (categories) &&
                categories.map(cat => (
                <option key={uuidv4()} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__window--color">
            <select
              name="color"
              className="modal__window--color"
              onChange={onInputChange}
              value={formValues.color}
              style={{ backgroundColor: formValues.color }}
              disabled={checkInputColor ? "disabled" : null}
            >
              <option>{formValues.color}</option>
              {colors.map(col => (
                <option key={col.id} value={col.color}>
                  {col.color}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="modal__window--title">
            <label>Tarea:</label>
            <input
              type="text"
              className={`modal__window--title-input ${titleClass}`}
              placeholder="Tarea"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
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
            className="modal__window--description"
            placeholder="Descripción"
            rows="2"
            name="description"
            value={formValues.description}
            onChange={onInputChange}
          ></textarea>
        </div>

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

        <div className="align-center">
          <button type="submit" className="modal__window--btn">
            <i className="far fa-save"></i>
            {format ? <span> Editar...</span> : <span> Guardar...</span>}
          </button>
        </div>
      </form>
    </Modal>
  );
};
