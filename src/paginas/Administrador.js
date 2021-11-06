import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect} from "react";
import  {API_ADMINISTRADOR,cabeceras} from "../store/constante"
import axios from "axios";
function Administrador(){
    const [Administradors,setAdministradors]=useState([])
    const [Administrado,setAdministrador]=useState({idAdministrador:0,Documento:" ",Nombre:" ",Apellido:" ",Nombre_de_Usuario:""})
    const [appState,setAppState]=useState(false)
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
            alert("El area y la ocupacion no fue editado")
            console.log(error)
        })
    })
    const handleChangeSemestre=(prop)=>(event)=>{
        setAdministrador({...Administrado,[prop]:event.target.value})
 
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
        </div>
    )
}
export default Administrador