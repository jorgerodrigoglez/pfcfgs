import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { notesNoRep } from "../../helpers";
//import { onCat } from "../../store";
import { useNotesStore } from "../../hooks";
import { onListComplete } from "../../store";

export const MenuCat = ({ filterNotesCat, allListCategories }) => {
  // cambiar el boton de completadas
  const [btnChangeTasks, setBtnChangeTasks] = useState(false);
  // redux
  const dispatch = useDispatch();
  // hook
  const { notes, categories } = useNotesStore();

  // helpers : crea el array de categorias y elimina elementos repetidos
  //console.log(colorItemCat);
  //const inCategories = catNotRep(notes);

  // color categorias
  //const inColors = colorCat(notes);

  // introduce nuevas categorias en el store sin repeticion
  /*useEffect(() => {
    dispatch(onCat(inCategories));
  }, [notes]);*/
  // introduce nuevos colores en el store sin repeticion
  /*useEffect(() => {
    //setColorsCat(inColors);
    dispatch(onColor(inColors));
  }, [notes]);*/

  // elimina las notas repetidas por color y categorias
  let categoriesMap = notesNoRep(notes);

  //console.log(categoriesMap);

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

    if (btnChangeTasks) {
      dispatch(onListComplete(btnChangeTasks));
    } else {
      dispatch(onListComplete(btnChangeTasks));
    }
  };

  return (
    <>
      <div className="menu">
        <div className="menu__item">
          <button onClick={allListCategories} className="menu__item--all">
            All
          </button>

          <input
            type="button"
            onClick={showTasksComplete}
            className="menu__item--complete"
            //value={btnChangeTasks ? "No Completadas" : "Completadas"}
            value="No completadas"
          />

          <input
            type="button"
            onClick={showTasksComplete}
            className="menu__item--complete"
            //value={btnChangeTasks ? "No Completadas" : "Completadas"}
            value="Completadas"
          />

          <input
            type="button"
            className="menu__item--priority"
            //value={btnChangeTasks ? "No Completadas" : "Completadas"}
            value="Prioridad"
          />

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
