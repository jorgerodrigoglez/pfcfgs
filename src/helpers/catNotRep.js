export const catNotRep = (notes = []) => {
  
  // creacion de categorias
  const categoriesItem= [];
  // creacion de array categorias
  notes.forEach(note => {
    categoriesItem.push(note.category);
  });

  //console.log(categoriesColor);

  // Eliminalos los repetidos categorias
  //const noRepCat = new Set(categoriesItem);
  //const newCategories = [...noRepCat];
  //console.log(newCategoriesColor);

  return categoriesItem;
};
