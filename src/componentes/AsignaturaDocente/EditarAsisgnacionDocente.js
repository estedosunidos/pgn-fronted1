import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_ASIGNACIONDOCENTE,cabeceras,API_ASIGNATURA} from "../../store/constante"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

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

function EditarAsisgnacionDocente(props){
    const [asignaciondocente,setAsignaciondocente]=useState({Id:""})
    const [asignaturas,setAsignaturas]=useState([])
    useEffect(()=>{
        console.log(props)
        const urlAsignatura=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        const urlasignaciondocente=process.env.REACT_APP_API_URL+API_ASIGNATURA+"/asignaturadocente/"+props.asignaciondocente.Id
        const axisasignatura =axios.get(urlAsignatura,{headers:cabeceras})
        const axiosasignaciondocente=axios.get(urlasignaciondocente,{headers:cabeceras})
        axios.all([axisasignatura,axiosasignaciondocente])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
                console.log(repuesta.data)
                if(index===0){
                    setAsignaturas(repuesta.data)
                }else{
                    let asignaturadocente1=repuesta.data
                    if(asignaturadocente1.length>0){
                        console.log(asignaturadocente1[0])
                        setAsignaciondocente(asignaturadocente1[0])
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
                    alert("")
                }
            })
        })) 
    },[]);
    const editarAsignaturaDocentes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNACIONDOCENTE+"/"+props.asignaciondocente.Id;
        console.log(props.docente)
        const body={
            IdDocente:props.docente["idDocente"],
            IdAsignatura:asignaciondocente.Id

        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("La asignacion de la asignatura al docente no fue editada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignaciondocente({...asignaciondocente,[prop]:event.target.value})
    }
    return(
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Asignación de Asignatura</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        
                        <InputLabel id="demo-simple-select-label">Asignatura</InputLabel>
                        <FormControl fullWidth>

                            <TextField name="asignaturas"
                                select
                                label={'Asignatura'} margin="normal"
                                value={asignaciondocente.Id}
                                defaultValue=" " onChange={handleChange("Id")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {asignaturas.map((asignatura, index) => {
                                    return <MenuItem key={index} value={asignatura.Id} selected={asignatura.Id == asignaciondocente.Id ? true : false}>{asignatura.Asignatura}</MenuItem>
                                })}
                            </TextField>

                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarAsignaturaDocentes}>
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
export default EditarAsisgnacionDocente