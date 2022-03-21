import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Button, Checkbox, Container, Divider, FormControlLabel, TextField, Typography } from '@mui/material';

const Form = styled('form')``;

function LoginForm(props) {
    const { onLogin, onRegister } = props;

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const { target: { username, password, register } } = evt;

        if (register.checked) {
            onRegister(username.value, password.value);
        } else {
            onLogin(username.value, password.value);
        }

    };

    return (
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
                />
                <FormControlLabel
                    control={
                        <Checkbox name="register" />
                    }
                    label="neu registrieren"
                />
                <Button type="submit" variant="contained">
                    Absenden
                </Button>
            </Form>
        </Container>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default LoginForm;