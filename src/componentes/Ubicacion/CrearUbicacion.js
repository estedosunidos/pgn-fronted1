import React,{useState} from "react";
import  {API_UBICACION,cabeceras} from "../../store/constante"
import axios from "axios";
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

function CrearUbicacion(props){
    const [ubucacion,setUbicacion]=useState({})
    const crearubucacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_UBICACION;
        const body={
            Capacidad:ubucacion.Capacidad,
            Direccion:ubucacion.Direccion
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        }) 
        .catch(error=>{
            alert("La ubicacion no fue creado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setUbicacion({...ubucacion,[prop]:event.target.value})
    }
    return(
        <div>
             <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Registra Ubicacion</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1"name="Capacidad" label={'Capacidad'} margin="normal" value={ubucacion.Capacidad} onChange={handleChange("Capacidad")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic2"name="Direccion"  label={'Direccion'} margin="normal" value={ubucacion.Direccion} onChange={handleChange("Direccion")} />
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearubucacion}>
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
export default CrearUbicacion;