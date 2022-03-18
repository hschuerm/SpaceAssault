import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Div = styled('div')``;
const Img = styled('img')``;

function Spaceship(props) {
    const { spaceship_id, top, left, user } = props;

    const imagePath = `./assets/spaceship/${spaceship_id}.png`;
    const altImagePath = './assets/spaceship/alt.png';

    const handleImageError = ({ target }) => {
        target.src = altImagePath;
    };

    return (
        <Div sx={{
            position: 'absolute',
            top,
            left,
            width: 40,
            // boxShadow: '0px 0 20px 0px #0ff'
        }}>
            <Img
                sx={{
                    width: '100%'
                }}
                src={imagePath}
                onError={handleImageError}
            />
            <Typography color="white">
                {user.username}
            </Typography>
        </Div>
    );
}

Spaceship.propTypes = {
    spaceship_id: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    user: PropTypes.shape({
        username: PropTypes.string
    })
};

export default Spaceship;