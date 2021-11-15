import React,{useEffect,useState} from "react";
import  {API_ANUNCIO,cabeceras}  from "../../store/constante"
import axios from "axios";
import TextField from '@mui/material/TextField';

function CrearAnuncio(props){
    const [anuncio,setAnucio]=useState({Mensaje:""})
    const handleChange=(prop)=>(events)=>{
        setAnucio({...anuncio,[prop]:events.target.value})
    }
    const crearmensaje=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ANUNCIO
        const body={
            Mensaje:anuncio.Mensaje,
            IdCurso:props.curso
        }
        console.log(body)
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            props.crear()
        })
        .catch(error=>{
            alert("El mensaje no fue enviado a los estudiantes del grupo")
            console.log(error)
        })
    })
    return(
        <div>
            <div>
                <label>Escribir un anuncio</label>
            </div>
            <form onSubmit={crearmensaje}>
                <TextField  id="outlined-multiline-static" label="Mensaje" multiline name="anuncios" value={anuncio.Mensaje} onChange={handleChange("Mensaje")} rows="6" cols="50">

                </TextField>
                <button  type="submit">Enviar</button>
                <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAnuncio