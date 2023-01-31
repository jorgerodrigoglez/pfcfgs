import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { notesNoRep, colorsNotRep, catNotRep } from "../../helpers";
//import { onCat } from "../../store";
import { useNotesStore } from "../../hooks";
import {
  onListComplete,
  onColor,
  onCat,
  onListCompleteCat,
  onPriorityNotes
} from "../../store";

export const MenuCat = ({ filterNotesCat, allListCategories, colorCat }) => {
  //console.log(colorCat);
  // redux
  const dispatch = useDispatch();
  const { colorsPriority } = useSelector(state => state.notes);
  // hook
  const { notes, categories, colors } = useNotesStore();
  // cambiar el boton de completadas
  const [btnChangeTasks, setBtnChangeTasks] = useState(false);

  // helpers : crea el array de categorias y elimina elementos repetidos
  const inCategories = catNotRep(notes);

  //console.log(inCategories);
  // introduce nuevas categorias en el store sin repeticion
  useEffect(() => {
    dispatch(onCat(inCategories));
  }, [notes]);

  // color categorias
  /*const inColors = colorsNotRep(notes);
  //console.log(inColors);
  // introduce nuevos colores en el store sin repeticion
  useEffect(() => {
    //setColorsCat(inColors);
    dispatch(onColor(inColors));
  }, [notes]);*/

  // elimina las notas repetidas por color y categorias
  let categoriesMap = notesNoRep(notes);

  //console.log(categoriesMap);
  // elimina las notas repetidas
  let deleteRep = categoriesMap.filter((value1, index, array) => {
    //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
    return (
      array.findIndex(
        value2 => JSON.stringify(value2) === JSON.stringify(value1)
      ) === index
    );
  });
  //console.log(deleteRep);

  // listar completadas
  const showTasksComplete = e => {
    e.preventDefault();
    setBtnChangeTasks(!btnChangeTasks);

    // selecciona completadas y no de todas las categorias
    if (btnChangeTasks) {
      dispatch(onListComplete(btnChangeTasks));
    } else {
      dispatch(onListComplete(btnChangeTasks));
    }

    // selecciona las notas completadas y no completadas de una categoria
    notes.map(({ color }) => {
      //console.log(color,colorCat);
      if (color === colorCat) {
        let objectFilter = {
          colorCat: color,
          stateBtn: btnChangeTasks
        };
        //console.log(objectFilter);
        dispatch(onListCompleteCat(objectFilter));
      }
    });
  };

  // listar notas por prioridad
  const setPriority = e => {
    e.preventDefault();
    //console.log(colorsPriority);
    dispatch(onPriorityNotes());
  };

  return (
    <>
      <div className="menu">
        <div className="menu__item">
          <button
            style={{ backgroundColor: colorCat }}
            onClick={allListCategories}
            className="menu__item--all"
          >
            All
          </button>

          <input
            type="button"
            className="menu__item--priority"
            //value={btnChangeTasks ? "No Completadas" : "Completadas"}
            value="Prioridad"
            onClick={setPriority}
          />
          <input
            style={{ backgroundColor: colorCat }}
            type="button"
            onClick={showTasksComplete}
            className="menu__item--complete"
            value={btnChangeTasks ? "No Completadas" : "Completadas"}
            //disabled={colorCat ? null : "disabled"}
          />

          {/* <input
            style={{ backgroundColor: colorCat }}
            type="button"
            onClick={showTasksComplete}
            className="menu__item--complete"
            value={btnChangeTasks ? "No Completadas" : "Completadas"}
            disabled={colorCat ? null : "disabled"}
          /> */}

          {categories &&
            categories.length > 0 &&
            deleteRep.map(cat => (
              <menu
                key={uuidv4()}
                className="menu__item--categories"
                onClick={filterNotesCat}
                style={{ backgroundColor: cat.col }}
              >
                <input type="button" value={cat.cat} />
              </menu>
            ))}
        </div>
      </div>
    </>
  );
};
