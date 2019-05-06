import * as React from 'react';
import { Layout, Dropdown, Menu, Icon, Button, Tabs } from 'antd';
import './Home.less';
import { Location, History } from 'history';
import { UserState } from '../../store/reducers/user';
import { connect } from 'react-redux';
import { getUserMenu } from '../../api/getMenu';
import { deepMenu, MenuInfoChange } from '../../utils/deepMenu';
import { SetUserAccessAction, LogoutAction } from '../../store/reducers/user/action';
import { Switch, Route, Redirect } from 'react-router';
import StudentList from './student/StudentList';
import ClassList from './class/ClassList';
import { http } from '../../api/base';
import { Reducers } from '../../store';
import { setPanesAction, TabPane } from '../../store/reducers/xsystem/action';
import Welcome from './welcome/Welcome';
import JournalList from './journal/JournalList';
import { Provider, KeepAlive } from 'react-keep-alive';

interface IHomeProps {
	user: UserState;
	location: Location;
	history: History;
	setUserAccess: () => void;
	logout: () => void;
	panes: TabPane[];
	activePane: string;
	setPanes: (panes: TabPane[], activePane: string) => void;
}

interface IHomeState {
	menuList: MenuInfoChange[];
	openKeys: string[];
	selectedKeys: string[];
}

class Home extends React.Component<IHomeProps, Readonly<IHomeState>> {

	public state: Readonly<IHomeState> = {
		menuList: [],
		openKeys: [],
		selectedKeys: []
	}

	public renderMenu(menuList: MenuInfoChange[]) {
		if (Array.isArray(menuList)) {
			return menuList.map(item => {
				// console.log(item)
				if (item.children && item.children.length) {
					return (
						<Menu.SubMenu
							key={item.id}
							title={item.name}
						>
							{this.renderMenu(item.children)}
						</Menu.SubMenu>
					)
				} else {
					return (
						<Menu.Item
							onClick={() => {
								const url = `/x/${item.relUrl}.shtml`;
								const find = this.props.panes.find(ite => ite.url === url)
								if (!find) {
									this.props.setPanes([...this.props.panes, {
										title: item.name,
										url,
										id: item.id,
										pId: item.pId,
										closable: true
									}], url)
								} else {
									this.props.setPanes(this.props.panes, url)
								}
								this.props.history.replace(url)
							}}
							key={item.id}
						>
							{item.name}
						</Menu.Item>
					)
				}
 			})
		}
	}

	public render() {
		const { menuList, openKeys, selectedKeys } = this.state
		const { panes, activePane } = this.props
 		return (
			<Layout className="home-page">
				<Layout.Header
					className="home-header"
				>
					<h3>柠檬教务系统</h3>

					<Dropdown overlay={
						<Menu>
							<Menu.Item key="changePwd">修改密码</Menu.Item>
							<Menu.Item onClick={() => {
								this.props.logout()
							}} key="logout">退出登录</Menu.Item>
						</Menu>
					}>
						<Button style={{ marginLeft: 8 }}>
							{this.props.user.access ? this.props.user.access.teaName : '加载中'} <Icon type="down" />
						</Button>
					</Dropdown>
				</Layout.Header>
				<Layout className="home-content">
					<Layout.Sider>
						{menuList.length > 0 ? (
							<Menu
								selectedKeys={selectedKeys}
								openKeys={openKeys}
								onOpenChange={(e) => {
									this.setState({
										openKeys: e
									})
								}} 
								onSelect={(e) => {
									this.setState({
										selectedKeys: e.selectedKeys
									})
								}}
								mode="inline"
								theme="dark"
							>
								{this.renderMenu(menuList)}
							</Menu>
						): null}
					</Layout.Sider>
					<Layout.Content className="content">
						<Tabs
							className="tabs"
							type="editable-card"
							activeKey={activePane}
							onChange={(url: string) => {
								this.props.history.push(url)
								this.props.setPanes(this.props.panes, url);
							}}
							onEdit={(url: any) => {
								const panes = this.props.panes.filter(item => item.url !== url)
								// const last = panes.slice(0, panes.length - 1)
								const last = [...panes].pop()
								if (last) {
									this.props.setPanes(panes, last.url)
									this.props.history.replace(last.url)
								} else {
									this.props.setPanes(panes, '/x/')
									this.props.history.replace('/x/')
								}
								
							}}
						>
							{panes && panes.length > 0 ? panes.map(item => {
								return <Tabs.TabPane closable={item.closable} key={item.url} tab={item.title} />
							}): null}
						</Tabs>
						<Layout className="x-page-child">
							<Provider>
								<Switch>
									<Route 
										exact
										path="/x/welcome.shtml"
										render={(props) => {
											return (
												<KeepAlive name="Welcome">
													<Welcome {...props} />
												</KeepAlive>
											)
										}}
									/>
									<Route
										exact
										path="/x/student/opStuList.action.shtml"
										render={(props) => {
											return (
												<KeepAlive name="StudentList">
													<StudentList {...props} />
												</KeepAlive>
											)
										}}
									/>
									<Route
										exact
										path="/x/class/opClassManager_my.action.shtml"
										render={(props) => {
											return (
												<KeepAlive name="ClassList">
													<ClassList {...props} />
												</KeepAlive>
											)
										}}
									/>
									<Route 
										exact
										path="/x/journal/opJouranlList_my.action.shtml"
										render={(props) => {
											return (
												<KeepAlive name="JournalList">
													<JournalList {...props} />
												</KeepAlive>
											)
										}}	
									/>
									<Redirect exact path="/x/" to="/x/welcome.shtml" />
								</Switch>
							</Provider>
						</Layout>
					</Layout.Content>
				</Layout>
			</Layout>
		);
	}

	public componentWillMount() {
		if (!this.props.user.lemon_sso_sessionid) {
			return this.props.history.replace('/login.shtml')
		}
		http.interceptors.response.use((response) => {
			return response;
		}, (e) => {
			this.props.logout()
			return Promise.reject(e)
		})

		this.props.setUserAccess()
		this.getMenuList()
	}

	public shouldComponentUpdate(nextProps: IHomeProps) {
		if (!nextProps.user.lemon_sso_sessionid) {
			this.props.history.replace('/login.shtml')
			return false;
		}
		return true;
	}

	public getMenuList() {
		getUserMenu().then(res => {
			this.setState({
				menuList: deepMenu(null, res.data as any)
			}, () => {
				const { pathname } = this.props.location
				res.data.forEach(item => {
					if (`/x/${item.relUrl}.shtml` === pathname) {
						this.props.setPanes([...this.props.panes, {
							title: item.name,
							url: pathname,
							closable: true,
							id: item.id,
							pId: item.pId
						}], pathname)
						this.setState({
							openKeys: [String(item.pId), String(item.id)],
							selectedKeys: [String(item.id)]
						})
					}
				})
			})
		})
	}
}

export default connect(
	(state: Reducers) => ({
		user: state.user,
		panes: state.xSystem.panes,
		activePane: state.xSystem.activePane
	}),
	(dispatch: any) => ({
		setUserAccess() {
			dispatch(new SetUserAccessAction().getAction())
		},
		setPanes(panes: TabPane[], activePane: string) {
			dispatch(new setPanesAction(panes, activePane).getAction())
		},
		logout() {
			dispatch(new LogoutAction().getAction())
		}
	})
)(Home)