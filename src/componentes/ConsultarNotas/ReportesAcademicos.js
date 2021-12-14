import React,{useState,useEffect} from "react";
import  {cabeceras,API_NOTAS,API_PERIODO} from "../../store/constante"
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
function ReportesAcademicos(props){
    console.log(props)
    const [estudiante,setEstudiante]=useState(props.estudiante)
    const [carrera,setCarrera]=useState(props.carrera)
    const [periodos,setPeriodos]= useState([])
    const [periodo,setPeriodo]=useState({periodos:[]})
    const [periodo2,setPeriodo2]=useState({})
    console.log(props.estudiante)
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/periodobycarrera/"+carrera.Id
        axios.get(url,{headers:cabeceras}) 
        .then((repuesta)=>{
            console.log(repuesta.data)
            setPeriodos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("los periodo no fueron cargados ")
        })

    },[])
    const handleChange=(prop)=>(event)=>{
        if (prop ==="Periodo"){
            setPeriodo2(event.target.value)
        }
    }
    const consultar=()=>{
        const url=process.env.REACT_APP_API_URL+API_NOTAS+"/returnperiodobycarreraestudiante/"+carrera.Id+"/"+periodo2
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            let repuestas=repuesta.data
            repuestas.periodos=repuestas.periodos.filter((periodos1)=>{
                return periodos1.IdPeriodo==periodo2
            })
            setPeriodo(repuestas)
        })
        .catch(error=>{
            console.log(error)
            alert("La notas no fueron cargados ")
        })
    }
    return(
        <div>
            <label>Reporte Academico</label>
            <label>Periodos:</label>
            <select name="periodo" defaultValue="" onChange={handleChange("Periodo")}>
                <option value="" disabled>Seleccione</option>
                {periodos.map((periodo,index)=>{
                    return <option key={index} value={periodo.IdPeriodo}>{periodo["Descripcion"]}</option>            
                })}
            </select>
            <button onClick={consultar}>Consulta</button>
            {periodo.periodos.map((periodo,index)=>{
                <br></br>
                return <div key={index}><div><label>periodo:{periodo.Descripcion}</label>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table"><TableHead><TableRow><StyledTableCell>Nombre de la Asignatura</StyledTableCell><StyledTableCell>Credito</StyledTableCell><StyledTableCell>Nota</StyledTableCell></TableRow></TableHead><TableBody>
                {periodo.asignaturas.map((asignatura,index1)=>{
                    return <TableRow  key={index1} ><StyledTableCell>{asignatura["Nombre_Asignatura"]}</StyledTableCell><StyledTableCell>{asignatura["Unidad_de_credito"]}</StyledTableCell><StyledTableCell>{asignatura["nota"]}</StyledTableCell></TableRow>
                })}
                </TableBody>
                </Table>
                </TableContainer>
            <br></br>
            <label>Total Creditos semestre: {periodo.creditoporsemestre}</label>
            <br></br>
            <label>Promedio Semestral: {periodo.notaporsemetre}</label>
            <br></br>
            </div></div>
            })}
            <label>Total Creditos Carrera: {periodo.creditoporasignatura}</label>
            <br></br>
            <label>Promedio Carrera: {periodo.promediocarrera}</label>
            <br></br>
        </div>
    )
}
export default ReportesAcademicos