import axios from "axios"
import { useEffect } from "react"
import { API_ANUNCIO, cabeceras } from "../../store/constante"
import React, { useState } from "react";
import InformacionAnuncio from "./InformacionAnuncio"
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
function AnuncioEstudiante() {
    const [anunciosestudiante, setAnuciosestudiante] = useState({})
    const [anunciosestudiantes, setAnuciosestudiantes] = useState([])
    const [appState, setAppState] = useState(false)
    const [mostrainformacion, setMostrainformacion] = useState(false)
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + API_ANUNCIO + "/anuncioporestudiante/" + 1
        axios.get(url, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data)
                setAnuciosestudiantes(repuesta.data)
            })
            .catch(error => {
                alert("Los anuncios no pudieron ser cargado")
                console.log(error)
            })
    }, [appState])
    const actualizarleido = ((mensaje) => {
        const url = process.env.REACT_APP_API_URL + API_ANUNCIO + "/anuncioporestudiante"
        const body = {
            IdAnuncio: mensaje.IdAnuncio,
            leido: "S",
            IdEstudiante: mensaje.IdEstudiante
        }
        axios.post(url, body, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
            })
            .catch(error => {
                alert("El mensaje no fue leido")
                console.log(error)
            })
    })
    const muestramodal = ((mensaje) => {
        setMostrainformacion(true)
        setAnuciosestudiante(mensaje)
        actualizarleido(mensaje)
    })
    const cancelar = (() => {
        setMostrainformacion(false)
    })
    return (
        <div>
            <BootstrapDialog
                onClose={cancelar}
                aria-labelledby="customized-dialog-title1"
                open={true}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={cancelar}>
                    <label>Mensajes</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ minWidth: 400 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                                <TableHead><TableRow><StyledTableCell>Fecha</StyledTableCell><StyledTableCell>Mensaje</StyledTableCell><StyledTableCell>Asignatura</StyledTableCell></TableRow>
                                </TableHead>
                                <TableBody>{anunciosestudiantes.map((anuncioestudiante1, index) => {
                                    return <TableRow key={index} onClick={() => { muestramodal(anuncioestudiante1) }}><StyledTableCell>{anuncioestudiante1.Fecha}</StyledTableCell><StyledTableCell>{anuncioestudiante1.Mensaje}</StyledTableCell><StyledTableCell>{anuncioestudiante1["Nombre_Asignatura"] + "-" + anuncioestudiante1.Grupo}</StyledTableCell></TableRow>
                                })}</TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={cancelar}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            {mostrainformacion && <InformacionAnuncio informacion={anunciosestudiante} cancelar={cancelar}></InformacionAnuncio>}
        </div>
    )
}
export default AnuncioEstudiante