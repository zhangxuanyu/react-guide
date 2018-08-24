import * as React from 'react';
import { 
	Layout, Menu,Icon
} from 'antd';
const {
	Sider
} = Layout;
const {
	SubMenu,
} = Menu;
class MySider extends React.Component {
	state = {
		menuList:[{//菜单
			key:'my',
			title:'我的',
			icon:'user',
			item:[{
				key:'my,index',
				title:'我的主页',
			},{
				key:'subMy',
				title:'我的日常',
				item:[{
					key:'my,subMy,record',
					title:'我的消费',
				},{
					key:'my,subMy,task',
					title:'我的计划',
				},{
					key:'my,subMy,learn',
					title:'技术汇总',
				},{
					key:'my,subMy,blog',
					title:'牛人博客',
				},{
					key:'my,subMy,note',
					title:'我的笔记',
				}]
			}]
		},{
			key:'order',
			title:'进件管理',
			icon:'file',
			item:[{
				key:'order,list',
				title:'列表'
			},{
				key:'order,form',
				title:'新增进件'
			}]
		},{
			key:'scheme',
			title:'金融方案',
			icon:'profile',
			item:[{
				key:'scheme,list',
				title:'列表'
			},{
				key:'scheme,form',
				title:'新增金融方案'
			}]
		},{
			key:'dealer',
			title:'车商报备',
			icon:'appstore',
			item:[{
				key:'dealer,list',
				title:'列表'
			},{
				key:'dealer,form',
				title:'新增车商报备'
			}]
		},{
			key:'capital',
			title:'资金方报备',
			icon:'pie-chart',
			item:[{
				key:'capital,list',
				title:'列表'
			},{
				key:'capital,form',
				title:'新增资金方报备'
			}]
		},{
			key:'download',
			title:'下载中心',
			icon:'download',
			item:[{
				key:'download,download',
				title:'下载中心'
			}]
		},{
			key:'system',
			title:'系统管理',
			icon:'rocket',
			item:[{
				key:'system,sysLog',
				title:'开发日志'
			}]
		}], 
	}
	handleClick = (e) => {//点击菜单改变hash
		let hash = '#/' + e.key.split(",").join("/");
		console.log(hash)
		window.location.hash = hash;
		// window.location.hash ='#/my/subMy/note'
	};
	onOpenChange = (e) =>{
		alert(e);
	}
	componentDidMount() {
		//加载菜单
	}
	render() {
		let menu = [];//组装菜单
		this.state.menuList.map(m=>{
			let menuItem = [];//组装二级菜单
			m.item.map(mm=>{
				if(mm.item != undefined){
					let menuItem2 = [];//组装三级菜单
					mm.item.map(mmm=>{
						menuItem2.push(
				            <Menu.Item key={mmm.key}>
				            	<span>{mmm.title}</span>
				            </Menu.Item>
				       	);
					});
					menuItem.push(
						<SubMenu key={mm.key} title={mm.title} children={menuItem2}></SubMenu>
					);
				}else{
					menuItem.push(
						<Menu.Item key={mm.key}>
		            		<span>{mm.title}</span>
		          		</Menu.Item>
					);
				}
			})
			menu.push(//组装一级菜单
				<SubMenu key={m.key} title={<span><Icon type={m.icon}/><span>{m.title}</span></span>} children={menuItem}></SubMenu>
			)
		});
		return(
			<Sider trigger={null} collapsible collapsed={this.props.collapsed} className="sider">
				<div className="logo" style={{background:this.props.siderBackColor,borderRight:this.props.sideBorder}}>
					<img style={{width:40}} src={this.props.logo}/>
					<span style={{fontSize:16,fontWeight:600,display:this.props.display,marginLeft:20,color:this.props.siderColor}}>
						<span style={{paddingTop:20}}>Ant-design</span>
					</span>
				</div>
				<Menu 
					theme={this.props.theme} 
					onClick={this.handleClick} 
					className="menu" 
					defaultSelectedKeys={this.props.defaultSelectedKeys} 
					defaultOpenKeys={this.props.defaultOpenKeys} 
					mode="inline"
				>
					{menu}
				</Menu>
				<div className="logo" style={{background:this.props.siderBackColor,borderRight:this.props.sideBorder}}>
					<img style={{width:40}} src={this.props.footer}/>
					<span style={{fontSize:16,fontWeight:600,display:this.props.display,marginLeft:10,color:this.props.siderColor}}>
						<span style={{paddingTop:20}}>React-router</span>
					</span>
				</div>
			</Sider>
			
		);
	}
}
export default MySider;