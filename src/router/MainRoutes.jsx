import { Routes, Route, Navigate } from "react-router-dom";
import { NavbarMain } from "../ui/NavbarMain";
import { NotesPage } from "../notes/pages";
import { CalendarPage } from "../calendar/pages";

export const MainRoutes = () => {

  return (
    
    <div className="main__layout">

      <NavbarMain />

      <Routes>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />

        <Route path="/" element={<Navigate to="/notes" />} />
      </Routes>
    </div>
  );
};
