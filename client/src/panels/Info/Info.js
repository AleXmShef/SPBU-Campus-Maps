import React from 'react';
import PropTypes from 'prop-types';
import { Panel, List, Group, PanelHeader, CellButton} from '@vkontakte/vkui';


const Info = ({ id, setPopout}) => {
    return (<Panel id={id}>
            <PanelHeader>хуй</PanelHeader>
            <Group title="Действия">
                <List>
                    <CellButton onClick={() => {setPopout(1)}}>Подумать</CellButton>
                </List>
            </Group>
        </Panel>
    )};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    setPopout: PropTypes.func.isRequired,
};

export default Info;