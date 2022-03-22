import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Divider, Menu, MenuItem } from '@mui/material';
import QuestDialog from './questDialog';

function StationAdminstatorMenu(props) {
    const { anchorEl, onClose, socket, stationAdministrator, user } = props;

    const [questDialogOpen, setQuestDialogOpen] = useState(false);

    const openMenu = Boolean(anchorEl);

    const handleQuestClick = () => {
        setQuestDialogOpen(true);
    };

    const handleQuestDialogClose = () => {
        setQuestDialogOpen(false);
    };

    return (
        <Fragment>
            <Menu
                open={openMenu}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "top"
                }}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top"
                }}
            >
                <MenuItem
                    onClick={handleQuestClick}
                >
                    Quests anzeigen
                </MenuItem>
                <Divider />
                <MenuItem>
                    Shop öffnen
                </MenuItem>
            </Menu>
            <QuestDialog
                socket={socket}
                user={user}
                openDialog={questDialogOpen}
                onClose={handleQuestDialogClose}
                stationAdministrator={stationAdministrator}
            />
        </Fragment>
    );
}

StationAdminstatorMenu.propTypes = {
    anchorEl: PropTypes.object,
    onClose: PropTypes.func,
    socket: PropTypes.object,
    user: PropTypes.object,
    stationAdministrator: PropTypes.object
};

export default StationAdminstatorMenu;