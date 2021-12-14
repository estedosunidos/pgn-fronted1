import React,{useEffect,useState} from "react";
import  {API_CARRERA,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import EditarCarrera from "../componentes/carreras/EditarCarrera";
import CrearCarrera from "../componentes/carreras/CrearCarrera";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Carrrera(){
    const [carreras,setCarreras]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [carrera,setCarrera]=useState({})
    const [crear,setCrear]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCarreras(repuesta.data);
        })
    },[appState]);
    const borrarcarrera=((carreras)=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERA+"/"+carreras.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("La carrera no fue eliminada ")
            setShowError(true)
        })
    }
    );
  
    const mostrareditarcarrera=((carrera)=>{
        setEditar(true)
        setCarrera(carrera)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarcarrera=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearcarrera=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearcarrera=(()=>{
        setCrear(true)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <button onClick={mostrarcrearcarrera}>Nuevo</button>
           <TableCustom data={carreras} borrar={borrarcarrera} mostrar={mostrareditarcarrera}></TableCustom>
         
           {editar && <EditarCarrera showModal={editar} cancelar={cancelar} carrera={carrera} editar={editarcarrera}> </EditarCarrera>}
           {crear && <CrearCarrera   showModal={crear}  cancelar={cancelar} crear={crearcarrera} showModal={crear}></CrearCarrera>}
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

export default Carrrera;