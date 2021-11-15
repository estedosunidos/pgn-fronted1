import React,{useEffect,useState} from "react";
import  {API_DOCENTE,cabeceras} from "../store/constante"
import axios from "axios";
import RegistroPlanEvaluacion from "../componentes/PlanEvaluacionDocente/RegistroPlanEvaluacion"
function PlanEvaluacion(){
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [docente,setDocente]=useState({})
    const [mostraregistroplanevaluacion,setMostraregistroplanevaluacion]=useState(false)
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
    const handleChange=(prop)=>(event)=>{
        setAsignatura(event.target.value)
    }
    const consulta=(()=>{
        setMostraregistroplanevaluacion(true)
    })
    return(
        <div>
        <label>Asignatura</label>
            <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asigantura,index)=>{
                    return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                })}
            </select>
            <button onClick={consulta}>Consultar:</button>
            {mostraregistroplanevaluacion && <RegistroPlanEvaluacion asignatura={asignatura}></RegistroPlanEvaluacion>}
            </div>

    )
}
export default PlanEvaluacion