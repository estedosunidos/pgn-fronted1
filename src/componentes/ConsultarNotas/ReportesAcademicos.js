import React,{useState} from "react";
import  {cabeceras,API_NOTAS} from "../../store/constante"
import axios from "axios";
function ReportesAcademicos(props){
    const [estudiante,setEstudiante]=useState(props.estudiante)
    const [carrera,setCarrera]=useState()
    const [periodo,setPeriodo]=useState({periodos:[]})
    console.log(props.estudiante)
    const handleChange=(prop)=>(event)=>{
        if(prop==="Carrera"){
            setCarrera(event.target.value)
        }

    }
    const consultar=()=>{
        const url=process.env.REACT_APP_API_URL+API_NOTAS+"/returnperiodobycarreraestudiante/"+carrera
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            setPeriodo(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("La notas no fueron cargados ")
        })
    }
    return(
        <div>
            <label>Reporte Academico</label>
            <label>Carrera</label>
            <select name="carrera" defaultValue="" onChange={handleChange("Carrera")}>
                <option value="" disabled>Seleccione</option>
                {estudiante.Carreras.map((carrera,index)=>{
                    return <option key={index} value={carrera.Id}>{carrera["Nombre Carrera"]}</option>            
                })}
            </select>
            <button onClick={consultar}>Consulta</button>
            {periodo.periodos.map((periodo,index)=>{
                <br></br>
                return <div key={index}><div><label>periodo:{periodo.Descripcion}</label>
                <table><thead><tr><td>Nombre de la Asignatura</td><td>Credito</td><td>Nota</td></tr></thead><tbody>
                {periodo.asignaturas.map((asignatura,index1)=>{
                    return <tr  key={index1} ><td>{asignatura["Nombre_Asignatura"]}</td><td>{asignatura["Unidad_de_credito"]}</td><td>{asignatura["nota"]}</td></tr>
                })}
                </tbody>
                </table>
            <br></br>
            <label>Total Creditos semestre: {periodo.creditoporsemestre}</label>
            <br></br>
            <label>Promedio Semestral: {periodo.notaporsemetre}</label>
            <br></br>
            </div></div>
            })}
            <label>Total Creditos Carrera: {periodo.creditoporasignatura}</label>
            <br></br>
            <label>Promedio Carrera: {periodo.promediocarrera}</label>
            <br></br>
        </div>
    )
}
export default ReportesAcademicos