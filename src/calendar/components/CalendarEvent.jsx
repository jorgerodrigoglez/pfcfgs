import { useSelector } from "react-redux";

export const CalendarEvent = ({ event }) => {
  console.log({ event });
  const { category, title, description, complete, priorityColor } = event;

  // redux - idem que en NotePage
  const { colorsPriority } = useSelector(state => state.notes);
  // imprimir el texto de la prioridad la targeta
  let itemText = colorsPriority.filter(item => priorityColor === item.color);

  return (
    <div>
      <strong>{category}</strong>
      <p><span>Título:</span>{title}</p>
      <p><span>Descripción:</span>{description}</p>
      <p>{complete ? "Completada" : "No completada"}</p>
      <div style={{ backgroundColor: priorityColor }}>
        <p><span>Prioridad:</span>{itemText[0].text}</p>
      </div>
    </div>
  );
};
