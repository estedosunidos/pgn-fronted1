import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_CARRERA,cabeceras} from "../store/constante"
import axios from "axios";
import AsignaturaCarrera  from "../componentes/AsignaturaCarrera/AsignaturaCarrera"
function AsinanacionCarrera(){
    const [carreras,setCarreras]=useState([])
    const [carrera,setCarrera]=useState({Carrera:""})
    const [appState,setAppState]=useState(false)
    const [mostraasignacioncarrera,setMostraasignacioncarrera]=useState(false)
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

    return(
        <div>
           <Autocomplete id="carreras" value={carrera} 
           disableClearable
           getOptionSelected={(option, value) => option.id === value.id}
           options={carreras}
           getOptionLabel={(option)=>option.Carrera}
           onChange={handleChange}
           renderOption={(option)=>
        (
            <React.Fragment>
               {option.Carrera} 

            </React.Fragment>
        )} 
           renderInput={(params)=>
                <TextField {...params} label="Buscar una carrera" variant="outlined"></TextField>
            }></Autocomplete>
            {mostraasignacioncarrera && <AsignaturaCarrera carrera={carrera}></AsignaturaCarrera>}
        </div>
    )
}
export default AsinanacionCarrera