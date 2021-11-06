import React,{useEffect,useState} from "react";
import  {API_DOCENTE,cabeceras,API_CURSO,API_ASISTENCIA} from "../store/constante"
import axios from "axios";
function CursoProfesor(){
    const [asignaturas,setAsignaturas]=useState([])
    const [docente,setDocente]=useState({})
    const [grupos,setGrupos]=useState([])
    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/documento/"+documento
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            let docente1=repuesta.data
            if (docente1.length>0){
                setAsignaturas(docente1[0]["AsignaturaDocente"])
                setDocente(docente1[0])
            }
        })
        .catch(error=>{
            console.log(error)
            alert("La asignatura no pudieron ser cargadas")
        })
    },[])
    const traergrupos=((Id)=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/docenteasignatura/"+Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setGrupos(repuesta.data)

        })
        .catch(error=>{
            console.log(error)
            alert("Los grupò no fueron cargados")
        })

    })
    const handleChange=(prop)=>(event)=>{
        if (prop === "Asignatura"){
            traergrupos(event.target.value)
        }
    }
    return(
        <div>
            <div>
                <label>Registo de Plan de evaluacion</label>
            </div>
             <label>Asignatura</label>
            <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asigantura,index)=>{
                    return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                })}
            </select>
            <div>
            <label>Grupo</label>
            <select name="grupos" defaultValue="" onChange={handleChange("Grupo")}>
                <option value="" disabled>Seleccione</option>
                {grupos.map((grupo,index)=>{
                    return <option key={index}></option>
                })}
            </select>
            </div>
        </div>
    )
}
export default CursoProfesor