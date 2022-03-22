import React from 'react';
import PropTypes from 'prop-types';

// import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function RegisterForm(props) {
    const { openDialog, onClose, onRegister } = props;

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const { target: { username, password, email } } = evt;

        onRegister(username.value, password.value, email.value);
        onClose();
    };

    return (
        <Dialog
            open={openDialog}
            PaperProps={{
                sx: {
                    minWidth: '50vw'
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Registrieren</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        label="Benutzername"
                        name="username"
                        sx={{
                            marginTop: 1
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="password"
                        label="Passwort"
                        name="password"
                        sx={{
                            marginTop: 1
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        sx={{
                            marginTop: 1
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Abbrechen
                    </Button>
                    <Button type="submit" variant="contained">
                        Registrieren
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}

RegisterForm.propTypes = {
    openDialog: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default RegisterForm;