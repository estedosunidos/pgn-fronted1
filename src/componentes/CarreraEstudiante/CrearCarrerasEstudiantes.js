import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_CARRERAESTUDIANTE,cabeceras,API_CARRERA} from "../../store/constante"
function CrearAsignaturaDocente(props){
    const [carreraestudiante,setCarreraestudiante]=useState({})
    const [carreras,setCarreras]=useState([])
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCarreras(repuesta.data);
        })
    },[]);
    const crearCarreraEstudiante=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERAESTUDIANTE
        const body={
            IdEstudiante:props.estudiante.idEstudiantes,
            IdCarrera:carreraestudiante.Carreras

        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La asignacion de la carrera al estudiante no fue asociada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCarreraestudiante({...carreraestudiante,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                    <h2>Registra el estudio realizado del docente </h2>
                </div>
                <form onSubmit={crearCarreraEstudiante}>
                <label>Carrera</label>
                <select name="Carreras"  onChange={handleChange("Carreras")}>
                        <option value=" " disabled selected>seleccione</option>
                        {carreras.map((carrera,index)=>{
                            return <option key={index} value={carrera.Id}>{carrera["Carrera"]}</option>
                        })}
                        </select>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignaturaDocente