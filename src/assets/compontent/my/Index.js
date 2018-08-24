import * as React from 'react';
import { Breadcrumb,Card } from 'antd';
import ReactDOM from 'react-dom';
import AntVRecord from './antV/AntVRecord';//引入图表
class Index extends React.Component {
	init = () =>{
		ReactDOM.render(<AntVRecord/>, document.getElementById('antV'));
	}
	state = {
		APIS:{
			getBaseData:'/my/getbasedata'
		},
		title:'我的消费',
		modelData:{}
	};
	skipTo = (url) =>{//跳转制定路由
		window.location.hash = url
	};
	getBaseData = () =>{
		var that = this;
		window.request({
			url: that.state.APIS.getBaseData,
			type: 'POST',
		}).then(modelData => {
			that.setState({modelData},()=>{
				
			});
		}).catch(err => {
			console.log(err);
		});
	}
	changeAntV = (title) =>{//切换统计图
		switch(title){
			case 'record':
				this.setState({
					title:'我的消费'
				})
				break;
			case 'task':
				this.setState({
					title:'我的计划'
				})
				break;
			case 'learn':
				this.setState({
					title:'技术汇总'
				})
				break;
			case 'blog':
				this.setState({
					title:'牛人博客'
				})
				break;
		}
	};
	componentDidMount() {
		let that = this;
		that.init();//初始化数据
		that.getBaseData();//获取数据
		console.log(123);
	}
	render() {
		return(
			<div style={{marginBottom:'20px'}}>
				<div style={{display:'flex',justifyContent:'space-between',background:'#fff',padding:20,marginBottom:10,paddingBottom:0,borderRadius:6}}>
					<Card style={{ width: '18%',background:'#faad1480',border:0,borderRadius:6 }} onClick={ () =>{this.skipTo("/my/subMy/record")}}>
					  	<span style={{fontSize:14,color:'#fff'}}>我的消费</span><br/>
					  	<span style={{fontSize:50,color:'#fff'}}>{this.state.modelData.record}<font style={{fontSize:14}}>￥</font></span><br/>
					  	<span style={{fontSize:14,color:'#fff'}}>上周消费了:300￥</span>
				  	</Card>
				  	
					<Card style={{ width: '18%',background:'#ff4d4f80',border:0,borderRadius:6 }} onClick={ () =>{this.skipTo("/my/subMy/task")}}>
					    <span style={{fontSize:14,color:'#fff'}}>我的计划</span><br/>
					  	<span style={{fontSize:50,color:'#fff'}}>{this.state.modelData.task}<font style={{fontSize:14}}>项</font></span><br/>
					  	<span style={{fontSize:14,color:'#fff'}}>待完成:{this.state.modelData.task}</span>
				  	</Card>
				  	
				  	<Card style={{ width: '18%',background:'#e47edc',border:0,borderRadius:6 }} onClick={ () =>{this.skipTo("/my/subMy/note")}}>
					    <span style={{fontSize:14,color:'#fff'}}>我的笔记</span><br/>
					  	<span style={{fontSize:50,color:'#fff'}}>{this.state.modelData.note}<font style={{fontSize:14}}>项</font></span><br/>
					  	<span style={{fontSize:14,color:'#fff'}}>已录入:{this.state.modelData.note}</span>
				  	</Card>
				  	
				  	<Card style={{ width: '18%',background:'#52c41a80',border:0,borderRadius:6 }} onClick={ () =>{this.skipTo("/my/subMy/learn")}}>
					    <span style={{fontSize:14,color:'#fff'}}>技术汇总</span><br/>
					  	<span style={{fontSize:50,color:'#fff'}}>{this.state.modelData.learn}<font style={{fontSize:14}}>项</font></span><br/>
					  	<span style={{fontSize:14,color:'#fff'}}>未掌握:{this.state.modelData.learn}</span>
				  	</Card>
				  	
			  		<Card style={{ width: '18%',background:'#bae7ff80',border:0,borderRadius:6 }} onClick={ () =>{this.skipTo("/my/subMy/Blog")}}>
					    <span style={{fontSize:14,color:'#fff'}}>牛人博客</span><br/>
					  	<span style={{fontSize:50,color:'#fff'}}>{this.state.modelData.blog}<font style={{fontSize:14}}>项</font></span><br/>
					  	<span style={{fontSize:14,color:'#fff'}}>已录入:{this.state.modelData.blog}</span>
				  	</Card>
				</div>
				
				<div style={{}}>
					<div style={{display:'flex',justifyContent:'space-between'}}>
						<Card  title={this.state.title} extra={
							<Breadcrumb style={{marginTop:8}} separator="|">
							    <Breadcrumb.Item style={{cursor:'pointer'}} onClick={ ()=>{this.changeAntV('record')} }>我的消费</Breadcrumb.Item>
							    <Breadcrumb.Item style={{cursor:'pointer'}} onClick={ ()=>{this.changeAntV('task')} }>我的计划</Breadcrumb.Item>
							    <Breadcrumb.Item style={{cursor:'pointer'}} onClick={ ()=>{this.changeAntV('learn')} }>技术汇总</Breadcrumb.Item>
							    <Breadcrumb.Item style={{cursor:'pointer'}} onClick={ ()=>{this.changeAntV('blog')} }>牛人博客</Breadcrumb.Item>
						  	</Breadcrumb>
						} style={{ width: '100%',border:0 ,borderRadius:6}}>
						    <div style={{fontSize:12,display:'flex',justifyContent:'space-between'}}>
					    	 	<div id="antV"  style={{width:'50%',height:300}}></div>
						   	</div>
					  	</Card>
					</div>
				</div>
				
		    </div>
		);
	}
}
export default Index;