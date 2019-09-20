import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root, View, Panel } from '@vkontakte/vkui';

import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
//import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { Group, List, Cell, Gallery, Header, Link } from '@vkontakte/vkui';
//import { FormLayout, FormLayoutGroup, Input, RangeSlider, Checkbox, Button }from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
//import Home from './panels/Home';
//import Persik from './panels/Persik';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeView: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<Root activeView={this.state.activeView}>


				<View id="home" activePanel="home__panel">
			    <Panel id="home__panel">
						<PanelHeader left={<HeaderButton><Icon24Cancel/></HeaderButton>}>Домашний экран</PanelHeader>

						<Header level="secondary">
							Кто будешь?
					  	</Header>
				</Panel>
			  	</View>
			</Root>
		);
	}
}

export default App;
