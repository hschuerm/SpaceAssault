import React from 'react';

import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function Fullscreen() {

    const handleFullscreenClick = () => {
        const elem = document.getElementById("App");

        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <IconButton
            onClick={handleFullscreenClick}
        >
            <FullscreenIcon />
        </IconButton>
    );
}

export default Fullscreen;