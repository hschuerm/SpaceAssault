import React from 'react';

import { styled } from '@mui/material/styles';
import Fullscreen from './fullscreen';

const Div = styled('div')``;

function ControlPanel() {
    return (
        <Div
            sx={{
                position: "fixed",
                top: 2,
                right: 2
            }}
        >
            <Fullscreen />
        </Div>
    );
}

export default ControlPanel