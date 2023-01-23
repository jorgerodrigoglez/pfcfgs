import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { catNotRep, notesNoRep } from "../../helpers";
import { onCat } from "../../store";
import { useNotesStore } from "../../hooks";

export const MenuCat = ({ filterNotesCat, allListCategories }) => {
  // redux
  const dispatch = useDispatch();
  // hook
  const { notes, categories } = useNotesStore();

  // helpers : crea el array de categorias y elimina elementos repetidos
  //console.log(colorItemCat);
  const inCategories = catNotRep(notes);

  // color categorias
  //const inColors = colorCat(notes);

  // introduce nuevas categorias en el store sin repeticion
  useEffect(() => {
    dispatch(onCat(inCategories));
  }, [notes]);
  // introduce nuevos colores en el store sin repeticion
  /*useEffect(() => {
    //setColorsCat(inColors);
    dispatch(onColor(inColors));
  }, [notes]);*/

  // elimina las notas repetidas por color y categorias
  const categoriesMap = notesNoRep(notes);
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

  return (
    <>
      <div className="menu">
        <div className="menu__item">
          <button onClick={allListCategories} className="menu__item">
            All
          </button>
          {categories &&
            categories.length > 0 &&
            deleteRep.map(cat => (
              <menu
                key={uuidv4()}
                className="menu__item"
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
