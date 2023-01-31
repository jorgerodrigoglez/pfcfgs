export const colorsNotRep = (notes = []) => {
  
    // creacion de categorias
    const colorsItem= [];
    // creacion de array categorias
    notes.forEach(note => {
      colorsItem.push(note.color);
    });
  
    //console.log(categoriesColor);
  
    // Eliminalos los repetidos categorias
    //const noRepCat = new Set(categoriesItem);
    //const newCategories = [...noRepCat];
    //console.log(newCategoriesColor);
  
    return colorsItem;
  };