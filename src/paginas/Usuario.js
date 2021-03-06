import React,{useEffect,useState} from "react";
import  {API_USUARIO,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import EditarUsuario from "../componentes/usuario/EditaUsuario";
import CrearUsuario from "../componentes/usuario/CrearUsuario";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Usuario(){
    const [usuarios,setUsuarios]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [usuario,setUsuario]=useState({})
    const [crear,setCrear]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const borrarusuario=((usuario)=>{
        const url=process.env.REACT_APP_API_URL+API_USUARIO+"/"+usuario.Documento;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("El usuario no fue eliminado ")
            setShowError(true)
        })
    }
    );
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_USUARIO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setUsuarios(repuesta.data);
        })
    },[appState]);
    const mostraeditarusuario=((usuario)=>{
        setEditar(true)
        setUsuario(usuario)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarusuario=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearusuario=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearusuario=(()=>{
        setCrear(true)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <button onClick={mostrarcrearusuario}>Nuevo</button>
           <TableCustom data={usuarios} borrar={borrarusuario} mostrar={mostraeditarusuario}></TableCustom>
           {editar && <EditarUsuario  showModal={editar}  cancelar={cancelar} usuario={usuario} editar={editarusuario} mostrar={mostraeditarusuario}> </EditarUsuario>}
           {crear && <CrearUsuario showModal={crear} cancelar={cancelar} crear={crearusuario}></CrearUsuario>}
           {showError && <Dialog onClose={handleClose} open={showError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-error">{textError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>}
        </div>
    )
}
export default Usuario