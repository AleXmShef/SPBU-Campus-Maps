import React from 'react';
import PropTypes from 'prop-types';
import { Panel, List, Group, Div, PanelHeader, HeaderButton, CellButton, IOS, platform } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Info = ({ id, setPopout}) => {
    return (<Panel id={id}>
            <PanelHeader>хуй</PanelHeader>
            <Group title="Действия">
                <List>
                    <CellButton onClick={setPopout}>Подумать</CellButton>
                </List>
            </Group>
        </Panel>
    )};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    setPopout: PropTypes.func.isRequired,
};

export default Info;