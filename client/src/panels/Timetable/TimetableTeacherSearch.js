import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, HeaderButton, platform, IOS, List, Cell, Separator, Search} from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Back from '@vkontakte/icons/dist/24/back'

const osname = platform();

const TimetableTeacherSearch = ({ id, setPopout, onSearchChange, searchValue, panelChange, timetable, viewChange}) => {
    return (<Panel id={id}>
            <PanelHeader left={<HeaderButton onClick={panelChange} data-panel='week'><Icon24Back/></HeaderButton>}>Поиск преподавателя</PanelHeader>
            <Search value={searchValue} onChange={onSearchChange}/>
            {timetable.length > 0 && <List>{timetable.map(teacher => <Cell expandable data-panel='teacher' data-link={teacher.link} onClick={panelChange}>{teacher.name}</Cell>)}</List>}

        </Panel>
    )};

TimetableTeacherSearch.propTypes = {
    id: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    panelChange: PropTypes.func.isRequired,
    viewChange: PropTypes.func.isRequired,
    timetable: PropTypes.array.isRequired,
    setPopout: PropTypes.func.isRequired
};

export default TimetableTeacherSearch;