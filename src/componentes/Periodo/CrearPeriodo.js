import axios from "axios";
import React, { useState } from "react";
import { API_PERIODO, cabeceras } from "../../store/constante"
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
function Crearperiodo(props) {
    const [periodo, setPeriodo] = useState(props.periodo)
    const crearperiodo = ((event) => {
        event.preventDefault()
        const url = process.env.REACT_APP_API_URL + API_PERIODO
        console.log(url)
        const body = {
            Descripcion: periodo.Descripcion,
            year: periodo.year,
            Fecha_Inicio: periodo["Fecha_Inicio"],
            Fecha_Final: periodo["Fecha_Final"]
        }
        console.log("hhhhh", JSON.stringify(body));
        axios.post(url, body, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                props.crear();
            }
            )
            .catch(error => {
                alert("Se ha presentado un error")
                console.log(error)
            })
    })
    const handleChange = (prop) => (event) => {
        setPeriodo({ ...periodo, [prop]: event.target.value })
    }
    return (
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Crear Periodo</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                    <FormControl fullWidth>
                    <TextField id="standard-basic1"name="Descripcion" label={'Descripcion'} margin="normal" value={periodo.Descripcion} onChange={handleChange("Descripcion")} />
                    </FormControl>
                    <FormControl fullWidth>
                    <TextField id="standard-basic2"name="Años"  label={'Años'} margin="normal" value={periodo.year} onChange={handleChange("year")} />
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                    label="Fecha Inicia"
                    inputFormat="MM/dd/yyyy"
                    value={periodo["Fecha_Inicio"]}
                    onChange={(newvalue) => {
                    setPeriodo({ ...periodo,["Fecha_Inicio"]: newvalue })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                    label="Fecha Final"
                    inputFormat="MM/dd/yyyy"
                    value={periodo["Fecha_Final"]}
                    onChange={(newvalue) => {
                    setPeriodo({ ...periodo,["Fecha_Final"]: newvalue })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearperiodo}>
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
export default Crearperiodo