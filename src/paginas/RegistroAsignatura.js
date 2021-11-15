import React,{useEffect,useState} from "react";
import  {API_ESTUDIANTE,cabeceras,API_CARRERA,API_CURSO,API_ASIGNATURA} from "../store/constante"
import axios from "axios";
import SeleccionarAsignatura from "../componentes/Asignatura/SeleccionarAsignatura";
import AsignaturaMatriculada from "../componentes/Asignatura/AsignaturaMatriculada"
function RegistroAsignatura(){
    const [estudiante,setEstudiante]=useState({Carreras:[]})
    const [carrera,setCarrera]=useState({})
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [mostraseleccionarasignatura,setMostraseleccionarasignatura]=useState(false)
    const [mostrarasignaturamatriculada,setMostrarasignaturamatriculada]=useState(false)
    
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
    const cancelar=()=>{
        setMostraseleccionarasignatura(false)
    }
    const borrar=((cursoestudiantes)=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/cursoestudiante/"+cursoestudiantes.idCurso_Estudiante
    
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setMostrarasignaturamatriculada(!mostrarasignaturamatriculada)
        })
        .catch(error=>{
            console.log(error)
            alert("El estudiante elimino la asignatura que elimino")
        })
    })
    const confirmar=(curso)=>{
        const url = process.env.REACT_APP_API_URL+API_CURSO+"/cursoestudiante"
        const body={
            IdCurso:curso.IdCurso,
            IdEstudiante:estudiante.idEstudiantes,
            Idcarreraestudiante:carrera.Id
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setMostrarasignaturamatriculada(!mostrarasignaturamatriculada)
            setMostraseleccionarasignatura(false)
        })
        .catch(error=>{
            console.log(error)
            alert("El estudiante se matriculo")
        })
    }
    const returnasignatura=(Id)=>{
        const url = process.env.REACT_APP_API_URL+API_ASIGNATURA+"/carreraestudiante/"+Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setAsignaturas(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("La asignatura no fueron cargada")
        })

    }
    const handleChange=(prop)=>(event)=>{
        if(prop ==="Carrera"){
            returnasignatura(event.target.value)
            setCarrera(estudiante.Carreras.find((objeto)=> objeto.Id == event.target.value))
            setMostrarasignaturamatriculada(!mostrarasignaturamatriculada)
        }else{
            setAsignatura(asignaturas.find((objeto)=> objeto.Id==event.target.value))
        }
    }
    const adiccionar=()=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/cursomatriculado/"+carrera.Id+"/"+asignatura.Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            let curso=repuesta.data
            if (curso.length>0){
               alert("el curso ya esta matriculado")
            }else{
                setMostraseleccionarasignatura(true)
            }
        })
        .catch(error=>{
            console.log(error)
            alert("no se pudo listar los curso exitosamente")
        })
    }
    return (
        <div>
            <h1>Registro de asignatura</h1>
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
            <div>
                <label>Asignaturas: </label>
                <select name="asignatura" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asignatura,index)=>{
                    return <option key={index} value={asignatura.Id}>{asignatura["Nombre Asignatura"]}</option>            
                })}
            </select>
            <button onClick={adiccionar}>Seleccionar</button>
            </div>
            {mostraseleccionarasignatura && <SeleccionarAsignatura asignatura={asignatura} cancelar={cancelar} confirmar={confirmar}></SeleccionarAsignatura>}
            <AsignaturaMatriculada carrera={carrera}  appState={mostrarasignaturamatriculada} borrar={borrar}></AsignaturaMatriculada>
        </div>
    )
}
export default RegistroAsignatura