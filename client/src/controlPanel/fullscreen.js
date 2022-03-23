import React from 'react';

import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function Fullscreen() {

    const handleFullscreenClick = () => {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
              document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
              document.documentElement.msRequestFullscreen();
            }
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