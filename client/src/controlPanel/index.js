import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Fullscreen from './fullscreen';
import QuestInfo from './questInfo';

const Div = styled('div')``;

function ControlPanel(props) {
    const { user, socket } = props;

    return (
        <Div
            sx={{
                position: "fixed",
                top: 2,
                right: 2
            }}
        >
            <QuestInfo user={user} socket={socket} />
            <Fullscreen />
        </Div>
    );
}

ControlPanel.propTypes = {
    user: PropTypes.object,
    socket: PropTypes.object
};

export default ControlPanel;