import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_ASIGNACIONDOCENTE, cabeceras, API_ASIGNATURA } from "../../store/constante"
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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

function CrearAsignaturaDocente(props) {
    const [asignaciondocente, setAsignaciondocente] = useState({})
    const [asignaturas, setAsignaturas] = useState([])

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + API_ASIGNATURA;
        axios.get(url, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                setAsignaturas(repuesta.data);
            })
            .catch(error => {
                console.log(error)
                alert("Se present?? un error cargando las asignaturas")
            })
    }, []);

    const crearAsignaturaDocentes = ((event) => {
        event.preventDefault()
        const url = process.env.REACT_APP_API_URL + API_ASIGNACIONDOCENTE;
        const body = {
            IdDocente: props.docente["idDocente"],
            IdAsignatura: asignaciondocente.Asignatura

        }
        console.log(JSON.stringify(body));
        axios.post(url, body, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                props.crear();
            })
            .catch(error => {
                console.log(error)
                alert("Se present?? un error asociando la asignatura al docente")
            })
    })

    const handleChange = (prop) => (event) => {
        setAsignaciondocente({ ...asignaciondocente, [prop]: event.target.value })
    }


    return (
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.cancelar()}>
                    <label>Asignaci??n de Asignatura</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>

                            <TextField name="asignaturas"
                                select
                                label={'Asignatura'} margin="normal"
                                value={asignaciondocente.Asignatura}
                                defaultValue=" " onChange={handleChange("Asignatura")}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value=" " disabled selected>
                                    <em>Seleccione</em>
                                </MenuItem>
                                {asignaturas.map((asignatura, index) => {
                                    return <MenuItem key={index} value={asignatura.Id}>{asignatura.Asignaturas}</MenuItem>
                                })}
                            </TextField>

                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={crearAsignaturaDocentes}>
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
export default CrearAsignaturaDocente