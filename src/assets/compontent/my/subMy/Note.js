import * as React from 'react';
import { Timeline,Card,message,Modal,Select,Icon,Row,Col,Input,Button} from 'antd';
import ReactDOM from 'react-dom';
const {
	Option
} = Select;
const {
	TextArea
} = Input;
class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			APIS:{
				get:'/my/note/get',
				getList:'/my/note/getList',
				save:'/my/note/save',
				remove:'/my/note/remove'
			},
			dict:{
				type:[{
					val:-1,
					text:'全部'
				},{
					val:0,
					text:'javascript'
				},{
					val:1,
					text:'node'
				},{
					val:3,
					text:'webApp'
				},{
					val:4,
					text:'vue'
				},{
					val:5,
					text:'react'
				},{
					val:6,
					text:'自己总结'
				}],
			},
			searchForm: {
				currentPage: 1,
				pageSize: 10,
				name:'',
				type:'',
			},
			form:{
				name:'',
				type:'',
				content:'',
			},
			dataSource: {},
			pagination: {
				totalPage: 0,
			},
			loading:false,
			titleInfo:'添加一条笔记吧！'
		};
  	};
	renderType = (type) =>{
		let val = this.state.dict.type.filter(m=>{
			return m.val == type;
		})[0].text;
		return <span style={{background:'#52c41a',color:'#fff',padding:4,borderRadius:4}}>{val}</span>
	};
	handleTableChange = (pagination, filters, sorter) => {//分页
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.currentPage = pagination;
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	};
	onShowSizeChange = (current, pageSize) => {//调整每页大小
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.currentPage = current;
		searchForm.pageSize = pageSize;
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	};
	fetch = (params = {}) => {//加载数据
		let that = this;
		that.setState({
			loading: true
		});
		window.request({
			url: that.state.APIS.getList,
			type: 'POST',
			data: params,
		}).then(res => {
			that.setState({
				loading:false,
				dataSource:res,
				pagination: {
					totalPage: res.count,
				}
			},()=>{
				that.resetForm();
			});
		}).catch(err => {
			console.log(err);
		});
	};
	resetForm = () =>{//重置表单
		let that = this;
		this.setState({
			form:{
				name:'',
				type:'',
				content:''
			}
		},()=>{
			//取消选中
  			let dataSource = that.state.dataSource;
  			for(let key in dataSource){
  				dataSource[key].map(m=>{
  					m.checked = false;
	  			});
  			}
  			that.setState({
  				dataSource
	  		},()=>{
	  			that.setState({//设置表单标题
	  				titleInfo:'添加一条笔记吧！'
		  		},()=>{
		  			
		  		})
	  		})
		});
	}
	handleOk = () =>{//提交表单
		let that = this;
		let data = this.state.form;
		for(let key in data){
			if(data[key] === ''){
		  		message.error('必填项不能为空！');
		  		return false;
			}
		}
		
		window.request({
			url: that.state.APIS.save,
			type: 'POST',
			data: {
				data:JSON.stringify(data)
			},
		}).then(res => {
			if(res.type == 'add'){
		  		message.success('添加成功');
		  		that.fetch(this.state.searchForm);
		  		that.resetForm();
			}else if(res.type == 'update'){
		  		message.success('影响行数:'+res.affectedRows);
		  		that.fetch(this.state.searchForm);
		  		that.resetForm();
			}else{
				message.error('添加失败,标题已存在');
			}
		}).catch(err => {
			console.log(err);
		});
	};
	editItem = (id) =>{//编辑加载基础数据
		let that = this;
		window.request({
			url: that.state.APIS.get,
			type: 'POST',
			data: {
				id:id
			},
		}).then(res => {
			if(res.success){
				let form = res.data;
		  		that.setState({//设置表单数据
		  			form,
		  		},()=>{
		  			let dataSource = that.state.dataSource;
		  			for(let key in dataSource){
		  				dataSource[key].map(m=>{
			  				if(m.id == id){
			  					m.checked = true;
			  					return false;
			  				}else{
			  					m.checked = false;
			  				}
			  			});
		  			}
		  			that.setState({//设置当前为选中项
		  				dataSource
			  		},()=>{
			  			that.setState({//设置表单标题
			  				titleInfo:'正在编辑这条笔记...'
				  		},()=>{
				  			
				  		})
			  		})
		  		})
			}else{
		  		message.error('数据查询失败');
			}
		}).catch(err => {
			console.log(err);
		});
	}
	removeItem = (id) =>{//删除数据
		var that = this;
	 	window.request({
			url: that.state.APIS.remove,
			type: 'POST',
			data: {
				id:id
			},
		}).then(res => {
			if(res.success){
		  		message.success('删除成功');
		  		that.fetch(this.state.searchForm);
		  		if(that.state.form.id != undefined){//清空正在编辑的表单
		  			that.resetForm();
		  		}
			}else{
		  		message.error('删除失败');
			}
		}).catch(err => {
			console.log(err);
		});
	}
	removeItemModal = (id) =>{//打开删除提示框
	 	Modal.confirm({
		    title: '提示',
		    maskClosable:true,
		    content: '确认删除这条数据？',
		    okText: '确认',
		    cancelText: '取消',
		    onOk:()=>this.removeItem(id)
	  	});
	}
	componentDidMount() { //类似mounted
		let that = this;
		that.fetch(that.state.searchForm);
	};
	render() {
		let typeOption = [];
  		this.state.dict.type.map(m=>{
  			typeOption.push(
  				<Option value={m.val}>{m.text}</Option>
  			);
  		});
  		let myTimeline = [];
  		for(let key in this.state.dataSource){
  			let item = [];
  			this.state.dataSource[key].map(m=>{
  				let type = this.state.dict.type.filter(mm=>{
					return mm.val == m.type;
				})[0].text;
				let edit = '';
				let remove = '';
				if(m.checked){
					edit = <span><Icon type="edit" />取消编辑</span>;
					//remove = <span><Icon type="close-circle-o" />删除</span>;
				}
  				item.push(
  					<div style={{display:'flex',justifyContent:'start'}}>
	  					<p style={{cursor:'pointer'}} onClick={ ()=> {this.editItem(m.id)} }>
	  						<span style={{fontSize:12,paddingLeft:6}}>{m.name}</span>
	  						<span style={{fontSize:12,paddingLeft:6}}>{m.time}</span>
	  						<span style={{fontSize:12,marginLeft:6,padding:3,color:'#fff',background:'#52c41a',borderRadius:4}}>{type}</span>
	  					</p>
	  					<p style={{cursor:'pointer'}}>
							<span style={{fontSize:12,paddingLeft:6,color:'#1890ff'}} onClick={ ()=> {this.resetForm()} }>{edit}</span>
							<span style={{fontSize:12,paddingLeft:6,color:'#f5222d'}} onClick={ ()=> {this.removeItemModal(m.id)} }>{remove}</span>
						</p>
					</div>
  				)
  			});
  			myTimeline.push(
  				<Timeline.Item>{item}</Timeline.Item>
  			)
  		}
		return(
			<div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{ width:'46%',padding:12,background:'#fff',border:'1px solid #f2f2f2',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:0}}>
						<div style={{width:'75%'}}>
							<Row gutter={20} style={{marginBottom:'0px !important'}} className="list">
							      <Col span={12}>
							      	<Input addonBefore="标题" placeholder="标题" value={this.state.searchForm.name} 
							      		onChange={ (event)=> {
								      		let searchForm = this.state.searchForm;
								      		searchForm.name = event.target.value;
								      		this.setState({searchForm},()=>{
												/*回调*/
											});
							      		}
							      	}/>
							      </Col>
							      <Col span={12} style={{display:'flex'}}>
							      	<span className='ant-select-group__prepend' style={{width:100}}>分类</span>
							      	<Select 
							      	    value={this.state.searchForm.type}
						        		style={{ width: '90%' }}
						        		onChange={ (e)=> {
						        			let searchForm = this.state.searchForm;
						        			searchForm.type = e;
								      		this.setState({searchForm},()=>{
												/*回调*/
											});
								      	}
							      	}>
							    		{typeOption}
								    </Select>
							       </Col>
						    </Row>
						</div>
						<div style={{width:'25%',textAlign:'right'}}>
					      	<Button style={{marginRight:10}} icon="search" type="primary" onClick={ () => {this.fetch(this.state.searchForm)} }>查找</Button>
						</div>
					</div>
					<div style={{ width:'50%',padding:12,background:'#fff',border:'1px solid #f2f2f2',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:0}}>
						<div style={{width:'75%',color:'#1890ff'}}>
							<Icon type="edit" />
							<span style={{paddingLeft:6}}>{this.state.titleInfo}</span>
						</div>
						<div style={{width:'25%',textAlign:'right'}}>
					      	<Button style={{marginRight:10}} type="primary" onClick={ () => {this.handleOk()} }>保存</Button>
						</div>
					</div>
				</div>
				
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<Card title="笔记记录" style={{ width: '46%'}} loading={this.state.loading}>
						<Timeline style={{height:'46vh',overflow:'auto',padding:10}}>
						    {myTimeline}
					  	</Timeline>
					</Card>
					<Card style={{ width: '50%' }}>
						<Row type="flex" justify="start">
			          			<Col className="gutter-row" span={24} id='data'>
					          		<div style={{width:'100%'}}>
										<span className="placeholder must">标题</span>
									</div>
					        		<Input style={{width:'100%'}}  required={true} value={this.state.form.name}
						        		onChange={ (e)=> {
							        			let form = this.state.form;
							        			form.name = e.target.value;
									      		this.setState({form},()=>{
													/*回调*/
												});
									      	}
						        		}
					        		/>
					        	</Col>
					      	</Row>
					      	<Row type="flex" justify="start">
					      		<Col className="gutter-row" span={24} id='data'>
					      			<div style={{width:'100%'}}>
										<span className="placeholder must">分类</span>
									</div>
									<Select 
							      	    value={this.state.form.type}
						        		style={{ width: '100%' }}
						        		onChange={ (e)=> {
							        			let form = this.state.form;
							        			form.type = e;
									      		this.setState({form},()=>{
													/*回调*/
												});
									      	}
						        		}
							      	>
							    		{typeOption}
								    </Select>
								</Col>
							</Row>
							<Row>
					      		<Col className="gutter-row" span={24} id='data'>
					      			<div style={{width:'100%'}}>
										<span className="placeholder must">笔记详情</span>
									</div>
									<TextArea rows={12} style={{width:'100%'}} value={this.state.form.content} 
							      		onChange={ (event)=> {
								      		let form = this.state.form;
								      		form.content = event.target.value;
								      		this.setState({form},()=>{
												/*回调*/
											});
							      		}
							      	}/>
								</Col>
					      	</Row>
					</Card>
			    </div>
			</div>
		);
	}
}
export default Note;