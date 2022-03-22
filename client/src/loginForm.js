import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Button, Container, Divider, Link, Paper, TextField, Typography } from '@mui/material';

import RegisterForm from './registerForm';

const Form = styled('form')``;

function LoginForm(props) {
    const { onLogin, onRegister } = props;

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const { target: { username, password } } = evt;

        onLogin(username.value, password.value);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleLinkClick = () => {
        setDialogOpen(true);
    };

    return (
        <Paper
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh"
            }}
        >
            <Container maxWidth="xs">
                <Typography variant="h2" align="center">
                    Space Assault
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Databse Engineering
                </Typography>
                <Typography variant="subtitle2" align="center" sx={{
                    color: "#9c9c9c"
                }}>
                    von Louisa Unland und Hendrik Schürmann
                </Typography>
                <Divider
                    sx={{
                        marginTop: 3,
                        marginBottom: 3
                    }}
                />
                <Form
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        label="username"
                        name="username"
                    />
                    <TextField
                        required
                        fullWidth
                        type="password"
                        label="password"
                        name="password"
                        sx={{
                            marginTop: 1,
                            marginBottom: 2
                        }}
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Form>
                <Link
                    component="button"
                    underline="hover"
                    onClick={handleLinkClick}
                    sx={{
                        marginTop: 1
                    }}
                >
                    Noch kein Account? Hier Registrieren
                </Link>
                <RegisterForm
                    onRegister={onRegister}
                    openDialog={dialogOpen}
                    onClose={handleDialogClose}
                />
            </Container>
        </Paper>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default LoginForm;