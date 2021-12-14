import React,{useState,useEffect} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras,API_CURSO,API_DOCENTE,API_PERIODO} from "../../store/constante"
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
function EditarCurso(props){
    const [asignaturas,setAsignaturas]=useState([])
    const [docentes,setDocentes]=useState([])
    const [periodos,setPeriodos]=useState([])
    const [curso,setCurso]=useState({Grupo:"",IdCurso:"",idAsignatura:"",IdDocente:"",IdPeriodo:""})
    const [asignatura,setAsignatura]=useState(props.asignatura)
    useEffect(()=>{
        const urlasignatura=process.env.REACT_APP_API_URL+API_ASIGNATURA
        const urlperiodo=process.env.REACT_APP_API_URL+API_PERIODO
        const urlcurso=process.env.REACT_APP_API_URL+API_CURSO+"/"+props.curso.Id
        const axiosasignatura=axios.get(urlasignatura,{headers:cabeceras})
        const axiosperiodo=axios.get(urlperiodo,{headers:cabeceras})
        const axioscurso=axios.get(urlcurso,{headers:cabeceras})
        axios.all([axiosasignatura,axiosperiodo,axioscurso])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
            console.log(repuesta.data)
             if (index=== 0){
                setAsignaturas(repuesta.data);
             }else if (index===1){
                setPeriodos(repuesta.data)
             } else if (index===2){
                const cursos=repuesta.data
                if (cursos.length>0){
                    setCurso(cursos[0])
                    returndocente(cursos[0].idAsignatura)
                }
             }
            })
        }))
         .catch(axios.spread((...errores)=>{
             errores.map((error,index)=>{
                 console.log(error)
                 if (index===0){
                    alert("La asignatura  no fueron listada")
                 }else if(index===1){
                    alert("Los periodos no fueron cargadas")
                 }else if (index===2){
                    alert("Los curso no fueron listada")
                 }
             })
         })) 
    },[])
    const editarcurso=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/"+curso.IdCurso;
        const body={
            Grupo:curso.Grupo,
            idAsignatura:curso.idAsignatura,
            IdDocente:curso.IdDocente,
            IdPeriodo:curso["IdPeriodo"]
        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("Los curso no fue creada")
            console.log(error)
        })
    })
    const returndocente=((Id)=>{
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/asignatura/"+Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setDocentes(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("Los docente no pudieron ser  cargados")
        })   
    })
    const handleChange=(prop)=>(event)=>{
        if (prop==="idAsignatura"){
            returndocente(event.target.value)
        }
        setCurso({...curso,[prop]:event.target.value})
    }
    return(
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Actualizar  Curso</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1" name="Grupo" label={'Grupo'} margin="normal" value={curso.Grupo} onChange={handleChange("Grupo")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField name="Asignatura"
                                select
                                label={'Asignatura'} margin="normal"
                                value={curso.idAsignatura}
                                defaultValue=" " onChange={handleChange("idAsignatura")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {asignaturas.map((asignatura, index) => {
                                    return <MenuItem key={index} value={asignatura.Id} selected={asignatura.Id ==curso.idAsignatura ? true : false}>{asignatura.Asignaturas}</MenuItem>
                                })}
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField name="docentes"
                                select
                                label={'Docente'} margin="normal"
                                value={curso.IdDocente}
                                defaultValue=" " onChange={handleChange("IdDocente")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled selected>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {docentes.map((docente, index) => {
                                    return <MenuItem key={index} value={docente.Id} selected={docente.Id ==curso.IdDocente ? true : false}>{docente.Nombre + " " + docente.Apellido}</MenuItem>
                                })}
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField name="periodos"
                                select
                                label={'Periodo'} margin="normal"
                                value={curso.IdPeriodo}
                                defaultValue=" " onChange={handleChange("IdPeriodo")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled selected>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {periodos.map((periodo, index) => {
                                    return <MenuItem key={index} value={periodo.IdPeriodo} selected={periodo.IdPeriodo == curso.IdPeriodo ? true : false}>{periodo.Descripcion}</MenuItem>
                                })}
                            </TextField>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarcurso}>
                        Editar
                    </Button>
                    <Button color="secondary" onClick={() => props.cancelar()}>
                        Cancelar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
export default EditarCurso