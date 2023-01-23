export const catNotRep = (notes = []) => {
  
  // creacion de categorias
  const categoriesColor = [];
  // creacion de array categorias
  notes.forEach(note => {
    categoriesColor.push(note.category);
  });

  //console.log(categoriesColor);

  // Eliminalos los repetidos categorias
  const noRepCat = new Set(categoriesColor);
  const newCategoriesColor = [...noRepCat];
  //console.log(newCategoriesColor);

  return newCategoriesColor;
};
