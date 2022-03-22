import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Divider, Typography } from '@mui/material';

function Quest(props) {
    const { quest, onAccept } = props;
    const { quest_id, title, description, reward } = quest;

    const handleClick = () => {
        onAccept(quest_id);
    };

    return (
        <Accordion>
            <AccordionSummary>
                <Typography variant="h5">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        backgroundColor: "grey[500]"
                    }}
                >
                    <Typography>
                        {description}
                    </Typography>
                </Box>
                <Divider sx={{ marginTop: 3, marginBottom: 1, marginRight: '260px' }} />
                <Typography>
                    Belohnung: {reward} Punkte
                </Typography>
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={handleClick}>Akzeptieren</Button>
            </AccordionActions>
        </Accordion>
    );
}

Quest.propTypes = {
    quest: PropTypes.shape({
        quest_id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        reward: PropTypes.number
    }),
    onAccept: PropTypes.func.isRequired
};

export default Quest;