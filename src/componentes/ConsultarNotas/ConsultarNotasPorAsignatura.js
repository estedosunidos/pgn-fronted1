import React,{useEffect,useState} from "react";
import  {API_ASIGNATURA,cabeceras,API_PERIODO,API_NOTAS} from "../../store/constante"
import axios from "axios";
function ConsultarNotasPorAsignatura(props){
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [periodos,setPeriodos]=useState([])
    const [periodo,setPeriodo]=useState({})
    const [nota,setNota]=useState({notas:[]})
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA+"/asignaturabyestudiante/"+props.estudiante.idEstudiantes
        axios.get(url,{headers:cabeceras}) 
        .then((repuesta)=>{
            console.log(repuesta.data)
            setAsignaturas(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("La asignatura no fueron cargados ")
        })
    },[])
    const handleChange=(prop)=>(event)=>{
        if (prop==="Asignatura"){
            setAsignatura(event.target.value)
            returnperiodo(event.target.value)
        }else{
            setPeriodo(event.target.value)
        }

    }
    const returnperiodo=((Id)=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/periodobyasignatura/"+Id
        axios.get(url,{headers:cabeceras}) 
        .then((repuesta)=>{
            console.log(repuesta.data)
            setPeriodos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("los periodo no fueron cargados ")
        })
    })
    const consultar=()=>{
        const url=process.env.REACT_APP_API_URL+API_NOTAS+"/retornanota/"+asignatura+"/"+periodo
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            setNota(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("La notas no fueron cargados ")
        })
    }
    return(
        <div>
            <label>Asignatura</label>
            <select name="asignatura" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asignatura,index)=>{
                    return <option key={index} value={asignatura.idCurso_Estudiante}>{asignatura["Nombre_Asignatura"]}</option>            
                })}
            </select>
            <label>Periodo</label>
            <select name="periodo" defaultValue="" onChange={handleChange("Periodo")}>
                <option value="" disabled>Seleccione</option>
                {periodos.map((periodo,index)=>{
                    return <option key={index} value={periodo.IdPeriodo}>{periodo["Descripcion"]}</option>            
                })}
            </select>
            <button onClick={consultar}>Consulta</button>
            {nota.notas.map((nota,index)=>{
                return <div key={index}><div><label>{nota.Descripcion}</label>
                <table><thead><tr><td>Actividad</td><td>Nota</td></tr></thead><tbody>
                {nota.calificaciones.map((califica,index1)=>{
                    return <tr  key={index1} ><td>{califica.Descripcion}</td><td>{califica.Calificacion}</td></tr>
                })}
                </tbody></table>
                <label>Total Corte: {nota.totalcorte.Notacorte}</label>
                </div></div>
            })}
            <label>Total Promedio Asignatura: {nota.totalpromedioasignatura}</label>

        </div>
    )
}

export default ConsultarNotasPorAsignatura