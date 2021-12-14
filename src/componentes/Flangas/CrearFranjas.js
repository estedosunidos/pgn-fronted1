import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_UBICACION, cabeceras, API_FRANJAS } from "../../store/constante"
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
import TimePicker from '@mui/lab/TimePicker';
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
function CrearFranjas(props) {
    const [ubicaciones, setUbicaciones] = useState([])
    const [franja, setFranja] = useState({ ubicacion: "", hora_inicio: "", hora_fin: "", dia: "" })
    const [dias, setDias] = useState(["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"])
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + API_UBICACION;
        axios.get(url, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                setUbicaciones(repuesta.data);
            })
            .catch(error => {
                alert("La franja no fue creada")
                console.log(error)
            })
    }, []);
    const handleChange = (prop) => (event) => {
        setFranja({ ...franja, [prop]: event.target.value })
    }
    const crearfranja = ((event) => {
        event.preventDefault()
        const url = process.env.REACT_APP_API_URL + API_FRANJAS
        const body = {
            HoraInicio: "1970-01-01 " + franja["hora_inicio"].getHours() + ':' + franja["hora_inicio"].getMinutes()+ ":00",
            HoraFinal: "1970-01-01 " + franja["hora_fin"].getHours() + ':' + franja["hora_inicio"].getMinutes() + ":00",
            Dia: franja["dia"],
            idUbicacion: franja["ubicacion"],
            IdCurso: props.curso
        }
        axios.post(url, body, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                props.crear();
            })
            .catch(error => {
                alert("La franjas no fue creada")
                console.log(error)
            })
    })
    return (
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Ubicacion</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField name="Ubicaciones"
                                select
                                label={'Ubicacion'} margin="normal"
                                value={franja["ubicacion"]}
                                defaultValue=" " onChange={handleChange("ubicacion")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled selected>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {ubicaciones.map((ubicacion, index) => {
                                    return <MenuItem key={index} value={ubicacion.Id}>{ubicacion.Ubicacion}</MenuItem>
                                })}
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField name="dia"
                                select
                                label={'Dia'} margin="normal"
                                value={franja["dia"]}
                                defaultValue=" " onChange={handleChange("dia")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled selected>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {dias.map((dia, index) => {
                                    return <MenuItem key={index} value={dia}>{dia}</MenuItem>
                                })}
                            </TextField>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Hora Inicial"
                            value={franja["hora_inicio"]}
                            onChange={(newvalue) => {
                                setFranja({ ...franja, ["hora_inicio"]: newvalue })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                       <TimePicker
                            label="Hora Final"
                            value={franja["hora_fin"]}
                            onChange={(newvalue) => {
                                setFranja({ ...franja, ["hora_fin"]: newvalue })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearfranja}>
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
export default CrearFranjas