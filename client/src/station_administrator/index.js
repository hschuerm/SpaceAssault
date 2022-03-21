import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import StationAdminstatorMenu from './stationAdminstatorMenu';

const Img = styled('img')``;
const Div = styled('div')``;

function StationAdministrator(props) {
    const { socket, user, station } = props;

    const [stationAdministrator, setStationAdministrator] = useState();

    useEffect(() => {
        if (socket) {
            socket.on(`administrator of station with id ${station.station_id}`, (newStationAdministrator) => {
                setStationAdministrator(newStationAdministrator);
            });
            socket.emit('load station administrator', station.station_id);
        }
    }, [socket]);

    const loggedInUserIsDocked = Boolean(station.docked_ships.find(ship => ship.user && user.user_id === ship.user.user_id));
    if (!loggedInUserIsDocked || !stationAdministrator) {

        return null;
    }

    const { station_administrator_id, sa_name } = stationAdministrator;

    const imagePath = `./assets/station_administrator/${station_administrator_id}.png`;

    const handleClick = () => {
        // socket.emit('user changed station', {
        //     user_id: user.user_id,
        //     new_station_id: station_id
        // });
    };

    return (
        <Div
            onClick={handleClick}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                backgroundColor: "#dadada94",
                borderRadius: '20%',
                ":hover": {
                    backgroundColor: "#dadadad9",
                    cursor: "pointer"
                }
            }}
        >
            <Img
                src={imagePath}
                sx={{
                    height: 80,
                }}
            />
            <Typography align="center">
                {sa_name}
            </Typography>
            <StationAdminstatorMenu />
        </Div>
    );
}

StationAdministrator.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.object.isRequired,
    station: PropTypes.object.isRequired
};

export default StationAdministrator;