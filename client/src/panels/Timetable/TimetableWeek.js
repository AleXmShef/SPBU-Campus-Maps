import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, HeaderButton, platform, IOS, List, Cell, Separator } from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const osname = platform();

const TimetableWeek = ({ id, panelChange, timetable, viewChange}) => {
    return (<Panel id={id}>
            <PanelHeader left={<HeaderButton data-panel='global' data-view='selection' onClick={viewChange}>
                {<Icon24Settings/>}
            </HeaderButton>}>Расписание</PanelHeader>
            <List>
                {timetable[0] ? timetable[0].days.map(day => {
                    return <Group
                        title={<Div>{day.day}</Div>}
                        key={day.day}>
                        <Separator wide={true}/>
                        <List>{day.lessons.map(lesson => {
                            return <Cell multiline
                                description={lesson.educators}
                                key={lesson.locations + lesson.educators + lesson.datetime + day.day}
                                asideContent={<Div
                                    align='center'
                                    style={{'width': 100, 'whiteSpace': 'pre-wrap'}}
                                >{lesson.datetime + " " + lesson.locations}</Div>}
                                >
                                {lesson.subject}
                            </Cell>
                        })}
                        </List>
                    </Group>
                }) : <Cell expandable onClick={viewChange} data-panel='global' data-view='selection'>Выбрать группу</Cell>}
            </List>

    </Panel>
)};

TimetableWeek.propTypes = {
    id: PropTypes.string.isRequired,
    panelChange: PropTypes.func.isRequired,
    viewChange: PropTypes.func.isRequired,
    timetable: PropTypes.array.isRequired
};

export default TimetableWeek;