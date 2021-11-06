import React,{useState} from "react";
function InformacionAnuncio(props){
    const [informacion,setInformacion]=useState(props.informacion)
    console.log(props)

    return(
        <div>
            <label>Docente: </label>
            <label >{informacion.Nombre+" "+informacion.Apellido}</label>
            <label>Asignatura: </label>
            <label>{informacion["Nombre_Asignatura"]}</label>
            <label>Grupo: </label>
            <label>{informacion.Grupo}</label>
            <label>Mensaje: </label>
            <label>{informacion.Mensaje}</label>
            <button onClick={()=>props.cancelar()}>Cancelar</button>
        </div>
    )
}
export default InformacionAnuncio