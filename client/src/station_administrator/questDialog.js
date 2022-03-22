import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Quest from './quest';

function QuestDialog(props) {
    const { openDialog, onClose, socket, stationAdministrator, user } = props;

    const { user_id } = user;
    const { station_administrator_id, sa_name } = stationAdministrator;

    const [quests, setQuests] = useState(new Array());

    useEffect(() => {
        socket.on(`quests of station_administrator ${station_administrator_id}`, (data) => {
            setQuests(data);
        });
        socket.emit('load quests of station_administrator', station_administrator_id);
    }, [socket]);

    const handleAccept = (quest_id) => {
        socket.emit('user accepts quest', { user_id, quest_id });
    };

    return (
        <Dialog open={openDialog} onClose={onClose} PaperProps={{ sx: { minWidth: '60vw', minHeight: '60vh' } }}>
            <DialogTitle>Quests von {sa_name}</DialogTitle>
            <DialogContent>
                {quests.length === 0 && <Typography variant="caption">Keine Quests verfügbar</Typography>}
                {quests.map(quest => (
                    <Quest
                        key={quest.quest_id}
                        quest={quest}
                        onAccept={handleAccept}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Schließen
                </Button>
            </DialogActions>
        </Dialog>
    );
}

QuestDialog.propTypes = {
    openDialog: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.object,
    socket: PropTypes.object,
    stationAdministrator: PropTypes.object
};

export default QuestDialog;