

export const CountList = ({
  category,
  title,
  description,
  color,
  spent,
  entry
  //titleProject
}) => {
  return (

      <li style={{ backgroundColor: color }} className="count__list">
        <div className="count__list--card">
          <h1 className="count__project">{category}</h1>
          <h2 className="count__list--title">Título: {title}</h2>
          <p className="count__list--description">Descripción: {description}</p>
          <div className="row count__list--count">
            <p className="count__list--count-spent">Gasto: {spent}</p>
            <p className="count__list--count-entry">Ingreso:{entry}</p>
          </div>
        </div>
      </li>
  
  );
};
