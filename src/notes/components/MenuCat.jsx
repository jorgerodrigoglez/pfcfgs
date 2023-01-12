import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { catNotRep } from "../../helpers";
import { onCat } from "../../store";
import { useNotesStore } from "../../hooks";

export const MenuCat = ({ filterNotesCat }) => {
  // redux
  const dispatch = useDispatch();
  // hook
  const { notes, categories } = useNotesStore();
  
  // helper : crea el array de categorias y elimina elementos repetidos
  const inCategories = catNotRep(notes);
  //console.log(inCategories);

  // introduce nuevas categorias en el store sin repeticion
  useEffect(() => {
    dispatch(onCat(inCategories));
  },[notes]);

  return (
    <>
      <div className="menu">
        {categories &&
          categories.length > 0 &&
          categories.map(cat => (
            <menu className="menu__item" key={cat} onClick={filterNotesCat}>
              <input type="button" value={cat} />
            </menu>
          ))}
      </div>
    </>
  );
};
