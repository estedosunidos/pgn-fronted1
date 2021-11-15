import React,{useState} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras} from "../../store/constante"
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
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField'
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
function CrearAsignatura(props){
    const [asignatura,setAsignatura]=useState(props.asignatura)
    const crearasignaturas=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        const body={
            Nombre_Asignatura:asignatura.Nombre_Asignatura,
            Semestre:asignatura.Semestre,
            Descripcion:asignatura.Descripcion,
            Unidad_de_credito:asignatura.Unidad_de_credito,
            Observacion:asignatura.Observacion,
            Contenido:asignatura.Contenido,
            idAdministrador:JSON.parse(localStorage.getItem("perfil"))["idAdministrador"]
        }
    
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La asignatura no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignatura({...asignatura,[prop]:event.target.value})
    }
    return(
        <div>
             <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Registra  Asignatura</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1"name="Nombre Asignatura" label={'Nombre Asignatura'} margin="normal" value={asignatura.Nombre_Asignatura} onChange={handleChange("Nombre_Asignatura")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic2"name="Semestre"  label={'Semestre'} margin="normal" value={asignatura.Semestre} onChange={handleChange("Semestre")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic3"name="Descripcion"  label={'Descripcion'} margin="normal" value={asignatura.Descripcion} onChange={handleChange("Descripcion")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic4"name="Unida de credito"  label={'Unida de credito'} margin="normal" value={asignatura.Unidad_de_credito} onChange={handleChange("Unidad_de_credito")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic5"name="Observacion"  label={'Observacion'} margin="normal" value={asignatura.Observacion} onChange={handleChange("Observacion")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic6"name="Contenido"  label={'Contenido'} margin="normal" value={asignatura.Contenido} onChange={handleChange("Contenido")} />
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearasignaturas}>
                        Crear
                    </Button>
                    <Button color="secondary" onClick={() => props.cancelar()}>
                        Cancelar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
export default CrearAsignatura