import React from 'react';

import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function Fullscreen() {

    const handleFullscreenClick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
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