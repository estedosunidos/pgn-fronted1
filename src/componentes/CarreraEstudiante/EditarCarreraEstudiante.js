import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_CARRERAESTUDIANTE,cabeceras,API_CARRERA} from "../../store/constante"
function EditarCarreraEstudiante(props){
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
    const editarCarreraEstudiante=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERAESTUDIANTE+"/"+ props.carreraestudiante.Id;
        const body={
            IdEstudiante:props.estudiante["idEstudiantes"],
            IdCarrera:carreraestudiante.Carrera

        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("La asignacion de la carrera al estudiante no fue editada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCarreraestudiante({...carreraestudiante,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={editarCarreraEstudiante}>
                <div>
                    <h2>Actualizar el estudio realizado del docente </h2>
                </div>
                <label>Asignatura</label>
                <select name="carrera" onChange={handleChange("Carrera")}>
                        <option value=" " disabled>seleccione</option>
                        {carreras.map((carrera,index)=>{
                            return <option key={index} value={carrera.Id} selected={carrera.Id ==carreraestudiante.IdCarrera  ? true : false}>{carrera.Carrera}</option>   
                        })}
                        </select>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarCarreraEstudiante