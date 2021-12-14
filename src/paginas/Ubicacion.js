import React,{useEffect,useState} from "react";
import  {API_UBICACION,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import CrearUbucacion from "../componentes/Ubicacion/CrearUbicacion";
import EditarUbicacion from "../componentes/Ubicacion/EditarUbicacion";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Ubicacion(){
    const [ubicacions,setUbicacions]=useState([]);
    const [appState,setAppState]=useState(false)
    const [ubicacion,setUbicacion]=useState({})
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const borrarubicacion=((ubicacions)=>{
        const url=process.env.REACT_APP_API_URL+API_UBICACION+"/"+ubicacions.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("La ubicacion no fue eliminado ")
            setShowError(true)
        })
    }
    );

    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_UBICACION;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setUbicacions(repuesta.data);
        })
    },[appState]);

    const mostraeditarubicacion=((ubicacion)=>{
        setEditar(true)
        setUbicacion(ubicacion)
    });

    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarubicacion=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const CrearUbicacion=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }

    const mostrarcrearubicacion=(()=>{
        console.log(1)
        setCrear(true)
    })

    return(
        <div>
            <button onClick={mostrarcrearubicacion}>Nuevo</button>
            <TableCustom data={ubicacions} borrar={borrarubicacion} mostrar={mostraeditarubicacion}></TableCustom>
            {editar && <EditarUbicacion showModal={editar} cancelar={cancelar} ubicacion={ubicacion} editar={editarubicacion}> </EditarUbicacion>}
            {crear && <CrearUbucacion showModal={crear} cancelar={cancelar} crear={CrearUbicacion}></CrearUbucacion>}
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
export default Ubicacion