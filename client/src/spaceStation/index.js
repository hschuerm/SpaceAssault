import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Spaceship from '../spaceship';
import StationAdministrator from '../station_administrator';

const SHIP_X_OFFSET = 30;
const SHIP_Y_OFFSET = 30;

const Img = styled('img')``;

function SpaceStation(props) {
    const { station_id, position_x, position_y, docked_ships, socket, user } = props;

    const imagePath = `./assets/space_station/${station_id}.png`;

    const handleClick = () => {
        socket.emit('user changed station', {
            user_id: user.user_id,
            new_station_id: station_id
        });
    };

    const loggedInUserIsDocked = Boolean(docked_ships.find(ship => ship.user && user.user_id === ship.user.user_id));

    return (
        <div onClick={handleClick}>
            <Img
                sx={{
                    position: 'absolute',
                    top: position_y,
                    left: position_x,
                    width: 80
                }}
                src={imagePath}
            />
            {docked_ships && docked_ships.map((ship, index) => (
                <Spaceship
                    key={ship.spaceship_id}
                    {...ship}
                    left={(index + 1) * SHIP_X_OFFSET + position_x}
                    top={(index + 1) * SHIP_Y_OFFSET + position_y}
                />
            ))}
            {loggedInUserIsDocked && <StationAdministrator />}
        </div>
    );
}

SpaceStation.propTypes = {
    station_id: PropTypes.number,
    position_x: PropTypes.number,
    position_y: PropTypes.number,
    docked_ships: PropTypes.array,
    user: PropTypes.object,
    socket: PropTypes.object
};

export default SpaceStation;