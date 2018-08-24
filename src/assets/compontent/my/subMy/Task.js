import * as React from 'react';
import { Icon,message,Modal,Select,Row,Col,Input,Button,Table,Pagination,DatePicker } from 'antd';
import ReactDOM from 'react-dom';
import moment from 'moment';
const {
	Option
} = Select;
const {
	TextArea
} = Input;
class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			APIS:{
				get:'/my/task/get',
				getList:'/my/task/getList',
				save:'/my/task/save',
				remove:'/my/task/remove'
			},
			columns: [{
				title: '标识',
				key: 'flag',
				dataIndex: 'flag',
				width: 70,
				render:()=>
					<img src="/image/ant-design.svg" style={{width:15,textAlign:'left'}}/>
			},{
				title: '序号',
				key: 'id',
				dataIndex: 'id',
				width: 70,
			}, {
				title: '计划名称',
				key: 'name',
				dataIndex: 'name',
				width: 170,
			}, {
				title: '计划开始时间',
				key: 'task_start',
				dataIndex: 'task_start',
				width: 100,
				render:(task_start)=>
				   <span>{ task_start.substr(0,10) }</span>
			}, {
				title: '计划完成时间',
				key: 'task_end',
				dataIndex: 'task_end',
				width: 100,
				render:(task_end)=>
				   <span>{ task_end.substr(0,10) }</span>
			}, {
				title: '是否完成',
				key: 'isGet',
				dataIndex: 'isGet',
				width: 100,
				render: (isGet) => 
					this.renderisGet(isGet)
			}, {
				title: '创建时间',
				key: 'create_time',
				dataIndex: 'create_time',
				width: 100,
			}, {
				title: '操作',
				key: 'id',
				dataIndex: 'id',
				width: 130,
				render: (id) => [
					<a onClick={ ()=>{this.editItem(id)} } style={{color:'rgb(64, 158, 255)',marginRight:10}}><Icon type="edit" />编辑</a>,
			    	<a onClick={ ()=>{this.removeItemModal(id)} } style={{color:'rgb(64, 158, 255)'}}><Icon type="delete" />删除</a>
				]
			}],
			dict:{
				yes_no:[{
					val:1,
					text:'是'
				},{
					val:0,
					text:'否'
				}]
			},
			searchForm: {
				currentPage: 1,
				pageSize: 10,
				name:'',
				isGet:''
			},
			form:{
				name:'',
				task_start:new Date(),
				task_end:new Date(),
				isGet:'',
				remark:'',
			},
			dataSource: [],
			pagination: {
				totalPage: 0,
			},
			loading:false,
			visible:false,
			formTitle:'新增我的计划',
			confirmLoading:false,
			locale:{
				emptyText:<span><img src="assets/common/image/ant-design.svg" style={{width:15,marginRight:10,marginBottom:2}}/>没有找到想要的结果!</span>
			},
			selectedRowKeys:[],
		};
  	};
	renderisGet = (isGet) =>{
		if(isGet == 0){
			return <span style={{color:'red'}}>未完成</span>
		}else{
			return <span style={{color:'#52c41a'}}>已完成</span>
		}
	};
	handleTableChange = (pagination, filters, sorter) => {
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.currentPage = pagination;
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	};
	onShowSizeChange = (current, pageSize) => {
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.currentPage = current;
		searchForm.pageSize = pageSize;
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	};
	onSelectChange = (selectedRowKeys) => {//多选
	    this.setState({ selectedRowKeys });
  	};
	reset = () =>{
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.name = '';
		searchForm.isGet = '';
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	}
	fetch = (params = {}) => {
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
				dataSource:res.data,
				pagination: {
					totalPage: res.count,
				}
			},()=>{
				
			});
		}).catch(err => {
			console.log(err);
		});
	};
	toForm = (formTitle) =>{
		this.setState({
			formTitle:formTitle
		},()=>{
			this.setState({
				visible:true,
			});
		});
	};
	resetForm = () =>{
		this.setState({
			form:{
				name:'',
				task_start:new Date(),
				task_end:new Date(),
				isGet:'',
				remark:'',
			}
		},()=>{
		});
	}
	handleOk = () =>{
		var that = this;
		window.request({
			url: that.state.APIS.save,
			type: 'POST',
			data: {
				data:JSON.stringify(this.state.form)
			},
		}).then(res => {
			if(res.type == 'add'){
		  		message.success('添加成功');
		  		that.handleCancel();
		  		that.fetch(this.state.searchForm);
			}else if(res.type == 'update'){
		  		message.success('影响行数:'+res.affectedRows);
		  		that.handleCancel();
		  		that.fetch(this.state.searchForm);
			}else{
				message.error('添加失败,标题已存在');
			}
		}).catch(err => {
			console.log(err);
		});
	};
	handleCancel = () =>{
		this.setState({
			visible:false
		},()=>{
			this.resetForm();
		});
	};
	editItem = (id) =>{
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
		  		that.setState({
		  			form,
		  		},()=>{
		  			that.toForm('编辑我的计划');
		  		})
			}else{
		  		message.error('数据查询失败');
			}
		}).catch(err => {
			console.log(err);
		});
	}
	removeItem = (id) =>{
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
			}else{
		  		message.error('删除失败');
			}
		}).catch(err => {
			console.log(err);
		});
	}
	removeItemModal = (id) =>{
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
		let isGetOption = [];
		const format = 'YYYY/MM/DD';
  		this.state.dict.yes_no.map(m=>{
  			isGetOption.push(
  				 <Option value={m.val}>{m.text}</Option>
  			);
  		});
  		const rowSelection = {
	      selectedRowKeys:this.state.selectedRowKeys,
	      onChange: this.onSelectChange,
	    };
		return(
			<div style={{}}>
				<div style={{ width:'100%',marginBottom:'20px',padding:12,background:'#fff',border:'1px solid #f2f2f2',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
					<div style={{width:'75%'}}>
						<Row gutter={20} style={{marginBottom:'0px !important'}} className="list">
						      <Col span={8}>
						      	<Input addonBefore="计划名称" placeholder="计划名称" value={this.state.searchForm.name} 
						      		onChange={ (event)=> {
							      		let searchForm = this.state.searchForm;
							      		searchForm.name = event.target.value;
							      		this.setState({searchForm},()=>{
											/*回调*/
										});
						      		}
						      	}/>
						      </Col>
						      <Col span={8} style={{display:'flex'}}>
						      	<span className='ant-select-group__prepend' style={{width:100}}>是否完成</span>
						      	<Select 
						      		value={this.state.searchForm.isGet}
					        		style={{ width: '90%' }}
					        		onChange={ (e)=> {
							      		let searchForm = this.state.searchForm;
					        			searchForm.isGet = e;
							      		this.setState({searchForm},()=>{
											/*回调*/
										});
									}
							      }>
						     		{isGetOption}
							    </Select>
						      </Col>
					    </Row>
					</div>
					<div style={{width:'25%',textAlign:'right'}}>
				      	<Button style={{marginRight:10}} onClick={this.reset}>重置</Button>
				      	<Button style={{marginRight:10}} icon="search" type="primary" onClick={ () => {this.fetch(this.state.searchForm)} }>查找</Button>
						<Button style={{}} type="primary" onClick={ () => {this.toForm('新增我的计划')} }><Icon type="plus-circle-o" />新增</Button>
					</div>
				</div>
				
				<div style={{border:'1px solid #f2f2f2'}}>
					<Table 
					 	rowKey="uid"
						scroll={{ x: 1100, y: '50vh' }} 
						size="middle" 
						style={{background:'#fff',borderBottom:0}} 
						columns={this.state.columns} 
						dataSource={this.state.dataSource} 
						loading={this.state.loading} 
						pagination={false}
						locale = {this.state.locale}
						rowSelection={rowSelection}
					/>
			    </div>
			    
			    <Pagination 
				    style={{textAlign:'right',padding:10}} 
				    showSizeChanger 
				    showQuickJumper 
				    showTotal={(total, range) => `共   ${total} 条`}
				    onShowSizeChange={this.onShowSizeChange}
				    onChange={this.handleTableChange} 
				    total={this.state.pagination.totalPage} 
			    />
			    
			    
			    <Modal title={this.state.formTitle}
			    	width={820}
			    	maskClosable={false}
          			visible={this.state.visible}
	          		onOk={this.handleOk}
	         		confirmLoading={this.state.confirmLoading}
	          		onCancel={this.handleCancel}
		        >
				    <div>
		          		<Row type="flex" justify="start">
		          			<Col className="gutter-row" span={12} id='data'>
				          		<div style={{width:'90%'}}>
									<span className="placeholder must">计划名称</span>
								</div>
				        		<Input style={{width:'90%'}}  required={true} value={this.state.form.name}
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
				      		<Col className="gutter-row" span={12} id='data'>
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">是否完成</span>
								</div>
								<Select 
						      	    value={this.state.form.isGet}
					        		style={{ width: '90%' }}
					        		onChange={ (e)=> {
					        			let form = this.state.form;
					        			form.isGet = e;
							      		this.setState({form},()=>{
											/*回调*/
										});
							      	}
						      	}>
						    		{isGetOption}
							    </Select>
							</Col>
				      	</Row>
				      	<Row type="flex" justify="start">
				      		<Col className="gutter-row" span={12} id='data1'>
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">开始时间</span>
								</div>
								<DatePicker 
			        				style={{ width: '90%' }}
			        				format={format}
			        				value={moment(this.state.form.task_start, format)}
			        				getCalendarContainer={() => document.getElementById('data1')}
			        				onChange={ (e)=> {
						        			let form = this.state.form;
						        			form.task_start = e;
								      		this.setState({form},()=>{
												/*回调*/
											});
								      	}
					        		}
			        			/>
							</Col>
				      		<Col className="gutter-row" span={12} id='data2'>
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">结束时间</span>
								</div>
								<DatePicker 
			        				style={{ width: '90%' }}
			        				format={format}
			        				value={moment(this.state.form.task_end, format)}
			        				getCalendarContainer={() => document.getElementById('data2')}
			        				onChange={ (e)=> {
						        			let form = this.state.form;
						        			form.task_end = e;
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
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">备注</span>
								</div>
								<TextArea rows={4} style={{width:'95%'}} value={this.state.form.remark} 
						      		onChange={ (event)=> {
							      		let form = this.state.form;
							      		form.remark = event.target.value;
							      		this.setState({form},()=>{
											/*回调*/
										});
						      		}
						      	}/>
							</Col>
				      	</Row>
				    </div>
		        </Modal>
		    </div>
		);
	}
}
export default Task;