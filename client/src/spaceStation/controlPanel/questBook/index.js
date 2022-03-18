import React from 'react';
import PropTypes from 'prop-types';

import { Fab } from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';

function QuestBook(props) {
    const { socket, station_adminstrator } = props;
    const { station_administrator_id } = station_adminstrator;

    const handleClick = () => {
        socket.emit('load quests', station_administrator_id);
    };

    return (
        <Fab
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16
            }}
            onClick={handleClick}
        >
            <AssignmentIcon />
        </Fab>
    );
}

QuestBook.propTypes = {
    socket: PropTypes.object,
    station_adminstrator: PropTypes.object.isRequired
};

export default QuestBook;