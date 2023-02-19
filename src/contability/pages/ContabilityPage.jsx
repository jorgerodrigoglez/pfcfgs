import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { CountList, CountTotalProjects } from "../components";
import { CountTotal } from "../components/CountTotal";
import { notesNoRep } from "../../helpers";

export const ContabilityPage = () => {
  // redux
  const { notes, categories } = useSelector(state => state.notes);
  // helper _ devuelve objeto con categoria y color de la nota
  let newNoteCount = notesNoRep(notes);
  // elimina los objetos repetidos
  let deleteRepByCount = newNoteCount.filter((value1, index, array) => {
    //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
    return (
      array.findIndex(
        value2 => JSON.stringify(value2) === JSON.stringify(value1)
      ) === index
    );
  });

  return (
    <div>
      {/* {notes.length > 0 && (
        <ul className="count">
          {notes.map(note => (
            <CountList
              {...note}
              key={uuidv4()} 
            />
          ))}
        </ul>
      )} */}

      {categories.length > 0 && (
        <ul className="total">
          {deleteRepByCount.map(catcol => (
            <CountTotal
              catcol={catcol}
              //notes={notes}
              key={uuidv4()}
            />
          ))}
        </ul>
      )}
      <div>
        <CountTotalProjects notes={notes} key={uuidv4()} />
      </div>
    </div>
  );
};
