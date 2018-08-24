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
class Learn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			APIS:{
				get:'/my/learn/get',
				getList:'/my/learn/getList',
				save:'/my/learn/save',
				remove:'/my/learn/remove'
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
				title: '标题',
				key: 'name',
				dataIndex: 'name',
				width: 170,
				render: (name,record) => 
					<a href={record.url} target="_blank" style={{color:'rgb(64, 158, 255)'}}>{record.name}</a>,
			}, {
				title: '分类',
				key: 'type',
				dataIndex: 'type',
				width: 100,
				render: (type) => 
					this.renderType(type)
			}, {
				title: '是否掌握',
				key: 'isKnow',
				dataIndex: 'isKnow',
				width: 100,
				render: (isKnow) => 
					this.renderIsKnow(isKnow)
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
				type:[{
					val:0,
					text:'javascript'
				},{
					val:1,
					text:'node'
				},{
					val:2,
					text:'css'
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
				type:'',
				isKnow:''
			},
			form:{
				name:'',
				url:'',
				type:'',
				isKnow:'',
				content:'',
				remark:'',
			},
			dataSource: [],
			pagination: {
				totalPage: 0,
			},
			loading:false,
			visible:false,
			formTitle:'新增技术汇总',
			confirmLoading:false,
			locale:{
				emptyText:<span><img src="assets/common/image/ant-design.svg" style={{width:15,marginRight:10,marginBottom:2}}/>没有找到想要的结果!</span>
			},
			selectedRowKeys:[],
		};
  	};
	renderType = (type) =>{
		let val = this.state.dict.type.filter(m=>{
			return m.val == type;
		})[0].text;
		return <span style={{background:'#52c41a',color:'#fff',padding:4,borderRadius:4}}>{val}</span>
	};
	renderIsKnow = (isKnow) =>{
		if(isKnow == 0){
			return <span style={{color:'red'}}>暂未掌握</span>
		}else{
			return <span style={{color:'#1890ff'}}>已经掌握</span>
		}
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
	onSelectChange = (selectedRowKeys) => {//多选
	    this.setState({ selectedRowKeys });
  	}
	reset = () =>{//重置查询
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.name = '';
		searchForm.type = '';
		searchForm.isKnow = '';
  		this.setState({searchForm},()=>{
			that.fetch(that.state.searchForm);
		});
	}
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
	toForm = (formTitle) =>{//跳转表单
		this.setState({
			formTitle:formTitle
		},()=>{
			this.setState({
				visible:true,
			});
		});
	};
	resetForm = () =>{//重置表单
		this.setState({
			form:{
				remark: '',
				url: '',
				name:'',
				type:'',
				isKnow:''
			}
		},()=>{
			
		});
	}
	handleOk = () =>{//提交表单
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
	handleCancel = () =>{//取消编辑
		this.setState({
			visible:false
		},()=>{
			this.resetForm();
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
		  		that.setState({
		  			form,
		  		},()=>{
		  			that.toForm('编辑技术汇总');
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
			}else{
		  		message.error('删除失败');
			}
		}).catch(err => {
			console.log(err);
		});
	}
	removeItemModal = (id) =>{//打开删除数据框
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
		let isKnowOption = [];
  		this.state.dict.type.map(m=>{
  			typeOption.push(
  				 <Option value={m.val}>{m.text}</Option>
  			);
  		});
  		this.state.dict.yes_no.map(m=>{
  			isKnowOption.push(
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
						      <Col span={8} style={{display:'flex'}}>
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
						       <Col span={8} style={{display:'flex'}}>
						      	<span className='ant-select-group__prepend' style={{width:100}}>是否掌握</span>
						      	<Select 
						      		value={this.state.searchForm.isKnow}
					        		style={{ width: '90%' }}
					        		onChange={ (e)=> {
							      		let searchForm = this.state.searchForm;
					        			searchForm.isKnow = e;
							      		this.setState({searchForm},()=>{
											/*回调*/
										});
									}
							      }>
						     		{isKnowOption}
							    </Select>
						      </Col>
					    </Row>
					</div>
					<div style={{width:'25%',textAlign:'right'}}>
				      	<Button style={{marginRight:10}} onClick={this.reset}>重置</Button>
				      	<Button style={{marginRight:10}} icon="search" type="primary" onClick={ () => {this.fetch(this.state.searchForm)} }>查找</Button>
						<Button style={{}} type="primary" onClick={ () => {this.toForm('新增技术汇总')} }><Icon type="plus-circle-o" />新增</Button>
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
									<span className="placeholder must">标题</span>
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
									<span className="placeholder must">链接</span>
								</div>
				        		<Input style={{width:'90%'}}  required={true} value={this.state.form.url}
					        		onChange={ (e)=> {
						        			let form = this.state.form;
						        			form.url = e.target.value;
								      		this.setState({form},()=>{
												/*回调*/
											});
								      	}
					        		}
				        		/>
				        	</Col>
				      	</Row>
				      	<Row type="flex" justify="start">
				      		<Col className="gutter-row" span={12} id='data'>
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">分类</span>
								</div>
								<Select 
						      	    value={this.state.form.type}
					        		style={{ width: '90%' }}
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
				      		<Col className="gutter-row" span={12} id='data'>
				      			<div style={{width:'90%'}}>
									<span className="placeholder must">是否掌握</span>
								</div>
								<Select 
						      	    value={this.state.form.isKnow}
					        		style={{ width: '90%' }}
					        		onChange={ (e)=> {
					        			let form = this.state.form;
					        			form.isKnow = e;
							      		this.setState({form},()=>{
											/*回调*/
										});
							      	}
						      	}>
						    		{isKnowOption}
							    </Select>
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
export default Learn;