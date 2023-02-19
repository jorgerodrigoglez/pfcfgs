import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInSeconds, addHours } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import Swall from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "react-modal";
import { useUiStore, useNotesStore } from "../../hooks";
//import { onCat } from "../../store";
//import { catNotRep } from "../../helpers";

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
  color: "#FF8000",
  priority: 0,
  priorityColor: "#FFF",
  stateNote: true,
  complete: false,
  spent: 0,
  entry: 0
};

// options --color
const colors = [
  {
    id: 1,
    color: "#FF0000",
    name: "Rojo",
    class: "rojo"
  },
  {
    id: 2,
    color: "#00FF00",
    name: "Verde",
    class: "verde"
  },
  {
    id: 3,
    color: "#0000FF",
    name: "Azul",
    class: "azul"
  },
  {
    id: 4,
    color: "#00FFFF",
    name: "Cyan",
    class: "cyan"
  },
  {
    id: 5,
    color: "#FF00FF",
    name: "Magenta",
    class: "magenta"
  },
  {
    id: 6,
    color: "#FFFF00",
    name: "Amarillo",
    class: "amarillo"
  },
  {
    id: 7,
    color: "#FF8000",
    name: "Naranja",
    class: "naranja"
  },
  {
    id: 8,
    color: "#800000",
    name: "Marrón",
    class: "marron"
  },
  {
    id: 9,
    color: "#00FF80",
    name: "Turquesa",
    class: "turquesa"
  },
  {
    id: 10,
    color: "#BBBB20",
    name: "Oro",
    class: "oro"
  }
];

export const ModalNotes = () => {
  // redux
  const dispatch = useDispatch();
  const { activeNote, categories, colorsPriority } = useSelector(
    state => state.notes
  );
  //console.log({colorsPriority});

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
  //console.log(formValues.priority);

  const [inputOpt, setInputOpt] = useState("Select project");
  //console.log(inputOpt);
  // form submmited
  const [formSubmitted, setFormSubmitted] = useState(false);
  // bloquear input color / MOdalNotes
  const [checkInputColor, setCheckInputColor] = useState(false);
  //console.log(checkInputColor);

  // introduce nuevas categorias en el store sin repeticion - MenuCat
  //const inCategories = catNotRep(notes);
  //console.log(inCategories);
  /*useEffect(() => {
    dispatch(onCat(inCategories));
  }, [notes]);*/

  useEffect(() => {
    notes.map(note => {
      categories.map(cat => {
        if (note.category === cat) {
          setCheckInputColor(true);
          formValues.color = note.color;
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
    // añade color al select de prioridades
    colorsPriority.map(col => {
      if (formValues.priorityColor === col) {
        let colPri = col;
      }
    });
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
    categories.map(cat => {
      if (inputOpt === cat) {
        formValues.category = inputOpt;
        setFormValues({ ...formValues, cat });
      }
    });
    // Hay que modificar
    notes.map(note => {
      if (inputOpt === note.category) {
        const updateColor = note.color;
        formValues.color = updateColor;
        //console.log({updateColor});
        setFormValues({ ...formValues, updateColor });
      }
    });
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
    // validaciones
    if (formValues.category.length <= 0) return;
    if (formValues.priorityColor === "") return;
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
              //style={{ backgroundColor: formValues.color }}
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
                style={{ display: checkInputColor ? "" : "none" }}
              >
                {!format ? (
                  <span> Nuevo Proyecto</span>
                ) : (
                  <span> Desbloquear</span>
                )}
              </button>
            </div>
          </div>
          <div className="modal__window--project" onChange={changeInputOpt}>
            <label>Select project</label>
            <select
              name="category"
              className="modal__window--project-select"
              onChange={onInputChange}
              value={formValues.category}
            >
              <option>Select project</option>
              {categories &&
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
              <option>Selecciona color</option>
              {colors.map(col => (
                <option key={col.id} value={col.color} className={col.class}>
                  {col.name}
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
              name="priorityColor"
              className="modal__window--priority-input"
              onChange={onInputChange}
              value={formValues.priorityColor}
              style={{ backgroundColor: formValues.priorityColor }}
            >
              <option>--Selecciona--</option>
              {colorsPriority.map(opt => (
                <option key={opt.id} value={opt.color} className={opt.class}>
                  {opt.text}
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

        <div className="row">
          <div className="modal__window--count">
            <span className="modal__window--count--label">Gasto:</span>
            <input
              type="number"
              className="modal__window--count-input-spent"
              placeholder="Gasto"
              name="spent"
              autoComplete="off"
              value={formValues.spent}
              onChange={onInputChange}
            />
          </div>
          <div className="modal__window--count">
          <span className="modal__window--count--label">Ingreso:</span>
            <input
              type="number"
              className="modal__window--count-input-spent"
              placeholder="Ingreso"
              name="entry"
              autoComplete="off"
              value={formValues.entry}
              onChange={onInputChange}
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
