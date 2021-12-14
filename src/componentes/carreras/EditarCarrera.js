import axios from "axios";
import React,{useState} from "react";
import  {API_CARRERA,cabeceras} from "../../store/constante"
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
function  EditarCarrera(props){
    const [carrera,setCarrera]= useState(props.carrera)
    const  handleChange=(prop)=>(event)=>{
        setCarrera({...carrera,[prop]:event.target.value})

    };
    const editarcarrera=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERA+"/"+carrera.Id;
        const body={Nombre_Carrera:carrera.Carrera ,
            CantidadSemestre:carrera.Semestres,
            TotalCredito:carrera["Total Creditos"]
            }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }
        )
        .catch(error=>{
            alert("Se ha presentado un error")
            console.log(error)
        })

    })
    return(
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Registra Carrera</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1"name="Nombre carrera" label={'Nombre carrera'} margin="normal" value={carrera.Carreras} onChange={handleChange("Carreras")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic2"name="Cantidad de semetres"  label={'Cantidad de semetres'} margin="normal" value={carrera.Semestres} onChange={handleChange("Semestres")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic3"name="Total de creditos" label={'Total de creditos'} margin="normal" value={carrera["Total Creditos"]} onChange={handleChange("Total Creditos")} />
                        </FormControl>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarcarrera}>
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
export  default EditarCarrera;