import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_ADMINISTRADOR,cabeceras} from "../store/constante"
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Administrador(){
    const [Administradors,setAdministradors]=useState([])
    const [Administrado,setAdministrador]=useState({idAdministrador:0,Documento:" ",Nombre:" ",Apellido:" ",Nombre_de_Usuario:""})
    const [appState,setAppState]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ADMINISTRADOR;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAdministradors(repuesta.data);
        })
    },[appState]);
    const handleChange=(event, newValue)=>{
        setAdministrador(newValue)
    }
    const editarAreayOcupacion=((event)=>{
        event.preventDefault()
        const url =process.env.REACT_APP_API_URL+API_ADMINISTRADOR+"/"+Administrado.idAdministrador
        const body={
            Area:Administrado.Area,
            Ocupacion:Administrado.Ocupacion
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
        })

        .catch(error=>{
            setTextError("El area y la ocupacion no fue editado")
            setShowError(true)
            console.log(error)
        })
    })
    const handleChangeSemestre=(prop)=>(event)=>{
        setAdministrador({...Administrado,[prop]:event.target.value})
 
    }
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }

    return(
        <div>
           <Autocomplete id="administrador" value={Administrado} 
           disableClearable
           getOptionSelected={(option, value) => option.id === value.id}
           options={Administradors}
           getOptionLabel={(option)=>''.concat(option.Nombre, ' ', option.Apellido, ' ', option.Documento)}
           onChange={handleChange}
           renderOption={(option)=>
        (
            <React.Fragment>
               {option.Documento} - {option.Nombre} {option.Apellido}  

            </React.Fragment>
        )} 
           renderInput={(params)=>
                <TextField {...params} label="Buscar un administrador" variant="outlined"></TextField>
            }></Autocomplete>
             <div>
                    <label>Informacion Personal</label>
                    <label>Documento</label>
                    <input disabled value={Administrado.Documento}></input>
                    <label>Nombre</label>
                    <input disabled value={Administrado["Nombre"]}></input>
                    <label >Apellido</label>
                    <input disabled value={Administrado["Apellido"]}></input>
                    <label>Nombre de Usuario</label>
                    <input disabled value={Administrado["Nombre_de_Usuario"]}></input>
            </div>
            <div>
                <label>Area</label>
                <input value={Administrado.Area} onChange={handleChangeSemestre("Area")}></input> 
                <label>Ocupacion</label>
                <input value={Administrado.Ocupacion} onChange={handleChangeSemestre("Ocupacion")}></input> 
                <button onClick={editarAreayOcupacion}>Editar</button>
            </div>
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
export default Administrador