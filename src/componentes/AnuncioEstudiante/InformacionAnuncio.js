import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@material-ui/core';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formLabel: {
        margin: theme.spacing(2, 0, 0, 0),
        justify: 'center',
        color: theme.palette.primary.dark
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


function InformacionAnuncio(props) {
    console.log(props)
    const [informacion, setInformacion] = useState(props.informacion)
    const classes = useStyles();
    return (
        <div>
            <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Detalle de Mensaje</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ minWidth: 400 }}>

                        <FormLabel component="legend" className={classes.formLabel}>Docente</FormLabel>
                        <InputLabel>{informacion.Nombre + " " + informacion.Apellido}</InputLabel>
                        <FormLabel component="legend" className={classes.formLabel}>Asignatura</FormLabel>
                        <InputLabel>{informacion["Nombre_Asignatura"]}</InputLabel>
                        <FormLabel component="legend" className={classes.formLabel} >Grupo</FormLabel>
                        <InputLabel>{informacion.Grupo}</InputLabel>
                        <FormLabel component="legend" className={classes.formLabel} >Mensaje</FormLabel>
                        <InputLabel>{informacion.Mensaje}</InputLabel>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={() => props.cancelar()}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
export default InformacionAnuncio