import {Fragment, useRef} from "react"
import {ProgressSpinner} from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';



const UserView = ({loadingUsers, data}) => {

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const deleteUser = (user) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    }

/*      const userData = [
        {username: 'Imanol', isAdmin: false },
        {username: 'Axel', isAdmin: false}
    ] 
 */
    const bodyisAdmin = (rowData) => {
        return (
               <div>
                <Button icon= 'pi pi-pencil' label = "Editar" variant="Primary"/>
                <Button icon= 'pi pi-trash' label = "Eliminar" onClick={deleteUser}/>
               </div>
        )
    }

    const bodyActions = (rowData) => {
        return (
                rowData.isAdmin ?
                <span>Si</span>
                :
                <span>No</span>

        )
    }

    return(
        <Fragment>
            <h1>Listado de usuarios</h1>
            <Button label="Agregar nuevo usuario" icon= "pi pi-user-plus"/>
            {loadingUsers ?
            <ProgressSpinner/> 
            :
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="username" header="Nombre de Usuario"></Column>
                <Column field="isAdmin" body={bodyisAdmin} header="¿Es administrador?"></Column>
                <Column body={bodyActions} header="Actions"></Column>
                
                
            </DataTable>
        }
        <Toast ref={toast} />
        <ConfirmDialog />
    </Fragment>
    )
}
export default UserView