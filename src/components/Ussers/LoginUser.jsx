import { Formik } from "formik"
import * as Yup from 'yup'

const LoginUser = () => {

    const onLoginUser = async (values) => {
        //btoa para configurar un string en base 64
        const bodyUserLogin = btoa(`${values.username}:${values.password}`)

        const response = await fetch ('http://localhost:5000/login',{
            method:'POST',
            headers:{
                "Authorization": `Basic ${bodyUserLogin}`,
                
            }
        })

        if (!response.ok) {
            console.log("Hubo un error en la llamada a la api")
        }

        const data=await response.json()

        localStorage.setItem('token', JSON.stringify(data.Token))

        console.log(data.Token)
    }

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Este campo es requerido')
            .max(50,'El username no debe execeder 50 caracteres'),
        password: Yup.string()
            .required('Este campo es requerido')
            .max(50,'La contraseña no debe execeder 50 caracteres')
    })

    return (
        <Formik
            initialValues={{password: '', username: '' }}
            validationSchema={ValidationSchema}
            >
            {({
                values,
                errors,
                touched,/*Detectar cuando la persona hace click*/
                handleChange,
                handleBlur,/*Cuando la persona deja de hacer foco sobre un imput*/
                isSubmitting,
                /* and other goodies */
                isValid
            }) => (
                <form>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                />
                {errors.username && touched.username && errors.username}
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button onClick={()=>onLoginUser(values)} type="button" disabled={values.password === '' || values.username === '' || !isValid}>
                    Iniciar Sesion
                </button>
                </form>
            )}
        </Formik>
    )

}
export default LoginUser;