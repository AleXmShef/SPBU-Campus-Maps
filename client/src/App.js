import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root, View, Panel, Epic, Tabbar, TabbarItem, Group } from '@vkontakte/vkui';

import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
//import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon28NewsFeed from '@vkontakte/icons/dist/28/newsfeed'
import Icon28Info from '@vkontakte/icons/dist/28/info_outline'

import {Header} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import TimetableSelector from './panels/Timetable/TimetableSelector';
import TimetableWeek from './panels/Timetable/TimetableWeek';

const axios = require('axios');

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeView: 'selection',
			activePanel: 'global',
			activeStory: 'timetable',
			user_id: '',
			listData: [],
		};
	}

    timetableTypes = ['global', 'education', 'program', 'year', 'group'];

	registerUser = (group) => {
		if(group)
			axios.post('api/users/register',
				{study_group: group, user_id: 'alexshef27'},
				{headers: {'Constent-Type': 'application/json'}}
				).then
			(this.setState({activeView: 'timetable', activePanel: 'week'}));
	};

	componentDidMount() {
		// connect.subscribe((e) => {
		// 	switch (e.detail.type) {
		// 		case 'VKWebAppGetUserInfoResult':
		// 			this.setState({ fetchedUser: e.detail.data });
		// 			break;
		// 		default:
		// 			console.log(e.detail.type);
		// 	}
		// });
		// connect.send('VKWebAppGetUserInfo', {});
		if(this.state.activePanel === this.timetableTypes[0]) {
            let curListData = this.state.listData;
            axios.get('/api/timetable/' + this.state.activePanel).then(res => {
                curListData.push(res.data);
                this.setState({listData: curListData});
            });
        }
	}

	onTimetablePanelChange = (e) => {
		console.log(`switching to panel ${e.currentTarget.dataset.panel}`);
		const activePanel = this.state.activePanel;
		const toPanel = e.currentTarget.dataset.panel;
		const key = e.currentTarget.dataset.key;
        let curListData = this.state.listData;
        const list = curListData[this.timetableTypes.indexOf(activePanel)][activePanel];
        console.log(curListData);
        if(this.timetableTypes.indexOf(activePanel) < this.timetableTypes.indexOf(toPanel)) {
            if (e.currentTarget.dataset.panel !== 'year') {
                let args;
                if (list[key].link) {
                    args = {arg: list[key].link};
                }
                else {
                    args = {arg: list[key].name};
                }
                axios.get('/api/timetable/' + toPanel, {params: args}).then(res => {
                	curListData.push(res.data);
                    this.setState({listData: curListData, activePanel: toPanel});
                });
            }
            else {
                let args;
				args = {link: list[key].link, name: list[key].name};
                console.log(toPanel);
                axios.get('/api/timetable/' + toPanel, {params: args}).then(res => {
                    curListData.push(res.data);
                    this.setState({listData: curListData, activePanel: toPanel});
                    console.log(res.data)
                });
			}
        }
        else if (this.timetableTypes.indexOf(activePanel) > this.timetableTypes.indexOf(toPanel)) {
        	curListData.pop();
			this.setState({listData: curListData, activePanel: toPanel});
		}
	};

    onViewChange = (e) => {
        console.log(`switching to view ${e.currentTarget.dataset.to}`);
        this.setState({ activeView: e.currentTarget.dataset.to })
    };

    onStoryChange = (e) => {
        console.log(`switching to story ${e.currentTarget.dataset.story}`);
        this.setState({ activeStory: e.currentTarget.dataset.story })
    };

	render() {
		return (
			<Epic activeStory = {this.state.activeStory} tabbar={
				<Tabbar>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'timetable'}
						data-story='timetable'
					><Icon28NewsFeed/>
					</TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'info'}
                        data-story='info'
                    ><Icon28Info/>
                    </TabbarItem>
				</Tabbar>
			}>
			<Root id='timetable' activeView={this.state.activeView}>
                <View id='timetable' activePanel={this.state.activePanel}>
                    <TimetableWeek id='week' go={this.onTimetablePanelChange}/>
                </View>
				<View id='selection' activePanel={this.state.activePanel}>
					{this.timetableTypes.map(value => {
						return <TimetableSelector key={value} id={value} registerUser={this.registerUser} viewChange={this.onViewChange} panelChange={this.onTimetablePanelChange} data={this.state.listData} idArray={this.timetableTypes}/>
					})}
				</View>
			</Root>
			<Root id='info' activeView={this.state.activeView}>
				<View id='info_view' activePanel='some panel'>

				</View>
			</Root>
			</Epic>
		);
	}
}

export default App;
