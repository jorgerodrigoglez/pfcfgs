import { useState, useEffect } from "react";
import { formatCurrency } from "../../helpers";

export const CountTotalProjects = ({ notes }) => {
  //console.log(notes);
  const [myTotalProjects, setMyTotalProjects] = useState(0);
  //console.log(myTotalProjects);

  useEffect(() => {
    let myTotalSpent = 0;
    let myTotalEntry = 0;
    let myTotalProjectsCount = 0;

    notes.forEach(({ spent, entry }) => {
      myTotalSpent += Number(spent);
      myTotalEntry += Number(entry);
      myTotalProjectsCount = myTotalEntry - myTotalSpent;
    });

    // cambia el estado del acomulador
    setMyTotalProjects(myTotalProjectsCount);
  }, [myTotalProjects]);

  return (
    <p className="total__card--mytotal-projects">
      {notes.length > 0 && (
        <strong>Total:{formatCurrency(myTotalProjects)}</strong>
      )}
    </p>
  );
};
