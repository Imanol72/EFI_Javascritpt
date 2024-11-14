// CreateUser.js
import { Formik } from "formik";
import * as Yup from 'yup';
import { Button } from 'primereact/button';

const CreateUser = ({ onUserCreated }) => {
  const token = localStorage.getItem("token");

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Este campo es requerido')
      .max(50, 'El username no debe ser mayor a 50 caracteres'),
    password: Yup.string()
      .required('Este campo es requerido')
      .max(50, 'La contraseña no debe ser mayor a 50 caracteres'),
    admin: Yup.number()
      .required('Este campo es requerido')
      .oneOf([0, 1], 'Debe ser 1 para admin o 0 para usuario')
  });

  const RegisterUser = async (values, { resetForm }) => {
    const bodyRegisterUser = {
      username: values.username,
      password: values.password,
      is_admin: parseInt(values.admin),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        body: JSON.stringify(bodyRegisterUser),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` ${token}`
        }
      });

      if (response.ok) {
        resetForm();
        onUserCreated();
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', admin: 0 }}
      validationSchema={ValidationSchema}
      onSubmit={RegisterUser}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div>
            <select
              name="admin"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.admin}
            >
              <option value={0}>Usuario</option>
              <option value={1}>Administrador</option>
            </select>
            {errors.admin && touched.admin && (
              <div className="text-danger">{errors.admin}</div>
            )}
          </div>
          <Button label="Crear Usuario" type="submit" disabled={!isValid} className="p-button-success" />
        </form>
      )}
    </Formik>
  );
};

export default CreateUser;