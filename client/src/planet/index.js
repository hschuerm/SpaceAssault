import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import SpaceStation from '../spaceStation';

const Img = styled('img')``;

function Planet(props) {
    const { planet_orbit_id, position_x, position_y, stations, user, socket } = props;

    const imagePath = `./assets/planet_orbit/${planet_orbit_id}.png`;

    return (
        <div>
            <Img
                sx={{
                    position: 'absolute',
                    top: position_y,
                    left: position_x,
                    width: 200
                }}
                src={imagePath}
            />
            {stations.map(station => (
                <SpaceStation
                    key={station.station_id}
                    user={user}
                    socket={socket}
                    {...station}
                />
            ))}
        </div>
    );
}

Planet.propTypes = {
    planet_orbit_id: PropTypes.number,
    position_x: PropTypes.number,
    position_y: PropTypes.number,
    stations: PropTypes.array.isRequired,
    user: PropTypes.object,
    socket: PropTypes.object
};

export default Planet;