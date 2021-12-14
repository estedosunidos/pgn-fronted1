import React,{useEffect,useState} from "react";
import  {API_ESTUDIANTE,cabeceras} from "../store/constante"
import axios from "axios";
import ConsultarHorario from "../componentes/Horario/ConsultarHorario";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Consultarhorario(props){
    const [estudiante,setEstudiante]=useState({Carreras:[]})
    const [carrera,setCarrera]=useState()
    const [mostrahorario,setMostrahorario]=useState(false)
    const [horarios,setHorarios]=useState([])
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const url=process.env.REACT_APP_API_URL+API_ESTUDIANTE+"/documento/"+ documento
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            let estudiante1=repuesta.data
            if(estudiante1.length>0){
                setEstudiante(estudiante1[0])
            }
        })
        .catch((error)=>{
            console.log(error)
            setTextError("El estudiante no fue cargado")
            setShowError(true)
        })
    },[])
    const handleChange=(prop)=>(event)=>{
        if(prop ==="Carrera"){
            setCarrera(estudiante.Carreras.find((objeto)=> objeto.Id == event.target.value))
        }
    }
    const consultar=(()=>{
        const url =process.env.REACT_APP_API_URL+API_ESTUDIANTE+"/consultahorario/"+carrera.Id
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            setHorarios(repuesta.data)
            setMostrahorario(true)
        })
        .catch((error)=>{
            console.log(error)
            setTextError("El horario no fue cargado")
            setShowError(true)
        })
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        
        <div>
            <label>Consultar Horario </label>
            <br></br>
            <label> Nombre:{estudiante.Nombre} </label>
            <label>Apellido:{estudiante.Apellido} </label>
            <br></br>
            <label>Carrera</label>
            <br></br>
            <select name="carrera" defaultValue="" onChange={handleChange("Carrera")}>
                <option value="" disabled>Seleccione</option>
                {estudiante.Carreras.map((carrera,index)=>{
                     return <option key={index} value={carrera.Id}>{carrera["Nombre Carrera"]}</option>            
            })}
            <br></br>
             </select>
            <label> Semestre: {estudiante.Semestre} </label>
            <br></br>
             <label>Consultar</label>
             <button onClick={consultar}>Consultar Horario</button>
             {mostrahorario && <ConsultarHorario data={horarios}></ConsultarHorario>}
             {showError && <Dialog onClose={handleClose} open={showError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-error">{textError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>}
        </div>
    )
}
export default Consultarhorario