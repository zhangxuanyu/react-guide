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
class Record extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			APIS:{
				get:'/my/record/get',
				getList:'/my/record/getList',
				save:'/my/record/save',
				remove:'/my/record/remove'
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
				title: '购买物品',
				key: 'name',
				dataIndex: 'name',
				width: 170,
			}, {
				title: '支付方式',
				key: 'type',
				dataIndex: 'type',
				width: 100,
				render: (type) => 
					this.renderType(type)
			}, {
				title: '价格',
				key: 'price',
				dataIndex: 'price',
				width: 100,
				render:(price)=>
					<span>￥{price}</span>
			}, {
				title: '是否盈利',
				key: 'isGet',
				dataIndex: 'isGet',
				width: 100,
				render: (isGet) => 
					this.renderisGet(isGet)
			}, {
				title: '消费时间',
				key: 'record_time',
				dataIndex: 'record_time',
				width: 100,
				render:(record_time)=>
				   <span>{ record_time.substr(0,10) }</span>
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
					text:'支付宝'
				},{
					val:1,
					text:'微信'
				},{
					val:2,
					text:'银行卡'
				},{
					val:3,
					text:'现金'
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
				isGet:''
			},
			form:{
				name:'',
				type:'',
				isGet:'',
				content:'',
				remark:'',
				price:'',
				record_time:new Date(),
			},
			dataSource: [],
			pagination: {
				totalPage: 0,
			},
			loading:false,
			visible:false,
			formTitle:'新增消费记录',
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
	renderisGet = (isGet) =>{
		if(isGet == 0){
			return <span style={{color:'#52c41a'}}>花费</span>
		}else{
			return <span style={{color:'red'}}>盈利</span>
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
  	}
	reset = () =>{
		let that = this;
		let searchForm = this.state.searchForm;
		searchForm.name = '';
		searchForm.type = '';
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
				type:'',
				isGet:'',
				content:'',
				remark:'',
				record_time:new Date(),
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
		  			that.toForm('编辑消费记录');
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
		let typeOption = [];
		let isGetOption = [];
		const format = 'YYYY/MM/DD';
  		this.state.dict.type.map(m=>{
  			typeOption.push(
  				 <Option value={m.val}>{m.text}</Option>
  			);
  		});
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
						      	<Input addonBefore="物品" placeholder="物品" value={this.state.searchForm.name} 
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
						      	<span className='ant-select-group__prepend' style={{width:100}}>支付方式</span>
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
						      	<span className='ant-select-group__prepend' style={{width:100}}>是否盈利</span>
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
						<Button style={{}} type="primary" onClick={ () => {this.toForm('新增消费记录')} }><Icon type="plus-circle-o" />新增</Button>
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
									<span className="placeholder must">物品</span>
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
									<span className="placeholder must">价格</span>
								</div>
				        		<Input style={{width:'90%'}}  required={true} value={this.state.form.price}
					        		onChange={ (e)=> {
						        			let form = this.state.form;
						        			form.price = e.target.value;
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
									<span className="placeholder must">支付方式</span>
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
									<span className="placeholder must">是否盈利</span>
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
										<span className="placeholder must">花费时间</span>
									</div>
									<DatePicker 
				        				style={{ width: '90%' }}
				        				format={format}
				        				value={moment(this.state.form.record_time, format)}
				        				getCalendarContainer={() => document.getElementById('data1')}
				        				onChange={ (e)=> {
							        			let form = this.state.form;
							        			form.record_time = e;
									      		this.setState({form},()=>{
													/*回调*/
												});
									      	}
						        		}
				        			/>
							</Col>
				      		<Col className="gutter-row" span={12} id='data'>
				      			<div style={{width:'85%'}}>
									<span className="placeholder must">备注</span>
								</div>
								<TextArea rows={1} style={{width:'90%'}} value={this.state.form.remark} 
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
export default Record;