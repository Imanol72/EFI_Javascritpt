import { useState } from 'react'
import Mybutton from './components/MyButton'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersContainer from './components/Ussers/UsersContainer'
import { Menubar } from 'primereact/menubar'
import Home from './components/Home'
import CreateUser from './components/Ussers/CreateUser'
import LoginUser from './components/Ussers/LoginUser'


function App() {
  const [count, setCount] = useState(0)
  
  const items = [
    {label:'Usuarios', icon:'pi pi-users', url:'/usuarios'},
    {label:'Nuevo usuario', icon:'pi pi-user-plus', url:'/nuevo-usuario'},
    {label:'Inicio', icon:'pi pi-home', url:'/'}
  ]


  return (
    <BrowserRouter>
    <Menubar model={items}/>
      <Routes>
      <Route path='/usuarios' element={<UsersContainer/>}/>
      <Route path='/nuevo-usuario' element={<CreateUser/>}/>
      <Route path='/inicio-sesion' element={<LoginUser/>}/>
      <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
