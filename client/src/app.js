import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IoWebsocket from 'socket.io-client';

import SolarSystem from './solarSystem';
import LoginForm from './loginForm';
import ControlPanel from './controlPanel';

function App(props) {
    const { config } = props;

    const [user, setUser] = useState();
    const [solarSystem, setSolarSystem] = useState();

    const [socket, setSocket] = useState();

    useEffect(() => {
        const ioSocket = IoWebsocket(config.websocketUrl);

        ioSocket.on("connect", () => {
            const message = `Successfully connected to ${config.websocketUrl} as client: ${ioSocket.id}`;
            console.log(message);
            setSocket(ioSocket);
        });

        ioSocket.on('login successfull', (loggedInUser) => {
            setUser(loggedInUser);
        });

        ioSocket.emit('read solar_system', 1);
        ioSocket.on('solar_system', (solar_system) => setSolarSystem(solar_system));

        return () => {
            ioSocket.close();
            setSocket(null);
        };

    }, []);

    const handleLogin = (username, password) => {
        socket.emit('login', { username, password });
    };

    const handleRegister = (username, password, email) => {
        socket.emit('register', { username, password, email });
    };

    if (!user) {

        return (
            <LoginForm
                onLogin={handleLogin}
                onRegister={handleRegister}
            />
        );
    }

    return (
        <div id="App">
            <SolarSystem
                {...solarSystem}
                socket={socket}
                user={user}
            />
            <ControlPanel />
        </div>
    );
};

App.propTypes = {
    config: PropTypes.object.isRequired
};

export default App;