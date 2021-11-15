import React,{useState} from "react";
import  {API_CARRERA,cabeceras} from "../../store/constante"
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

function CrearCarrera(props){
    const [carrera,setCarrera]=useState({Nombre_Carrera:"",TotalCredito:"",CantidadSemestre:""})
    const crearcarrera=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERA;
        const body={
            Nombre_Carrera:carrera.Nombre_Carrera,
            CantidadSemestre:carrera.CantidadSemestre,
            TotalCredito:carrera.TotalCredito,
            idAdministrador:JSON.parse(localStorage.getItem("perfil"))["idAdministrador"]
        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La carrera no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCarrera({...carrera,[prop]:event.target.value})
    }
    return(
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Registra Carrera</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1"name="Nombre carrera" label={'Nombre carrera'} margin="normal" value={carrera.Nombre_Carrera} onChange={handleChange("Nombre_Carrera")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic2"name="Cantidad de semetres"  label={'Cantidad de semetres'} margin="normal" value={carrera.CantidadSemestre} onChange={handleChange("CantidadSemestre")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic3"  name="Total de creditos"  label={'Total de creditos'} margin="normal" value={carrera.TotalCredito} onChange={handleChange("TotalCredito")} />
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearcarrera}>
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
export default CrearCarrera;