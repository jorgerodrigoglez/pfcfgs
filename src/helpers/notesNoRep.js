export const notesNoRep = (notes = []) => {
  //console.log(notes);

  let newNoteCat = [];

  notes.map(note => {
    note.category;
    note.color;

    let newNote = {
      cat: note.category,
      col: note.color
    };

    //console.log(newNote);
    newNoteCat.push(newNote);
  });


  //console.log(newNoteCat);

  return newNoteCat;
};
