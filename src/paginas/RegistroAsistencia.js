import React,{useEffect,useState} from "react";
import  {API_DOCENTE,cabeceras,API_CURSO,API_ASISTENCIA} from "../store/constante"
import axios from "axios";
import Checkbox from '@mui/material/Checkbox'
function RegistroAsistencia(){
    const [asignaturas,setAsignaturas]=useState([])
    const [grupos,setGrupos]=useState([])
    const [asistencia,setAsistencia]=useState({Fecha:"",Grupo:""})
    const [docente,setDocente]=useState({})
    const [estudiantes,setEstudiantes]=useState([])
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
            alert("Los grupo no fueron cargados")
        })

    })
    const handleChange=(prop)=>(event)=>{
        if (prop === "Asignatura"){
            traergrupos(event.target.value)
        }else if (prop ==="Asistio"){
            setEstudiantes(estudiantes=>{
                const lista = estudiantes.map((estudiante,index)=>{
                    if(estudiante.idCurso_Estudiante==event.target.name){
                        if(event.target.checked){
                            estudiante.asistio="S"
                        }else{
                            estudiante.asistio="N"
                        }
                    }
                    return estudiante
                })
                return lista
            })
        }else {
            setAsistencia({...asistencia,[prop]:event.target.value})
        }
    }
    const consultalalista=(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASISTENCIA+"/estudiante/"+asistencia.Fecha+"/"+asistencia.Grupo+"/"+docente.idDocente
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
        const url=process.env.REACT_APP_API_URL+ API_ASISTENCIA
        const peticiones=[...estudiantes]
        axios.all(peticiones.map((peticion,index)=>{
            const body={
                Asistio:peticion.asistio,
                Fecha:asistencia.Fecha,
                IdDocente:docente.idDocente,
                idCurso_Estudiantes:peticion.idCurso_Estudiante   
            }
          return  axios.post(url,body,{headers:cabeceras})
        }))
       .then(axios.spread((...repuestas)=>{
           repuestas.map((repuesta,index)=>{
            console.log(repuesta.data)
           })
       }))
        .catch(axios.spread((...errores)=>{
            errores.map((error,index)=>{
                console.log(error)
            })
        })) 
    })
    return (
        <div>
            <lavel>Registro de Asistencia</lavel>
            <div>
            <label>Asistencia</label>
            </div>
            <div>
            <label>Asignatura</label>
            <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asigantura,index)=>{
                    return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                })}
            </select>
           </div>
            <div>
            <label>Grupo</label>
            <select name="grupos" defaultValue="" onChange={handleChange("Grupo")}>
                <option value="" disabled>Seleccione</option>
                {grupos.map((grupo,index)=>{
                    return <option key={index} value={grupo.IdCurso}>{grupo.Grupo}</option>
                })}
            </select>
            <label>Fecha</label>
            <input type="date" onChange={handleChange("Fecha")} name="fecha" ></input>
            <button onClick={consultalalista}>Consultar</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr><td>Documento</td> <td>Apellido</td> <td>Nombre</td>   <td>Asistencia</td></tr>
                
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante,index)=>{
                            return <tr key={index}><td>{estudiante.Documento}</td> <td>{estudiante.Apellido}</td> <td>{estudiante.Nombre}</td> 
                            <td><Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} type="checkbox" value={estudiante.asistio} name={estudiante.idCurso_Estudiante} onChange={handleChange("Asistio")} checked={estudiante.asistio=='S'? 'checked': ''}></Checkbox></td></tr>
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
export default RegistroAsistencia