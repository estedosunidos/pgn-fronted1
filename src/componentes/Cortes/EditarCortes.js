import React,{useState} from "react";
import axios from "axios";
import  {API_CORTE,cabeceras} from "../../store/constante"
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
function EditarCortes(props){
    const [corte,setCorte]=useState(props.corte)
    const crearcortes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CORTE+"/"+corte.Id;
        const body={
            Descripcion:corte.Descripcion
        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El corte academico no se pudo actualizar exitosamente ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCorte({...corte,[prop]:event.target.value})
    }
    return(
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Actualizar  Corte Academico</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <TextField id="standard-basic" label="Corte Academico" variant="standard" value={corte.Descripcion} onChange={handleChange("Descripcion")} />
                     
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearcortes}>
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
export default EditarCortes