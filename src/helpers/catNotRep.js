

export const catNotRep = (notes = [] ) => {

  // creacion de categorias
  const categoriesMenu = [];
  // creacion de array
  notes.forEach(note => {
    categoriesMenu.push(note.category);
  });

  /*categories.forEach(cat => {
    categoriesMenu.push(cat);
  })*/

  //console.log(categoriesMenu);
  // Eliminalos los repetidos
  const noRep = new Set(categoriesMenu);
  const newCategories = [...noRep];
  //console.log(newCategories);
  return newCategories;
};
