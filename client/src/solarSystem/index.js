import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Planet from '../planet_orbit/';

const Div = styled('div')``;
const Img = styled('img')``;

function SolarSystem(props) {
    const { solar_system_id, user, socket } = props;

    const [planetObrits, setPlanetObrits] = useState();

    useEffect(() => {
        const listener = (data) => {
            setPlanetObrits(data);
        };
        socket.on('content of solar_system', listener);
        socket.emit('get content of solar_system', solar_system_id);

        return () => socket.off('content of solar_system', listener);
    }, []);

    const imagePath = `./assets/solar_system/${solar_system_id}.jpg`;

    return (
        <Div sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'black',
            overflow: 'auto'
        }}>
            <Img
                sx={{
                    opacity: 0.5
                }}
                src={imagePath}
            />
            {planetObrits ? planetObrits.map(planet => (
                <Planet
                    key={planet.planet_orbit_id}
                    user={user}
                    socket={socket}
                    {...planet}
                />
            )) : null}
        </Div>
    );
}

SolarSystem.propTypes = {
    solar_system_id: PropTypes.number,
    user: PropTypes.object,
    socket: PropTypes.object
};

export default SolarSystem;