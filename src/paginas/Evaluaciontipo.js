import React,{useEffect,useState} from "react";
import  {API_EVALUACIONTIPO,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import Editarevaluaciontipo from "../componentes/Evaluaciontipo/Editarevaluaciontipo"
import Crearevaluaciontipo from "../componentes/Evaluaciontipo/Crearevaluaciontipo"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Evaluaciontipo(){
    const [evaluaciontipos,setEvaluaciontipos]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [evaluaciontipo,setEvaluaciontipo]=useState({})
    const [crear,setCrear]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setEvaluaciontipos(repuesta.data);
        })
    },[appState]);
    const borrarevaluaciontipo=((evaluaciontipo)=>{
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO+"/"+evaluaciontipo.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("El tipo de evaluacion no fue eliminada ")
            setShowError(true)
        })
    }
    );
    const mostrareditarevaluaciontipo=((evaluaciontipo)=>{
        setEditar(true)
        setEvaluaciontipo(evaluaciontipo)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarevaluaciontipo=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearevaluaciontipo=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearevaluaciontipo=(()=>{
        setCrear(true)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <button onClick={mostrarcrearevaluaciontipo}>Nuevo</button>
           <TableCustom data={evaluaciontipos} borrar={borrarevaluaciontipo} mostrar={mostrareditarevaluaciontipo}></TableCustom>
           {editar && <Editarevaluaciontipo showModal={editar}  cancelar={cancelar} evaluaciontipo={evaluaciontipo} editar={editarevaluaciontipo}> </Editarevaluaciontipo>}
           
           {crear && <Crearevaluaciontipo  showModal={crear} cancelar={cancelar} crear={crearevaluaciontipo}></Crearevaluaciontipo>}
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
export default Evaluaciontipo