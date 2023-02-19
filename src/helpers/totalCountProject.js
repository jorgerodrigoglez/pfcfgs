import { useSelector } from "react-redux";

export const totalCountProject = (category = "") => {
  //console.log(category);
  // redux
  const { notes } = useSelector(state => state.notes);

  //let totalProjectCount = 0;
  //let myTotalProjectsCount = 0;
  let myNewCountCard = [];

  notes.map(note => {
    //console.log(note.category);
    if (note.category === category) {
      let totalSpent = 0;
      totalSpent += note.spent;
      //console.log(totalSpent);
      let totalEntry = 0;
      totalEntry += note.entry;
      //console.log(totalEntry);
      let totalCount = 0;
      totalCount = totalEntry - totalSpent;
      //console.log(totalCount);
      //totalProjectCount +=  totalCount;
      //myTotalProjectsCount += totalProjectCount;

      let noteCountCard = {
        task: note.title,
        spent: note.spent,
        entry: note.entry,
        total: totalCount
        //myTotal: totalProjectCount,
        //myTotalProjects: myTotalProjectsCount,
      };

      return myNewCountCard.push(noteCountCard);
    }
  });

  //console.log({ myNewCountCard });
  return myNewCountCard;
};
