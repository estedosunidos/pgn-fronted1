import {API_LOGOUT} from "../store/constante"
import axios from "axios";
import ReactDOM from 'react-dom';
import Login from "../paginas/Login"
import React,{useState} from "react";
import {API_ANUNCIO,cabeceras} from "../store/constante"
import AnuncioEstudiante from "../componentes/AnuncioEstudiante/AnuncioEstudiante"
import InformacionAnuncio from "../componentes/AnuncioEstudiante/InformacionAnuncio"
function Principal(){
    const nombre_completo =localStorage.getItem("nombre_de_usuario");
    const documento=localStorage.getItem("documento");
   // const foto = JSON.parse(localStorage.getItem("foto"))
    const [mostraanuncio,setMostraanuncio]=useState(false)
    const [mostrainformacion,setMostrainformacion]=useState(false)
    //const [mostracambiocontrasena,setMostracambiocontrasena]=useSate(false)
    const [anuncioestudiante,setAnuncioestudiante]=useState({})
    const salir=(event)=>{
        event.preventDefault();
        const url=process.env.REACT_APP_API_URL+API_LOGOUT+documento;
        axios.put(url)
        .then(repuesta=>{
            console.log(repuesta.data);
            ReactDOM.render(
                <React.StrictMode>
                  <Login/>
                </React.StrictMode>,
                document.getElementById('root')
              );
        })
        
    }
    const muestramodal=((mensaje)=>{
        setMostrainformacion(true)
        setAnuncioestudiante(mensaje)
        actualizarleido(mensaje)
    })
    const anuncioestudiante1=((event)=>{
        event.preventDefault();
        setMostraanuncio(!mostraanuncio)
    })
    const cancelar=(()=>{
        setMostrainformacion(false)
    })
    const actualizarleido=((mensaje)=>{
        const url=process.env.REACT_APP_API_URL+API_ANUNCIO+"/anuncioporestudiante"
        const body={
            IdAnuncio:mensaje.IdAnuncio,
            leido:"S",
            IdEstudiante:mensaje.IdEstudiante
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
        })
        .catch(error=>{
            alert("El mensaje no fue leido")
            console.log(error)
        })
    })
    return(
        <div>
        <label>Bienvenido: {nombre_completo}</label>
        {/*<img src={"data:image/png;base64," + new Buffer.from(foto).toString("base64")}></img>*/}
        <button onClick={salir}>Salir</button>
        <button onClick={anuncioestudiante1}>Consulta</button>
        { mostraanuncio &&<AnuncioEstudiante estudiante={11} muestramodal={muestramodal}></AnuncioEstudiante>}
        {mostrainformacion && <InformacionAnuncio informacion={anuncioestudiante} cancelar={cancelar}></InformacionAnuncio>}
       
        </div>       
    );
}
export default Principal;