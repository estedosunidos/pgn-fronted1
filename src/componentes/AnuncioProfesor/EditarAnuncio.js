import React,{useState} from "react";
import  {API_ANUNCIO,cabeceras}  from "../../store/constante"
import axios from "axios";
function    EditarAnuncio(props){
    const [anuncio,setAnucio]=useState(props.anuncio)
    console.log(props.anuncio)
    const editaranuncio=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ANUNCIO+"/"+anuncio.Id
        const body={
            Mensaje:anuncio.Mensaje,
            IdCurso:props.curso
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            props.editar()
        })
        .catch(error=>{
            alert("El mensaje no fue enviado a los estudiantes del grupo")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAnucio({...anuncio,[prop]:event.target.value})
    }
    return(
        <div>
            <form onSubmit={editaranuncio}>
            <label>Mensaje </label>
                <textarea name="anuncios" value={anuncio.Mensaje} onChange={handleChange("Mensaje")} rows="6" cols="50">

                </textarea>
                <button  type="submit">Enviar</button>
                <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarAnuncio
