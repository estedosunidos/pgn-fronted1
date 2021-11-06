import React,{useState,useEffect} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras,API_CURSO,API_DOCENTE,API_PERIODO} from "../../store/constante"
function CrearCurso(props){
    const [asignaturas,setAsignaturas]=useState([])
    const [docentes,setDocentes]=useState([])
    const [periodos,setPeriodos]=useState([])
    const [periodo,setPeriodo]=useState({Descripcion:""})
    const [curso,setCurso]=useState({Grupo:""})
    useEffect(()=>{
        const urlasignatura=process.env.REACT_APP_API_URL+API_ASIGNATURA
        const urlperiodo=process.env.REACT_APP_API_URL+API_PERIODO
        const axiosasignatura=axios.get(urlasignatura,{headers:cabeceras})
        const axiosperiodo=axios.get(urlperiodo,{headers:cabeceras})
        axios.all([axiosasignatura,axiosperiodo])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
             console.log(repuesta.data)
             if (index=== 0){
                setAsignaturas(repuesta.data);
             }else if (index===1){
                setPeriodos(repuesta.data)
             }
            })
        }))
         .catch(axios.spread((...errores)=>{
             errores.map((error,index)=>{
                 console.log(error)
                 if (index===0){
                     alert("La asignatura  no fueron listada")
                 }else if(index===1){
                     alert("Los periodos no fueron cargadas")
                 }
             })
         })) 
    },[])
    const crearcurso=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CURSO;
        const body={
            Grupo:curso.Grupo,
            idAsignatura:curso["Asignatura"],
            IdDocente:curso["Docente"],
            IdPeriodo:curso["Periodo"]

        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("Los curso no fue creada")
            console.log(error)
        })
    })
    const returnperiodo=(()=>{
        const url =process.env.REACT_APP_API_URL+API_PERIODO
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setPeriodos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("Los periodos  no pudieron ser  cargados")
        })   
    })
    const returndocente=((idasignatura)=>{
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/asignatura"+"/"+idasignatura
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setDocentes(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("Los docente no pudieron ser  cargados")
        })   
    })
    const handleChange=(prop)=>(event)=>{
        setCurso({...curso,[prop]:event.target.value})
        if (prop==="Asignatura"){
            returndocente(event.target.value)
        }else{
            returnperiodo(event.target.value)
        }
    }
    return(
        <div>
            <form onSubmit={crearcurso}>
                <label>Grupo</label>
                <input type="text" value={curso.Grupo} onChange={handleChange("Grupo")}></input>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("Asignatura")}>
                        <option value=" " disabled selected>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id}>{asignatura.Asignatura}</option>
                        })}
                </select>
                <label>Docente</label>
                <select name="docentes" defaultValue=" " onChange={handleChange("Docente")}>
                        <option value=" " disabled selected>seleccione</option>
                        {docentes.map((docente,index)=>{
                            return <option key={index} value={docente.Id}>{docente.Nombre+" "+docente.Apellido}</option>
                        })}
                </select>
                <label>Periodo</label>
                <select name="periodos" defaultValue=" " onChange={handleChange("Periodo")}>
                        <option value=" " disabled selected>seleccione</option>
                        {periodos.map((periodo,index)=>{
                            return <option key={index} value={periodo.IdPeriodo}>{periodo.Descripcion}</option>
                        })}
                </select>
                <button  type="submit">Crear</button>
                 <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>

    )
}
export default CrearCurso