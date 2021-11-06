import React,{useState,useEffect} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras,API_CURSO,API_DOCENTE,API_PERIODO} from "../../store/constante"
function EditarCurso(props){
    const [asignaturas,setAsignaturas]=useState([])
    const [docentes,setDocentes]=useState([])
    const [periodos,setPeriodos]=useState([])
    const [curso,setCurso]=useState({Grupo:"",IdCurso:"",idAsignatura:"",IdDocente:"",IdPeriodo:""})
    const [asignatura,setAsignatura]=useState(props.asignatura)
    useEffect(()=>{
        const urlasignatura=process.env.REACT_APP_API_URL+API_ASIGNATURA
        const urlperiodo=process.env.REACT_APP_API_URL+API_PERIODO
        const urlcurso=process.env.REACT_APP_API_URL+API_CURSO+"/"+props.curso.Id
        const axiosasignatura=axios.get(urlasignatura,{headers:cabeceras})
        const axiosperiodo=axios.get(urlperiodo,{headers:cabeceras})
        const axioscurso=axios.get(urlcurso,{headers:cabeceras})
        axios.all([axiosasignatura,axiosperiodo,axioscurso])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
            console.log(repuesta.data)
             if (index=== 0){
                setAsignaturas(repuesta.data);
             }else if (index===1){
                setPeriodos(repuesta.data)
             } else if (index===2){
                const cursos=repuesta.data
                if (cursos.length>0){
                    setCurso(cursos[0])
                    returndocente(cursos[0].idAsignatura)
                }
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
                 }else if (index===2){
                     alert("Los curso no fueron listada")
                 }
             })
         })) 
    },[])
    const editarcurso=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/"+curso.IdCurso;
        const body={
            Grupo:curso.Grupo,
            idAsignatura:curso.idAsignatura,
            IdDocente:curso.IdDocente,
            IdPeriodo:curso["IdPeriodo"]
        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("Los curso no fue creada")
            console.log(error)
        })
    })
    const returndocente=((Id)=>{
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/asignatura/"+Id
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
        if (prop==="idAsignatura"){
            returndocente(event.target.value)
        }
        setCurso({...curso,[prop]:event.target.value})
    }
    return(
        <div>
            <form onSubmit={editarcurso}>
                <label>Grupo</label>
                <input type="text" value={curso.Grupo} onChange={handleChange("Grupo")}></input>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("idAsignatura")} >
                        <option value=" " disabled >seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id} selected={asignatura.Id ==curso.idAsignatura ? true : false}>{asignatura.Asignatura}</option>   
                        })}
                </select>
                <label>Docente</label>
                <select name="docentes" defaultValue=" "onChange={handleChange("IdDocente")}>
                        <option value=" " disabled >selecione</option>
                        {docentes.map((docente,index)=>{
                            return <option key={index} value={docente.Id} selected={docente.Id ==curso.IdDocente ? true : false}>{docente.Nombre+" "+docente.Apellido}</option>   
                        })}
                </select>
                <label>Periodo</label>
                <select name="periodos" defaultValue=" " onChange={handleChange("IdPeriodo")}>
                        <option value=" " disabled >seleccione</option>
                        {periodos.map((periodo,index)=>{
                             return <option key={index} value={periodo.IdPeriodo} selected={periodo.IdPeriodo == curso.IdPeriodo ? true : false}>{periodo.Descripcion}</option>   
                        })}
                </select>
                <button  type="submit">Editar</button>
                 <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>

    )
}
export default EditarCurso