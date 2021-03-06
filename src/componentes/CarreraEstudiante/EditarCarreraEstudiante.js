import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_CARRERAESTUDIANTE,cabeceras,API_CARRERA} from "../../store/constante"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function EditarCarreraEstudiante(props){
    const [carreraestudiante,setCarreraestudiante]=useState({})
    const [carreras,setCarreras]=useState([])
    useEffect(()=>{
        console.log(props.carreraestudiante.Id)
        const urlcarrera=process.env.REACT_APP_API_URL+API_CARRERA;
        const urlasignacioncarrera=process.env.REACT_APP_API_URL+API_CARRERA+"/carreraestudiante/"+props.carreraestudiante.Id
        const axiocarrera= axios.get(urlcarrera,{headers:cabeceras})
        const axioasignacioncarrera= axios.get(urlasignacioncarrera,{headers:cabeceras})
        axios.all([axiocarrera,axioasignacioncarrera])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
                console.log(repuesta.data)
                if(index===0){
                    setCarreras(repuesta.data)
                }else{
                    let asignacionestudiante1=repuesta.data
                    if(asignacionestudiante1.length>0){
                        console.log(asignacionestudiante1[0])
                        setCarreraestudiante(asignacionestudiante1[0])
                    }
                }
            })
        }))
        .catch(axios.spread((...errores)=>{
            errores.map((error,index)=>{
                console.log(error)
                if (index===0){
                    alert("La carrera no fueron listada")
                }else if(index===1){
                    alert("")
                }
            })
        })) 
    },[]);
    const editarCarreraEstudiante=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERAESTUDIANTE+"/"+ props.carreraestudiante.Id;
        const body={
            IdEstudiante:props.estudiante["idEstudiantes"],
            IdCarrera:carreraestudiante.Carreras
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
                    <h2>Actualizar la carrera al estudiante </h2>
                </div>
                <label>Asignatura</label>
                <select name="carrera" onChange={handleChange("Carreras")}>
                        <option value=" " disabled>seleccione</option>
                        {carreras.map((carrera,index)=>{
                            return <option key={index} value={carrera.Id} selected={carrera.Id ==carreraestudiante.IdCarrera  ? true : false}>{carrera.Carreras}</option>   
                        })}
                        </select>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarCarreraEstudiante