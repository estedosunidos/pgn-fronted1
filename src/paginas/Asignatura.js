import React,{useEffect,useState} from "react";
import  {API_ASIGNATURA,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import EditarAsignaturas from "../componentes/asignaturas/EditarAsignaturas";
import CrearAsignaturas from "../componentes/asignaturas/CrearAsignatura";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Asignatura(){
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const borrarasignatura=((asignaturas)=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA+"/"+asignaturas.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("La asignatura no fue eliminada ")
            setShowError(true)
        })
    }
    );
    const editarasignaturas=(()=>{
        setAppState(!appState)
        setEditar(false)

    })
    const mostrareditarasignatura=((asignatura)=>{
        setEditar(true)
        setAsignatura(asignatura)
    })
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[appState]);
    const mostracrearasignatura=(()=>{
        setCrear(true)
    })
    const crearasignaturas=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <button onClick={mostracrearasignatura}>Nuevo</button>
            <TableCustom data={asignaturas} borrar={borrarasignatura} mostrar={mostrareditarasignatura}></TableCustom>
            {editar && <EditarAsignaturas showModal={editar} cancelar={cancelar}   asignatura={asignatura} editar={editarasignaturas}> </EditarAsignaturas>}
            {crear && <CrearAsignaturas  showModal={crear} cancelar={cancelar}   asignatura={asignatura} crear={crearasignaturas}> </CrearAsignaturas>}
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
export default Asignatura