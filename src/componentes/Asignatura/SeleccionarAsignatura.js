import React,{useEffect,useState} from "react";
import  {API_CURSO,cabeceras} from "../../store/constante"
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function SeleccionarAsignatura(props){
    const [cursos,setCursos]=useState([])
    const [curso,setCurso]=useState()
    useEffect(()=>{
        console.log(props.asignatura)
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/docenteasignatura/"+props.asignatura.Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setCursos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("No se adiccionaro la asignatura buscada")

        })
    },[])
    const handleChange=(prop)=>(event)=>{
        setCurso(cursos.find((objeto)=>objeto.IdCurso==event.target.value))
    }
    return (
        <div>
            <div>
                <label>{props.asignatura["Nombre Asignatura"]}</label>
                <table>
                    <thead>
                        <tr><td>Grupo</td> <td>Docente</td> <td>Dia</td><td>Hora Inicio</td>  <td>Hora Final</td> <td>Ubicacion </td><td>Seleccionar</td></tr>
                    </thead>
                    <tbody>
                {cursos.map((curso,index)=>{
                    return <tr key={index}><td>{curso.Grupo}</td><td>{curso.Nombre+" "+curso.Apellido}</td><td>{curso.Franjas.map((franja,index1)=>{
                        return <div key={index1}><label>{franja.Dia}</label></div>
                    })}</td><td>{curso.Franjas.map((franja,index1)=>{
                        return <div key={index1}><label>{franja.HoraInicio}</label></div>
                    })}</td><td>{curso.Franjas.map((franja,index1)=>{
                        return <div key={index1}><label>{franja.HoraFinal}</label></div>
                    })}</td><td>{curso.Franjas.map((franja,index1)=>{
                        return <div key={index1}><label>{franja.Direccion}</label></div>
                    })}</td><input type="radio" name="curso" value={curso.IdCurso} onChange={handleChange("Curso")}></input></tr>
                })}
                </tbody>
                </table>
            </div>
            <button onClick={()=>props.confirmar(curso)}>Confirmar</button>
            <button onClick={()=>props.cancelar()}>Cancelar</button>
        </div>
    )
}
export default SeleccionarAsignatura