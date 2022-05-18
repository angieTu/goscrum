import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.styles.css";

export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <img src="/img/GoScrumlogo.png" alt="Logo" />
      <div className="wrapper_right_header">
        <button onClick={() => navigate("/donate")}>Donar</button>
        <div>Tareas creadas: {tasks?.length}</div>
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>X</div>
      </div>
    </header>
  );
};
