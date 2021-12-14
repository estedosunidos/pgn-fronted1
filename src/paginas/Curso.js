import React,{useEffect,useState} from "react";
import  {API_CURSO,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import Editarcurso from "../componentes/cursos/EditarCurso"
import CrearCurso from "../componentes/cursos/CrearCurso";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Curso(){
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    const [cursos,setCursos]=useState([])
    const [curso,setCurso]=useState({})
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const borrarcurso=((cursos)=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/"+cursos.Id
        console.log(cursos)
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            setTextError("El curso  no fue eliminado ")
            setShowError(true)
        })
    }
    );
    const editarcurso=(()=>{
        setAppState(!appState)
        setEditar(false)

    })
    const mostrareditarcurso=((curso)=>{
        setEditar(true)
        setCurso(curso)
    })
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCursos(repuesta.data);
        })
    },[appState]);
    const mostracrearacurso=(()=>{
        setCrear(true)
    })
    const crearcurso=(()=>{
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
            <button onClick={mostracrearacurso}>Nuevo</button>
            <TableCustom data={cursos} borrar={borrarcurso} mostrar={mostrareditarcurso}></TableCustom>
            {editar && <Editarcurso showModal={editar} cancelar={cancelar}   curso={curso} editar={editarcurso}> </Editarcurso>}
            {crear && <CrearCurso showModal={crear} cancelar={cancelar}   curso={curso} crear={crearcurso}> </CrearCurso>}
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
export default Curso