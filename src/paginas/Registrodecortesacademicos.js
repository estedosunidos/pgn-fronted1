import React,{useEffect,useState} from "react";
import  {API_CORTE,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import CrearCortes from "../componentes/Cortes/CrearCortes"
import EditarCortes from "../componentes/Cortes/EditarCortes"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Registrodecortesacademicos(){
    const [cortes,setCortes]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [corte,setCorte]=useState({})
    const [crear,setCrear]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CORTE;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCortes(repuesta.data);
        })
    },[appState]);
    const borrarcorte=((cortes)=>{
        const url=process.env.REACT_APP_API_URL+API_CORTE+"/"+cortes.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("El corte academico  no fue eliminado ")
            setShowError(true)

        })
    }
    );
    const mostrareditarcorte=((corte)=>{
        setEditar(true)
        setCorte(corte)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarcorte=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearcorte=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearcortes=(()=>{
        setCrear(true)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return (
        <div>
            <h1>Registro de corte academico</h1>
            <button onClick={mostrarcrearcortes}>Nuevo</button>
           <TableCustom data={cortes} borrar={borrarcorte} mostrar={mostrareditarcorte}></TableCustom>
           {editar && <EditarCortes showModal={editar}  cancelar={cancelar} corte={corte} editar={editarcorte}> </EditarCortes>}
           {crear && <CrearCortes  showModal={crear} cancelar={cancelar} crear={crearcorte}></CrearCortes>}
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
export default Registrodecortesacademicos;