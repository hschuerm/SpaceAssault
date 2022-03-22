import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { IconButton, List, ListItem, ListItemText, Paper, Popper, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';

const Div = styled('div')``;

function QuestInfo(props) {
    const { user, socket } = props;
    const { user_id, username } = user;

    const [anchorEl, setAnchorEl] = useState(null);
    const [acceptedQuests, setAcceptedQuests] = useState(new Array());

    useEffect(() => {
        socket.on(`quests of user ${user_id}`, (quests) => {
            setAcceptedQuests(quests);
        });
        socket.emit('load accepted quests', user_id);
    }, [socket]);

    const handleClick = ({ currentTarget }) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const popperOpen = Boolean(anchorEl);

    return (
        <Fragment>
            <IconButton
                onClick={handleClick}
            >
                <InfoIcon />
            </IconButton>
            <Popper open={popperOpen} anchorEl={anchorEl}>
                <Paper square sx={{ padding: 2 }}>
                    <Div sx={{ display: "flex" }}>
                        <Typography>Quests von {username}</Typography>
                        <IconButton
                            sx={{ marginTop: -2, marginRight: -2, width: 40 }}
                            size="small"
                            onClick={handleClose}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Div>
                    <List>
                        {acceptedQuests.map(quest => (
                            <ListItem key={quest.quest_id}>
                                <ListItemText>{quest.title}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Popper>
        </Fragment>
    );
}

QuestInfo.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.shape({
        user_id: PropTypes.number,
        username: PropTypes.string
    })
};

export default QuestInfo;