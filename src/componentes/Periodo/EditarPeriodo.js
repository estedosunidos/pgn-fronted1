import axios from "axios";
import React,{useState} from "react";
import  {API_PERIODO,cabeceras} from "../../store/constante"
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
function EditarPeriodo(props){
    const [periodo,setPeriodo]=useState(props.periodo)
    const  handleChange=(prop)=>(event)=>{
        setPeriodo({...periodo,[prop]:event.target.value})

    };
    const editarperiodo=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/"+periodo.IdPeriodo
        const body={
            Descripcion:periodo.Descripcion,
            year:periodo.year,
            Fecha_Inicio:periodo.Fecha_Inicio,
            Fecha_Final:periodo.Fecha_Final
        }
        console.log(JSON.stringify(body));
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
            <h1>EditarPeriodo</h1>
            <form onSubmit={editarperiodo}>
            <label>Descripcion</label>
            <input type="text" value={periodo.Descripcion} onChange={handleChange("Descripcion")}></input>
            <label>Años</label>
            <input type="text" value={periodo.year} onChange={handleChange("year")}></input>
            <label>Fecha Inicia</label>
            <input type="date" value={periodo.Fecha_Inicio} onChange={handleChange("Fecha_Inicio")}></input>
            <label>Fecha Final</label>
            <input type="date" value={periodo.Fecha_Final} onChange={handleChange("Fecha_Final")}></input>
            <button  type="submit"> Editar</button>
            </form>
        </div>
    )
}
export default EditarPeriodo