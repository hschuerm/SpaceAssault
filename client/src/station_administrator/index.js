import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

const Img = styled('img')``;

function StationAdministrator(props) {
    const { station_administrator_id } = props;

    const imagePath = `./assets/station_adminstrator/${station_administrator_id}.png`;

    const handleClick = () => {
        // socket.emit('user changed station', {
        //     user_id: user.user_id,
        //     new_station_id: station_id
        // });
    };

    return (
        <div onClick={handleClick}>
            <Img
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    height: 80
                }}
                src={imagePath}
            />
        </div>
    );
}

StationAdministrator.propTypes = {
    station_administrator_id: PropTypes.number
};

export default StationAdministrator;