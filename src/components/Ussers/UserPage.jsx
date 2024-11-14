// UsersPage.js
import { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        headers: { 'Authorization': ` ${token}` },
      });
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserCreated = () => {
    fetchUsers();
    setMessage("Usuario creado exitosamente.");
  };

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${id}/delete`, {
        method: "DELETE",
        headers: { 'Authorization': ` ${token}` },
      });
      
      if (response.ok) {
        fetchUsers();
        setMessage("Usuario eliminado exitosamente.");
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      setMessage("Error al eliminar el usuario.");
    }
  };

  return (
    <div className="container">
      <h4>{editing ? "Editar Usuario" : "Crear Nuevo Usuario"}</h4>
      <CreateUser onUserCreated={handleUserCreated} />
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;