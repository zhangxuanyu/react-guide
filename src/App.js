import './App.css';//引入全局样式
import $ from 'jquery'//引入jquery
import React from 'react';//react
import MyRequest from './request.js'//自己封装的请求
import ReactDOM from 'react-dom';//react-dom
import MyRouter from './router.js';//自己封装的路由
import MySider  from './sider.js';//左边菜单
import { Layout, Menu, Breadcrumb,Icon,Switch,Modal } from 'antd';//antd组件
const {
	Header,
	Content,
	Sider
} = Layout;
const {
	SubMenu,
	MenuItemGroup
} = Menu;

class App extends React.Component {
	init = () => { //组件的一些初始化操作
		window.addEventListener('hashchange', () => { //监听hash
			this.hashChange();
		});
	};
	state = {
		collapsed: false,
		logo: '/image/ant-design.svg',
		footer: '/image/react.svg',
		marginLeft: 200,
		theme:'dark',
		siderBackColor:'#001529',//001529
		siderColor:'#fff',
		sideBorder:'1px solid #000',
		display:'inline-block',
		breadCrumb: [],//面包屑
		btnList:[],//按钮操作区域
		defaultOpenKeys: [],
		defaultSelectedKeys:[],
	};
	refreshSider = () =>{ //刷新菜单
		ReactDOM.render(<div></div>,document.getElementById('antd-sider'));
		setTimeout(() => { //延迟0.1秒
			ReactDOM.render(<MySider 
				sideBorder = {this.state.sideBorder}
				siderBackColor={this.state.siderBackColor} 
				siderColor = {this.state.siderColor}  
				display = {this.state.display} 
				collapsed={this.state.collapsed} 
				theme={this.state.theme} 
				footer={this.state.footer} 
				logo={this.state.logo} 
				defaultSelectedKeys={this.state.defaultSelectedKeys} 
				defaultOpenKeys={this.state.defaultOpenKeys}
			/>
			,document.getElementById('antd-sider'));
		},1);
	}
	themeChange = () =>{//主题切换
		if(this.state.theme == 'light') {
			this.setState({
				theme: 'dark',
				siderBackColor:'#001529',
				siderColor:'#fff',
				sideBorder:'1px solid #000',
			},()=>{
				this.refreshSider();
			});
		} else {
			this.setState({
				theme: 'light',
				siderBackColor:'#fff',
				siderColor:'#000',
				sideBorder:'1px solid #f2f2f2',
			},()=>{
				this.refreshSider();
			});
		}
	}
	toggle = () => {//侧边收缩
		if(this.state.marginLeft == 200) {
			this.setState({
				collapsed: !this.state.collapsed,
				marginLeft: 80,
				display:'none',
			},()=>{
				this.refreshSider();
			});
		} else {
			this.setState({
				collapsed: !this.state.collapsed,
				marginLeft: 200,
				display:'inline-block',
			},()=>{
				this.refreshSider();
			});
		}
	};
	hashChange = () => {//hash改变，加载对应的组件
		if(window.location.hash == '') window.location.hash = '/my/index';//默认首页
		let defaultSelectedKeys = new Array(window.location.hash.substr(2).split("/").join(","));
		let defaultOpenKeys = defaultSelectedKeys.join("/").split(',').splice(0,2);
		this.setState({
			defaultOpenKeys,
			defaultSelectedKeys,
		}, () => {
			this.refreshSider();
			this.refresh();
		});
		$('.progress').css({width:'0%'});
	};
	refresh = () => {//刷新内容
		ReactDOM.render(<div><Icon type="loading" /></div>,document.getElementById('antd-main')); 
		let hash = window.location.hash.split('=')[0];
		/*React.myParam.setParam(//把路由参数存起来
			Qs.parse(window.location.hash.split('?')[1])
		);*/
		let $myRouter = MyRouter[hash];//拿到当前hash对用的组件
		if($myRouter != undefined) {
			this.setState({
				breadCrumb: $myRouter.breadCrumb,
				btnList:$myRouter.btnList
			}, () => {
				setTimeout((main = 'antd-main') => { //延迟0.1秒
					ReactDOM.render($myRouter.compontent(), document.getElementById(main));
				},100);
			});
		} else {
			Modal.warning({
				title: '提示',
				content: '路由解析异常',
			});
			this.setState({
				breadCrumb: [],
				btnList:[]
			})
			ReactDOM.render(<div>路由解析异常</div>,document.getElementById('antd-main')); 
		}
		$('.progress').css({width:'0%'});
	};
	componentWillMount() {
		//按照路由渲染组件-->让后台知道
		this.init();
		this.hashChange();
	};
	componentDidMount() {
		/*jquery监听顶部滚动*/
		$('#antd-main').scroll(()=>{
	 		let width = $('#antd-main').scrollTop() / ($('#antd-main')[0].scrollHeight-$('#antd-main')[0].clientHeight) ;
	 		$('.progress').css({
	 			width:width*100+'%'
	 		});
		});
	};
	render() {
		return(
			<Layout>
				<div id="progress" className="progress"></div>
				<div id="antd-sider"></div>
				<Layout style={{ padding:0,background: '#FCFCFF',marginLeft:this.state.marginLeft,height: '100vh'}}>
					<Header style={{height:'8vh',background: '#fff',paddingRight:20,paddingLeft:20,curdor: 'pointer',borderBottom: '1px solid #f2f2f2'}}>
						<div style={{float:'left'}}>
							<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} style={{marginRight:20,cursor: 'pointer'}} onClick={this.toggle} />
							<Icon type="alipay"   style={{marginRight:20,cursor: ''}} />
						</div>
						
						<div style={{float: 'right'}}>
							<Icon type="chrome"  style={{marginRight:20}} />
							<Icon type="twitter" style={{marginRight:20}} />
							<Switch
					          checked={this.state.theme === 'dark'}
					          onChange={this.themeChange}
					          checkedChildren="Dark"
					          unCheckedChildren="Light"
					          size="small"
					        />
							
						</div>
					</Header>
					<Header style={{height:'8vh',background: '#fff',paddingLeft:24,borderBottom:'1px solid #f2f2f2',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
						<Breadcrumb style={{}}>
							<Breadcrumb.Item>{this.state.breadCrumb[0]}</Breadcrumb.Item>
							<Breadcrumb.Item style={{cursor:'pointer',color:'#1890ff'}} onClick={() => { this.refresh(window.location.hash)} }>{this.state.breadCrumb[1]}</Breadcrumb.Item>
						</Breadcrumb>
						<div>
							{this.state.btnList}
						</div>
					</Header>
					<Content id='antd-main'  style={{padding: 20, margin: 0, minHeight: 520 ,overflow: 'auto',fontSize:12,overflow:'auto'}}></Content>
	      		</Layout>
   			</Layout>
		);
	}
}
export default App;