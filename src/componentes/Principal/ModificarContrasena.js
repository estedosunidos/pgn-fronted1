import {API_CHANGEPASS} from "../../store/constante"
import axios from "axios";
import Principal from "../../paginas/Principal";
import React,{useState} from "react";
import { cabeceras } from "../../store/constante";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function ModificarContrasena(props){
    const [contrasena,setContrasena]=useState({})
    const confirmar=(()=>{
        const url =process.env.REACT_APP_API_URL+API_CHANGEPASS+props.documento;
        const body={
            Contraseña:contrasena.contraseña,
            AntiguaContraseña:contrasena.antiguacontraseña
        }
        axios.put(url,body,{header:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            setContrasena(repuesta.data)
        })
        .catch((error)=>{
            console.log(error)
            alert("La contraseña no pudo ser actualizada")
        })
    })
    const handleChange =(prop)=>(event)=>{
        setContrasena({...contrasena,[prop]:event.target.value})
    }
    return(
        <div>
            <label>Modificar Contrasena</label>
            <label>Digite la antigua contraseña</label>
            <input type="text" value={contrasena.antiguacontraseña} onChange={handleChange("antiguacontraseña")}></input>
            <label>Digite la nueva contraseña</label>
            <input type="text" value={contrasena.contraseña} onChange={handleChange("contraseña")}></input>
            <label>Digite de nuevo  la nueva contraseña</label>
            <input type="text"></input>
            <button onClick={confirmar}>Confirmar</button>
        </div>
    )
}
export default ModificarContrasena