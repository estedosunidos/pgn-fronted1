import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_ESTUDIANTE,cabeceras} from "../store/constante"
import axios from "axios";
import CarreraEstudiantes from "../componentes/CarreraEstudiante/CarrerasEstudiantes"
function Estudiante(){
    const [estudiantes,setEstudiantes]=useState([])
    const [estudiante,setEstudiante]=useState({idEstudiantes:0,Documento:" ",Nombre:" ",Apellido:" ",Nombre_de_Usuario:""})
    const [appState,setAppState]=useState(false)
    const [mostracarreraestudiante,setMostraasignaciondeasignatura]=useState(false)
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ESTUDIANTE;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setEstudiantes(repuesta.data);
        })
    },[appState]);
    const handleChange=(event, newValue)=>{
        setEstudiante(newValue)
        setMostraasignaciondeasignatura(true)
    }
    const editarsemestre=((event)=>{
        event.preventDefault()
        const url =process.env.REACT_APP_API_URL+API_ESTUDIANTE+"/"+estudiante.idEstudiantes
        const body={
            Semestre:estudiante.Semestre
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
        })
        .catch(error=>{
            alert("El semestre no fue editado")
            console.log(error)
        })
    })
    const handleChangeSemestre=(prop)=>(event)=>{
        setEstudiante({...estudiante,[prop]:event.target.value})
 
    }
    return(
        <div>
           <Autocomplete id="estudiantes" value={estudiante} 
           disableClearable
           getOptionSelected={(option, value) => option.id === value.id}
           options={estudiantes}
           getOptionLabel={(option)=>''.concat(option.Nombre, ' ', option.Apellido, ' ', option.Documento)}
           onChange={handleChange}
           renderOption={(option)=>
        (
            <React.Fragment>
               {option.Documento} - {option.Nombre} {option.Apellido}  

            </React.Fragment>
        )} 
           renderInput={(params)=>
                <TextField {...params} label="Buscar un estudiante" variant="outlined"></TextField>
            }></Autocomplete>
             <div>
                    <label>Informacion Personal</label>
                    <label>Documento</label>
                    <input disabled value={estudiante.Documento}></input>
                    <label>Nombre</label>
                    <input disabled value={estudiante["Nombre"]}></input>
                    <label >Apellido</label>
                    <input disabled value={estudiante["Apellido"]}></input>
                    <label>Nombre de Usuario</label>
                    <input disabled value={estudiante["Nombre_de_Usuario"]}></input>
            </div>
            <div>
                <label>Semestre</label>
                <input value={estudiante.Semestre} onChange={handleChangeSemestre("Semestre")}></input> 
                <button onClick={editarsemestre}>Editar</button>
            </div>
                {mostracarreraestudiante && <CarreraEstudiantes estudiante={estudiante}></CarreraEstudiantes>}
        </div>
    )
}
export default Estudiante