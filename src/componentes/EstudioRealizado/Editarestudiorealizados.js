import axios from "axios";
import React,{useState} from "react";
import  {API_ESTUDIOSREALIZADO,cabeceras} from "../../store/constante"
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
function Editarestudiorealizados(props){
    const [estudiorealizado,setEstudiorealizado]=useState(props.estudiorealizado)
    const editarestudiorealizado=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ESTUDIOSREALIZADO+"/"+estudiorealizado.Id;
        const body={
            Grado_Academico:estudiorealizado["Grado Academico"],
            Universidad:estudiorealizado["Universidad"],
            idDocente:props.docente["idDocente"]
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El estudio realizado  no fue editado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEstudiorealizado({...estudiorealizado,[prop]:event.target.value})
    }
    return(
        <div>
             <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Editar el Estudio Realizado del Docente</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1"name="Grado Academico" label={'Grado Academico'} margin="normal" value={estudiorealizado["Grado Academico"]} onChange={handleChange("Grado Academico")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic2"name="Universidad"  label={'Universidad'} margin="normal" value={estudiorealizado["Universidad"]} onChange={handleChange("Universidad")} />
                        </FormControl>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarestudiorealizado}>
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
export default Editarestudiorealizados