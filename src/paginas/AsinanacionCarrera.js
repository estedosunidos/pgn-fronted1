import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_CARRERA,cabeceras} from "../store/constante"
import axios from "axios";
import AsignaturaCarrera  from "../componentes/AsignaturaCarrera/AsignaturaCarrera"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function AsinanacionCarrera(){
    const [carreras,setCarreras]=useState([])
    const [carrera,setCarrera]=useState({Carrera:""})
    const [appState,setAppState]=useState(false)
    const [mostraasignacioncarrera,setMostraasignacioncarrera]=useState(false)
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
    const handleChange=(event, newValue)=>{
        setCarrera(newValue)
        setMostraasignacioncarrera(true)
    }
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }

    return(
        <div>
           <Autocomplete id="carreras" value={carrera} 
           disableClearable
           getOptionSelected={(option, value) => option.id === value.id}
           options={carreras}
           getOptionLabel={(option)=>option.Carreras}
           onChange={handleChange}
           renderOption={(option)=>
        (
            <React.Fragment>
               {option.Carreras} 

            </React.Fragment>
        )} 
           renderInput={(params)=>
                <TextField {...params} label="Buscar una carrera" variant="outlined"></TextField>
            }></Autocomplete>
            {mostraasignacioncarrera && <AsignaturaCarrera carrera={carrera}></AsignaturaCarrera>}
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
export default AsinanacionCarrera