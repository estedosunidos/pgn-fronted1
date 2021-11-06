import React,{useEffect,useState} from "react";
import  {API_NOTAS,cabeceras,API_CURSO,API_CORTE,API_DOCENTE} from "../store/constante"
import axios from "axios";
function ResgistroNotas(){
    const [asignaturas,setAsignaturas]=useState([])
    const [grupos,setGrupos]=useState([])
    const [cortes,setCortes]=useState([])
    const [actividades,setActividades]=useState([])
    const [estudiantes,setEstudiantes]=useState([])
    const [docente,setDocente]=useState({})
    const [asignaturacorte,setAsignaturacorte]=useState({Corte:0,Asignatura:0,Grupo:"",Actividad:0})
    const [appState,setAppState]=useState(false)

    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const urlasignatura=process.env.REACT_APP_API_URL+API_DOCENTE+"/documento/"+documento
        const urlcorte=process.env.REACT_APP_API_URL+API_CORTE
        const axiosasignatura=axios.get(urlasignatura,{headers:cabeceras})
        const axiosCorte=axios.get(urlcorte,{headers:cabeceras})
        axios.all([axiosCorte,axiosasignatura])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
             console.log(repuesta.data)
             if (index=== 0){
                setCortes(repuesta.data);
             }else if (index===1){
                let docente1=repuesta.data
                if (docente1.length>0){
                      setAsignaturas(docente1[0]["AsignaturaDocente"])
                      setDocente(docente1[0])
                }
             }
            })
        }))
         .catch(axios.spread((...errores)=>{
             errores.map((error,index)=>{
                 console.log(error)
                 if (index===0){
                     alert("El tipo de evaluacion no fueron listada")
                 }else if(index===1){
                     alert("La asignatura no fueron cargadas")
                 }
             })
         })) 
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
    const traeactividadesdepentegrupoyasignatura=(idCorte,Idasignaturadocente)=>{
        const url=process.env.REACT_APP_API_URL+API_NOTAS+"/asignaturacorte/"+idCorte+"/"+Idasignaturadocente
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setActividades(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("Las actividades  no fueron cargados")
        })
    }
    const handleChange=(prop)=>(event)=>{
        if (prop === "Asignatura" || prop ==="Corte"){
            if(prop==="Asignatura"){
                traeactividadesdepentegrupoyasignatura(asignaturacorte.Corte,event.target.value)
                traergrupos(event.target.value)
            }else{
                traeactividadesdepentegrupoyasignatura(event.target.value,asignaturacorte.Asignatura)
            }
        }
        setAsignaturacorte({...asignaturacorte,[prop]:event.target.value})
        if (prop ==="Calificacion" || prop ==="Observacion"){
            setEstudiantes(estudiantes=>{
                const lista=estudiantes.map((estudiante,index)=>{
                    if (estudiante.idCurso_Estudiante === event.target.name){
                        if(prop ==="Calificacion"){
                            
                            estudiante.Calificacion = event.target.value
                        }else{
                            
                            estudiante.Observacion = event.target.value
                        }
                    }
                    return estudiante
                })
                return lista
            })
        }
    }
    const consultalalista=(()=>{
        console.log(asignaturacorte)
        const url=process.env.REACT_APP_API_URL+API_NOTAS+"/estudiante/"+asignaturacorte.Grupo+"/"+asignaturacorte.Actividad+"/"+docente.idDocente
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setEstudiantes(repuesta.data)

        })
        .catch(error=>{
            console.log(error)
            alert("El listado no fue cargado")
        })

    })
    const guarda=(()=>{
        console.log("sss",asignaturacorte)
        const url=process.env.REACT_APP_API_URL+ API_NOTAS
        const peticiones=[...estudiantes]
        axios.all(peticiones.map((peticion,index)=>{
            const body={
                Observacion:peticion.Observacion,
                Calificacion:peticion.Calificacion,
                idCurso_Estudiantes:peticion.idCurso_Estudiante,
                IdDocente:docente.idDocente,
                IdPlanEvaluacion:asignaturacorte.Actividad
            }
          return  axios.post(url,body,{headers:cabeceras})
        }))
       .then(axios.spread((...repuestas)=>{
           repuestas.map((repuesta)=>{
            console.log(repuesta.data)
           })
       }))
        .catch(axios.spread((...errores)=>{
            errores.map((error)=>{
                console.log(error)
            })
        }))  
        setAppState(true)
    })
    return(
        <div>
            <lavel>Registro de Notas</lavel>
            <div>
            <label>Notas</label>
            </div>
            <label>Asignatura</label>
            <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asigantura,index)=>{
                    return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                })}
            </select>
            <label>Grupo</label>
            <select name="grupos" defaultValue="" onChange={handleChange("Grupo")}>
                <option value="" disabled>Seleccione</option>
                {grupos.map((grupo,index)=>{
                    return <option key={index} value={grupo.IdCurso}>{grupo.Grupo}</option>
                })}
            </select>
            <label>Corte</label>
            <select name="cortes" defaultValue="" onChange={handleChange("Corte")}>
                <option value="" disabled>Seleccione</option>
                {cortes.map((corte,index)=>{
                    return <option key={index} value={corte.Id}>{corte.Descripcion}</option>
                })}
            </select>
            <label>Actividades</label>
            <select name="actividades" defaultValue="" onChange={handleChange("Actividad")}>
                <option value=""  disabled>Seleccione</option>
                {actividades.map((actividad,index)=>{
                    return <option key={index} value={actividad.IdPlanEvaluacion}>{actividad.Descripcion}</option>
                })}
            </select> 
            <button onClick={consultalalista}>Consultar</button>
            <div>
                <table>
                    <thead>
                        <tr><td>Documento</td> <td>Apellido</td> <td>Nombre</td>   <td>Notas</td> <td>Observacion</td></tr>
                
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante,index)=>{
                            return <tr key={index}><td>{estudiante.Documento}</td> <td>{estudiante.Apellido}</td> <td>{estudiante.Nombre}</td> 
                            <td><input type="text" value={estudiante.Calificacion} name={estudiante.idCurso_Estudiante} onChange={handleChange("Calificacion")}></input><textarea  value={estudiante.Observacion} name={estudiante.idCurso_Estudiante}  onChange={handleChange("Observacion")}></textarea></td></tr>
                                    })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={guarda}>Enviar</button>
            </div>
        </div>
    )
}
export default ResgistroNotas