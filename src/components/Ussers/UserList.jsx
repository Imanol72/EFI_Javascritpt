// UserList.js
import { Button } from 'primereact/button';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      <h4>Lista de Usuarios</h4>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.username} - {user.is_admin ? "Admin" : "Usuario"}</span>
            <Button icon="pi pi-pencil" className="p-button-warning p-button-sm me-2" onClick={() => onEdit(user.id)} label="Editar" />
            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => onDelete(user.id)} label="Eliminar" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
