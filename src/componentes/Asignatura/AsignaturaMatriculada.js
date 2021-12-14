import React,{useEffect,useState} from "react";
import  {cabeceras,API_CURSO} from "../../store/constante"
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function AsignaturaMatriculada(props){
    const [cursos,setCursos]=useState([])
    useEffect(()=>{
        console.log(0)
        const url =process.env.REACT_APP_API_URL+API_CURSO+"/asignaturacurso/"+props.carrera.Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setCursos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("El estudiante no fue cargado")
        })
    },[props.appState])
    return(
        <div>
             <tabla>
                <thead>
                    <tr> <td>Asignatura</td> <td>Grupo</td> <td>Docente</td> <td>Dia</td> <td>Hora Inicio</td> <td>Hota Final</td> <td>Ubicacion</td><td>Acciones</td></tr>
                </thead>
                <tbody>
                    {cursos.map((curso,index)=>{
                        return <tr key={index}><td>{curso["Nombre_Asignatura"]}</td><td> {curso.Grupo}</td><td> {curso.Nombre+" "+curso.Apellido}</td><td>{curso.Franjas.map((franja,index1)=>{
                            return <div key={index1}><label>{franja.Dia}</label></div>
                        })}</td><td>{curso.Franjas.map((franja,index1)=>{
                            return <div key={index1}><label>{franja.HoraInicio}</label></div>
                        })}</td><td>{curso.Franjas.map((franja,index1)=>{
                            return <div key={index1}><label>{franja.HoraFinal}</label></div>
                        })}</td><td>{curso.Franjas.map((franja,index1)=>{
                            return <div key={index1}><label>{franja.Direccion}</label></div>
                        })}</td><button onClick={()=>props.borrar(curso)}>Borrar</button></tr>
                    })}
                </tbody>
            </tabla>
        </div>
    )
}
export default AsignaturaMatriculada