import axios from "axios"
import { useEffect} from "react"
import {API_ANUNCIO,cabeceras} from "../../store/constante"
import React,{useState} from "react";
function AnuncioEstudiante(props){
    const [anunciosestudiante,setAnuciosestudiante]=useState([])
    const [appState,setAppState]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_ANUNCIO+"/anuncioporestudiante/"+props.estudiante
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setAnuciosestudiante(repuesta.data)
        })
        .catch(error=>{
            alert("Los anuncios no pudieron ser cargado")
            console.log(error)
        })
    },[appState])
    return(
        <div>
           {anunciosestudiante.map((anuncioestudiante1,index)=>{
               return <div key={index} onClick={()=>props.muestramodal(anuncioestudiante1)}><label>{anuncioestudiante1.Fecha}</label><label>{anuncioestudiante1.Mensaje}</label><label>{anuncioestudiante1["Nombre_Asignatura"]+"-"+anuncioestudiante1.Grupo }</label></div>
            })}
        </div>
    )
}
export default AnuncioEstudiante