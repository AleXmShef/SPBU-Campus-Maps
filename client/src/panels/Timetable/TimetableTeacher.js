import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, HeaderButton, platform, IOS, List, Cell, Separator } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'

const osname = platform();

const TimetableTeacher = ({ id, panelChange, timetable, viewChange}) => {
    return (<Panel id={id}>
            <PanelHeader left={<HeaderButton data-panel='teacher-search' onClick={panelChange}>
                {<Icon24Back/>}
            </HeaderButton>}>Расписание</PanelHeader>
            <List>
                {timetable[0] ? timetable.map(day => {
                    console.log(timetable);
                    return <Group
                        title={<Div>{day.day}</Div>}
                        key={day.day}>
                        <Separator wide={true}/>
                        <List>{day.lessons.map(lesson => {
                            return <Cell multiline
                                         description={lesson.locations}
                                         key={lesson.locations + lesson.educators + lesson.datetime + day.day}
                                         asideContent={<Div
                                             align='center'
                                             style={{'width': 100, 'whiteSpace': 'pre-wrap'}}
                                         >{lesson.datetime[0] + " " + lesson.datetime[1]}</Div>}
                            >
                                {lesson.subject}
                            </Cell>
                        })}
                        </List>
                    </Group>
                }) : <Cell>Выбрать группу</Cell>}
            </List>

        </Panel>
    )};

TimetableTeacher.propTypes = {
    id: PropTypes.string.isRequired,
    panelChange: PropTypes.func.isRequired,
    viewChange: PropTypes.func.isRequired,
    timetable: PropTypes.array.isRequired
};

export default TimetableTeacher;