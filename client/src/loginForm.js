import React from 'react';
import PropTypes from 'prop-types';

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

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
        <form onSubmit={handleSubmit}>
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
            <Button type="submit">
                Absenden
            </Button>
        </form>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default LoginForm;