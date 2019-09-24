import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const osname = platform();

const TimetableWeek = ({ id, go}) => {
    return (<Panel id={id}>
            <PanelHeader left={<HeaderButton onClick={go}>
                {<Icon24Settings/>}
            </HeaderButton>}>Расписание</PanelHeader>

    </Panel>
)};

TimetableWeek.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default TimetableWeek;