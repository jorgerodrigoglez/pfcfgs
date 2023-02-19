export const colorsNotRep = (notes = []) => {
  
    // creacion de categorias
    const colorsItem= [];
    // creacion de array categorias
    notes.forEach(note => {
      colorsItem.push(note.color);
    });
  
    //console.log(categoriesColor);
  
    // Eliminalos los repetidos categorias
    const noRepCol = new Set(colorsItem);
    const newColors = [...noRepCol];
    //console.log(newCategoriesColor);
  
    return newColors;
  };