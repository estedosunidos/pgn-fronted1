import React,{useEffect,useState} from "react";
import  {API_ESTUDIANTE,cabeceras,API_CARRERA,API_CURSO} from "../store/constante"
import axios from "axios";
import ConsultarNotasPorAsignatura from "../componentes/ConsultarNotas/ConsultarNotasPorAsignatura";
import ReportesAcademicos from "../componentes/ConsultarNotas/ReportesAcademicos";
function Consultarnotas(){
    const [estudiante,setEstudiante]=useState({Carreras:[]})
    const [carrera,setCarrera]=useState({})
    const [mostrareporteacademico,setMostrareporteacademico]=useState(false)
    const [mostrarconsultarnotas,setMostrarconsultarnotas]=useState(false)
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
        }else if(prop ==="Consultar"){
            if(event.target.value=== "Consultar"){
                console.log("ss")
                setMostrarconsultarnotas(true)

            }else if(event.target.value==="Reportes"){
                
                setMostrareporteacademico(true)
            }
        }
    }
    return(
        <div>
            <h1>Consultar notas</h1>
            <label> Nombre: </label>
            <label> {estudiante.Nombre} </label>
            <label> Apellido: </label>
            <label>{estudiante.Apellido} </label>
            <label>Carrera</label>
            <select name="carrera" defaultValue="" onChange={handleChange("Carrera")}>
                <option value="" disabled>Seleccione</option>
                {estudiante.Carreras.map((carrera,index)=>{
                    return <option key={index} value={carrera.Id}>{carrera["Nombre Carrera"]}</option>            
                })}
            </select>
            <label> Semetre: </label>
            <label> {estudiante.Semestre} </label>
            <label>Consultar</label>
            <select name="consulta" defaultValue="" onChange={handleChange("Consultar")}>
                <option value="" disabled>Seleccione</option>
                <option value="Consultar" >Consultar notas por asignatura</option>
                <option value="Reportes" >Reportes Academico</option>
            </select>
            {mostrarconsultarnotas && <ConsultarNotasPorAsignatura estudiante={estudiante}></ConsultarNotasPorAsignatura>} 
            {mostrareporteacademico && <ReportesAcademicos estudiante={estudiante}></ReportesAcademicos>}
        </div>
    )
}
export default Consultarnotas