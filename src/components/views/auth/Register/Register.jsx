import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../Auth.styles.css";

const { REACT_APP_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_ENDPOINT}auth/data`).then((response) =>
      response.json().then((data) => setData(data.result))
    );
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const required = "* Campo obligatorio";
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad de caracteres minima es 4")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch(`${REACT_APP_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, { replace: true })
      );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            value={values.userName}
            onChange={handleChange}
            className={errors.userName && touched.userName ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={errors.password && touched.password ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email && touched.email ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="Perteneces a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label>Por favor ingrese el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Seleccionar rol</option>
            {data?.Rol?.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Seleccionar continente</option>
            {data?.continente?.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label>Region</label>
            <select
              name="region"
              onChange={handleChange}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
              onBlur={handleBlur}
            >
              <option value="">Seleccionar región</option>
              {data?.region?.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}

        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login"> Iniciar Sesión </Link>
        </div>
      </form>
    </div>
  );
};
