import { useState, useEffect, Fragment } from "react"
import { ProgressSpinner } from 'primereact/progressspinner';
import UserView from './UserView'        

const UsersContainer =() => {
    const[dataUsers, setDataUsers] = useState([]),
    [loadingUsers, setLoadingUsers] = useState(true);
//Async indica que es una funcion asincrona
//Await dice espera hasta que se obtenga toda la data para segui ejecutando el codigo 
//Fetch funcion especifica para llamar una api 
//use effect reaccionador de eventos (disparador a traves de un evento)
//Try intenta hacer esto sino hace lo de catch
    const getDataUsers = async () => {
        try{
        const response = await fetch ("http://localhost:5000/users",
            {
                method: "GET", 
                body: JSON.stringify(loadingUsers),
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            },
        )
        // console.log("response", response)
        if(!response.ok){
            console.log("Hubo un error en la peticion")
        }

        const results = await response.json()
        setDataUsers(results)
        }catch(error){
            console.log("Hubo un error en la peticion",error)
        }finally{
            setLoadingUsers(false)
        }
    }
    
    console.log("dataUsers", dataUsers)
    useEffect(()=>{
        getDataUsers()
    }, [])

    return (
        <UserView loadingUsers={loadingUsers} dataUsers={dataUsers}/>
    )
    //Si no pongo []) al final esto se ejecuta infinitamente
    
    //? : ternario si pasa esto hace esto sino

//Buena constubre cada vez que haga un mapeo uniciar una key 
}
export default UsersContainer