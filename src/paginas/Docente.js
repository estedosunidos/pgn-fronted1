import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_DOCENTE,cabeceras} from "../store/constante"
import axios from "axios";
import EstudioRealizados  from "../componentes/EstudioRealizado/EstudioRealizado"
import AsignacionDocente  from "../componentes/AsignaturaDocente/AsignacionDocente"

function Docente(){
    const [docentes,setDocentes]=useState([])
    const [docente,setDocente]=useState({idDocente:0,Documento:"",Nombre:"",Apellido:"",Nombre_de_Usuario:""})
    const [appState,setAppState]=useState(false)
    const [mostraestudiorealizado,setMostraestudiorealizado]=useState(false)
    const [mostraasignaciondeasignatura,setMostraasignaciondeasignatura]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_DOCENTE;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setDocentes(repuesta.data);
        })
    },[appState]);
    const handleChange=(event, newValue)=>{
        setDocente(newValue)
        setMostraestudiorealizado(true)
        setMostraasignaciondeasignatura(true)
    }
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
           <Autocomplete id="docentes" value={docente} 
           disableClearable
           getOptionSelected={(option, value) => option.id === value.id}
           options={docentes}
           getOptionLabel={(option)=>''.concat(option.Nombre, ' ', option.Apellido, ' ', option.Documento)}
           onChange={handleChange}
           renderOption={(option)=>
        (
            <React.Fragment>
               {option.Documento} - {option.Nombre} {option.Apellido}  

            </React.Fragment>
        )} 
           renderInput={(params)=>
                <TextField {...params} label="Buscar un docente" variant="outlined"></TextField>
            }></Autocomplete>
             <div>
                    <label>Informacion Personal</label>
                    <label>Documento</label>
                    <input disabled value={docente.Documento}></input>
                    <label>Nombre</label>
                    <input disabled value={docente.Nombre}></input>
                    <label >Apellido</label>
                    <input disabled value={docente.Apellido}></input>
                    <label>Nombre de Usuario</label>
                    <input disabled value={docente.Nombre_de_Usuario}></input>
            </div>
            {mostraestudiorealizado && <EstudioRealizados  docente={docente}  ></EstudioRealizados>}
            {mostraasignaciondeasignatura && <AsignacionDocente   docente={docente}></AsignacionDocente>}
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
export default Docente