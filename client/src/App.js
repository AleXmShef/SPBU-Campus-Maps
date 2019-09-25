import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root, View, Panel, Epic, Tabbar, TabbarItem, Group , ScreenSpinner, PanelHeader, HeaderButton} from '@vkontakte/vkui';
//import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon28NewsFeed from '@vkontakte/icons/dist/28/newsfeed'
import Icon28Info from '@vkontakte/icons/dist/28/info_outline'

import {Header} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import TimetableSelector from './panels/Timetable/TimetableSelector';
import TimetableWeek from './panels/Timetable/TimetableWeek';
import Info from './panels/Info/Info';

const axios = require('axios');

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeView: 'info-view',
			activePanel: 'info-panel',
			activeStory: 'info',
			user_id: '',
			listData: [],
            popout: null
		};
	}

    timetableTypes = ['global', 'education', 'program', 'year', 'group'];

	registerUser = (group) => {
		if(group)
			axios.post('api/users/register',
				{study_group: group, user_id: 'alexshef27'},
				{headers: {'Constent-Type': 'application/json'}}
				).then
			(this.setState({activeView: 'timetable', activePanel: 'week', listData: []}));
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

    setPopout = () => {
	    if(this.state.popout == null) {
            this.setState({popout: <ScreenSpinner/>});
            setTimeout(() => {
                this.setState({popout: null})
            }, 10000);
        }
    };

	getListData(prevType, curType, key) {
        const activePanel = prevType;
        const toPanel = curType;
        let curListData = this.state.listData;
        if(this.timetableTypes.indexOf(toPanel) === 0) {
            this.setState({listData: []});
            let curListData = this.state.listData;
            axios.get('/api/timetable/' + toPanel).then(res => {
                curListData.push(res.data);
                this.setState({listData: curListData, popout: null});
            });
        }
        else if(this.timetableTypes.indexOf(activePanel) < this.timetableTypes.indexOf(toPanel)) {
            const list = curListData[this.timetableTypes.indexOf(activePanel)][activePanel];
            if (toPanel !== 'year') {
                let args;
                if (list[key].link) {
                    args = {arg: list[key].link};
                }
                else if (list[key].name){
                    args = {arg: list[key].name};
                }
                else
                    args = {};
                axios.get('/api/timetable/' + toPanel, {params: args}).then(res => {
                    curListData.push(res.data);
                    this.setState({listData: curListData, popout: null});
                });
            }
            else {
                let args;
                args = {link: list[key].link, name: list[key].name};
                console.log(toPanel);
                axios.get('/api/timetable/' + toPanel, {params: args}).then(res => {
                    curListData.push(res.data);
                    this.setState({listData: curListData, popout: null});
                });
            }
        }
        else if (this.timetableTypes.indexOf(activePanel) > this.timetableTypes.indexOf(toPanel)) {
            curListData.pop();
            this.setState({listData: curListData, popout: null});
        }
	}

	onTimetablePanelChange = (e) => {
		this.getListData(this.state.activePanel, e.currentTarget.dataset.panel, e.currentTarget.dataset.key);
		console.log(`switching to panel ${e.currentTarget.dataset.panel}`);
		this.setState({activePanel: e.currentTarget.dataset.panel});
	};

    onViewChange = (e) => {
        console.log(`switching to view ${e.currentTarget.dataset.view}`);
        this.setState({ activeView: e.currentTarget.dataset.view});
		if(e.currentTarget.dataset.panel) {
            this.onTimetablePanelChange(e);
        }
    };

    onStoryChange = (e) => {
        console.log(`switching to story ${e.currentTarget.dataset.story}`);
        this.setState({ activeStory: e.currentTarget.dataset.story })
        if(e.currentTarget.dataset.view) {
            this.onViewChange(e);
        }
    };

	render() {
		return (
			<Epic activeStory = {this.state.activeStory} tabbar={
				<Tabbar>
					<TabbarItem
						onClick={this.onStoryChange}
                        data-view='timetable'
                        data-panel='week'
						selected={this.state.activeStory === 'timetable'}
						data-story='timetable'
					><Icon28NewsFeed/>
					</TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        data-view='info-view'
                        data-panel='info-panel'
                        selected={this.state.activeStory === 'info'}
                        data-story='info'
                    ><Icon28Info/>
                    </TabbarItem>
				</Tabbar>
			}>
			<Root id='timetable' activeView={this.state.activeView}>
                <View id='timetable' activePanel={this.state.activePanel}>
                    <TimetableWeek id='week' panelChange={this.onTimetablePanelChange} viewChange={this.onViewChange}/>
                </View>
				<View id='selection' popout={this.state.popout} activePanel={this.state.activePanel}>
					{this.timetableTypes.map(value => {
						return <TimetableSelector key={value} id={value} setPopout={this.setPopout} registerUser={this.registerUser} viewChange={this.onViewChange} panelChange={this.onTimetablePanelChange} data={this.state.listData} idArray={this.timetableTypes}/>
					})}
				</View>
			</Root>
			<Root id='info' activeView={this.state.activeView}>
				<View popout={this.state.popout} id='info-view' activePanel={this.state.activeView}>
                    <Info id='info-view' setPopout={this.setPopout}/>
				</View>
			</Root>
			</Epic>
		);
	}
}

export default App;
