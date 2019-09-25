import React from 'react';
import PropTypes from 'prop-types';
import { Panel, List, Group, Div, PanelHeader, HeaderButton, Cell, IOS, platform } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const TimetableSelector = ({ id, idArray, registerUser, setPopout, panelChange, viewChange, data}) => {
    return (<Panel id={id}>
        <PanelHeader left={idArray.indexOf(id) > 0 ? <HeaderButton onClick={panelChange} data-panel={idArray[idArray.findIndex(element => {return element === id}) - 1]}>
            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton> : <Div></Div>}>Изменение расписания</PanelHeader>
        <Group title="Направления">
            <List>
                {
                    data[idArray.indexOf(id)] ? data[idArray.indexOf(id)][id].map((value) => {
                        return <Cell expandable
                                     data-key = {data[idArray.indexOf(id)][id].findIndex(element=> {return element.name === value.name})}
                                     key = {data[idArray.indexOf(id)][id].findIndex(element=> {return element.name === value.name})}
                                     onClick={idArray.indexOf(id) + 1 !== idArray.length ? panelChange : () => {registerUser(value)}}
                                     data-panel={idArray[idArray.indexOf(id) + 1]}
                                     data-view={'timetable'}>{value.name}
                                     </Cell>
                    }) : setPopout()//<Cell>Nothing to show</Cell>
                }
            </List>
        </Group>
    </Panel>
)};

TimetableSelector.propTypes = {
    id: PropTypes.string.isRequired,
    idArray: PropTypes.array.isRequired,
    panelChange: PropTypes.func.isRequired,
    viewChange: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    setPopout: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
};

export default TimetableSelector;