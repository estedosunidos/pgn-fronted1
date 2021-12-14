import React,{useEffect,useState} from "react";
import  {API_EVALUACIONTIPO,cabeceras} from "../../store/constante"
import axios from "axios";
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
import DialogContentText from '@mui/material/DialogContentText';
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
function Editarevaluaciontipo(props){
    const [evaluaciontipo,setEvaluaciontipo]=useState(props.evaluaciontipo)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const editarplanevaluacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO+"/"+evaluaciontipo.Id;
        const body={
            Descripcion:evaluaciontipo.Descripcion
        }
        console.log(body)
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }) 
        .catch(error=>{
            console.log(error)
            setTextError("Se presento un error a intentar a actualizar el tipo de evaluacion")
            setShowError(true)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEvaluaciontipo({...evaluaciontipo,[prop]:event.target.value})
    }
    return(
        <div>
             <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Crear evaluaciones tipo</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <TextField id="standard-basic" label="Descripcion" variant="standard" value={evaluaciontipo.Descripcion} onChange={handleChange("Descripcion")} />
                     
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarplanevaluacion}>
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
export default Editarevaluaciontipo