import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Spaceship from '../spaceship';
import StationAdministrator from '../station_administrator';
import { Typography } from '@mui/material';

const SHIP_X_OFFSET = 30;
const SHIP_Y_OFFSET = 30;

const Div = styled('div')``;
const Img = styled('img')``;

function SpaceStation(props) {
    const { station, socket, user } = props;
    const { station_id, name, position_x, position_y, docked_ships } = station;

    const [showName, setShowName] = useState(false);

    const imagePath = `./assets/space_station/${station_id}.png`;

    const handleClick = () => {
        socket.emit('user changed station', {
            user_id: user.user_id,
            new_station_id: station_id
        });
    };

    const handleMouseEnter = () => {
        setShowName(true);
    };

    const handleMouseLeave = () => {
        setShowName(false);
    };

    return (
        <Div
            sx={{
                position: 'absolute',
                top: position_y,
                left: position_x,
                cursor: "pointer"
            }}
            onClick={handleClick}
        >
            <Typography sx={{ visibility: showName ? "visible" : "hidden" }} color="white" align="center">{name}</Typography>
            <Img
                sx={{
                    width: 80
                }}
                src={imagePath}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {docked_ships && docked_ships.map((ship, index) => (
                <Spaceship
                    key={ship.spaceship_id}
                    {...ship}
                    left={(index + 1) * SHIP_X_OFFSET}
                    top={50 + (index + 1) * SHIP_Y_OFFSET}
                />
            ))}
            <StationAdministrator
                station={station}
                user={user}
                socket={socket}
            />
        </Div>
    );
}

SpaceStation.propTypes = {
    station: PropTypes.shape({
        name: PropTypes.string,
        station_id: PropTypes.number,
        position_x: PropTypes.number,
        position_y: PropTypes.number,
        docked_ships: PropTypes.array
    }),
    user: PropTypes.object,
    socket: PropTypes.object
};

export default SpaceStation;