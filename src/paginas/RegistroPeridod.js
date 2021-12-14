import React,{useState,useEffect} from "react"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import  {API_PERIODO,cabeceras} from "../store/constante"
import Editarperiodo from "../componentes/Periodo/EditarPeriodo";
import CrearPeriodo from "../componentes/Periodo/CrearPeriodo";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function RegistroPeridod(){
    const [appState,setAppState]=useState(false)
    const [crear,setCrear]=useState(false)
    const [editar,setEditar]=useState(false)
    const [periodo,setPeriodo]=useState({})
    const [periodos,setPeriodos]=useState([])
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const borrarperiodo=((periods)=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/"+periods.IdPeriodo;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("El periodo  no fue eliminada ")
            setShowError(true)
        })
    }
    );
    const editarperiodo=(()=>{
        setAppState(!appState)
        setEditar(true)

    })
    const mostraeditarperiodo=((periodo)=>{
        setEditar(true)
        setPeriodo(periodo)
    });

    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setPeriodos(repuesta.data);
        })
    },[appState]);
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const crearperiodo=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostracrearperiodo=(()=>{
        setCrear(true)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <h1>Registro periodo</h1>
            <button onClick={mostracrearperiodo}>Nuevo</button>
            <TableCustom data={periodos} mostrar={mostraeditarperiodo} borrar={borrarperiodo}></TableCustom>
            {editar && <Editarperiodo showModal={editar} cancelar={cancelar}   periodo={periodo} editar={editarperiodo}> </Editarperiodo>}
            {crear && <CrearPeriodo showModal={crear} cancelar={cancelar}   periodo={periodo} crear={crearperiodo}> </CrearPeriodo>}
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
export default RegistroPeridod