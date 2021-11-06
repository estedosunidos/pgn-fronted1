import React,{useEffect,useState} from "react";
import  {API_ESTUDIANTE,cabeceras} from "../store/constante"
import axios from "axios";
function Consultarhorario(){
    const [estudiante,setEstudiante]=useState({Carreras:[]})
    const [carrera,setCarrera]=useState({})
    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const url=process.env.REACT_APP_API_URL+API_ESTUDIANTE+"/documento/"+ documento
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            let estudiante1=repuesta.data
            if(estudiante1.length>0){
                setEstudiante(estudiante1[0])
            }
        })
        .catch(error=>{
            console.log(error)
            alert("El estudiante no fue cargado")
        })
    },[])
    const handleChange=(prop)=>(event)=>{
        if(prop ==="Carrera"){
            setCarrera(estudiante.Carreras.find((objeto)=> objeto.Id == event.target.value))
        }
    }
    const consultar=(()=>{

    })
    return(
        <div>
            <label>Consultar Horario </label>
            <br></br>
            <label> Nombre:{estudiante.Nombre} </label>
            <label>Apellido:{estudiante.Apellido} </label>
            <br></br>
            <label>Carrera</label>
            <br></br>
            <select name="carrera" defaultValue="" onChange={handleChange("Carrera")}>
                <option value="" disabled>Seleccione</option>
                {estudiante.Carreras.map((carrera,index)=>{
                     return <option key={index} value={carrera.Id}>{carrera["Nombre Carrera"]}</option>            
            })}
            <br></br>
             </select>
            <label> Semestre: {estudiante.Semestre} </label>
            <br></br>
             <label>Consultar</label>
             <button onClick={consultar}>Consultar Horario</button>
        </div>
    )
}
export default Consultarhorario