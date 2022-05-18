import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import "react-loading-skeleton/dist/skeleton.css";

import "./Tasks.styles.css";
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from "../../../store/actions/tasksActions";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import { TaskForm } from "../../TaskForm/TaskForm";

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState(false);
  const [search, setSearch] = useState("");

  const { isPhone } = useResize();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""));
  }, [tasksFromWho]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search)
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    else {
      setRenderList(list);
    }
  }, [search]);

  const handleDelete = (_id) => dispatch(deleteTask(_id));

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));

  if (error) return <div>Hay un error</div>;

  const renderAllCards = () => {
    return renderList?.map((e) => (
      <Card
        key={e._id}
        data={e}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((e) => (
        <Card
          key={e._id}
          data={e}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  const handleChangeImportance = (event) => {
    if (
      event.currentTarget.value === "ALL" ||
      event.currentTarget.value === ""
    ) {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
    }
  };

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis Tareas</h2>
          </div>{" "}
          <div className="filters">
            <div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  onChange={(event) => {
                    setTasksFromWho(event.currentTarget.value);
                  }}
                >
                  <FormControlLabel
                    value="ALL"
                    control={<Radio />}
                    label="Todas"
                  />
                  <FormControlLabel
                    value="ME"
                    control={<Radio />}
                    label="Mis tareas"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título"
                onChange={handleSearch}
              />
            </div>
            <div>
              <select name="importance" onChange={handleChangeImportance}>
                <option value="">Seleccionar una prioridad</option>
                <option value="ALL">Todas</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? (
              <>
                {" "}
                <Skeleton height={90} />
              </>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : !renderList?.length ? (
            <div>No hay tareas creadas</div>
          ) : loading ? (
            <Skeleton height={190} />
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                {renderColumnCards("NEW")}
              </div>
              <div className="list">
                <h4>En Proceso</h4>
                {renderColumnCards("IN PROGRESS")}
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                {renderColumnCards("FINISHED")}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
