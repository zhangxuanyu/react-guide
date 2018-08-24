import * as React from 'react';
import { Icon,message,Modal,Select,Row,Col,Input,Button,Table,Pagination,DatePicker } from 'antd';
import ReactDOM from 'react-dom';
const {
	Option
} = Select;
class ListScheme extends React.Component {
	state = { //类似data
		data: [],
		columns: [{
			title: '标识',
			key: 'flag',
			dataIndex: 'flag',
			width: 30,
			render:()=>
				<img src="image/ant-design.svg" style={{width:15,textAlign:'left'}}/>
		},{
			title: '序号',
			key: 'id',
			dataIndex: 'id',
			width: 100,
		}, {
			title: '产品名称',
			key: 'schemeName',
			dataIndex: 'schemeName',
			width: 100,
		}, {
			title: '产品性质',
			key: 'isQuota',
			dataIndex: 'isQuota',
			width: 100,
		}, {
			title: '状态',
			key: 'statusName',
			dataIndex: 'statusName',
			width: 100,
			render: (props) => this.setStatus(props)
		}, {
			title: '操作',
			key: 'opration',
			dataIndex: 'opration',
			width: 100,
			render: () => [
				<a href="javascript:;" style={{color:'rgb(64, 158, 255)',marginRight:20}}>查看</a>,
				<a href="javascript:;" style={{color:'rgb(64, 158, 255)',marginRight:20}}>编辑</a>,
				<a href="javascript:;" style={{color:'rgb(64, 158, 255)'}}>删除</a>,
			]
		}],
		searchForm: {
			currentPage: 1,
			pageSize: 8,
			userName:''
		},
		pagination: {
			totalPage: 0,
		},
		loading: false,
		searchMoreDisplay:'none',
		btnMore:'更多'
	};
	setStatus = (statusName) => {
		if(statusName == '已启用'){
			return <a href="javascript:;" style={{color:'rgb(64, 158, 255)'}}>{statusName}</a>
		}else if(statusName == '已禁用'){
			return <a href="javascript:;" style={{color:'rgb(232, 90, 113)'}}>{statusName}</a>
		}else if(statusName == '审核中'){
			return <a href="javascript:;" style={{color:'rgb(255, 205, 0)'}}>{statusName}</a>
		}else if(statusName == '审核不通过'){
			return <a href="javascript:;" style={{color:'rgb(232, 90, 113)'}}>{statusName}</a>
		}
			
	};
	handleTableChange = (pagination, filters, sorter) => {
		let that = this;
		that.setState({
			searchForm: {
				currentPage: pagination,
				pageSize: 8,
			}
		}, () => {
			that.fetch(that.state.searchForm);
		});
	};
	onShowSizeChange = (current, pageSize) => {
		let that = this;
		that.setState({
			searchForm: {
				currentPage: current,
				pageSize: pageSize,
			}
		}, () => {
			that.fetch(that.state.searchForm);
		});
	};
	fetch = (params = {}) => {
		let that = this;
		that.setState({
			loading: true
		});
		let data = {"success":true,"count":76,"list":[{"id":667,"isQuota":"固定贷","schemeName":"金融方案报备","status":"IS_ENABLED","statusName":"已启用"},{"id":666,"isQuota":"固定贷","schemeName":"奔驰21","status":"IS_ENABLED","statusName":"已启用"},{"id":201,"isQuota":"常规贷","schemeName":"测试测试猜猜猜","status":"AUDITING","statusName":"审核中"},{"id":200,"isQuota":"固定贷","schemeName":"112212","status":"AUDITING","statusName":"审核中"},{"id":119,"isQuota":"固定贷","schemeName":"121221","status":"AUDITING","statusName":"审核中"},{"id":118,"isQuota":"固定贷","schemeName":"新的","status":"AUDITING","statusName":"审核中"},{"id":117,"isQuota":"固定贷","schemeName":"金融方案","status":"AUDITING","statusName":"审核中"},{"id":116,"isQuota":"固定贷","schemeName":"新增测试","status":"AUDITING","statusName":"审核中"},{"id":115,"isQuota":"固定贷","schemeName":"新的金融方案","status":"IS_ENABLED","statusName":"已启用"},{"id":113,"isQuota":"固定贷","schemeName":"金融方案(计算公式测试)","status":"IS_ENABLED","statusName":"已启用"},{"id":111,"isQuota":"固定贷","schemeName":"的说的饭","status":"IS_ENABLED","statusName":"已启用"},{"id":110,"isQuota":"固定贷","schemeName":"测试金融方案","status":"AUDITING","statusName":"审核中"},{"id":109,"isQuota":"固定贷","schemeName":"21212","status":"IS_ENABLED","statusName":"已启用"},{"id":108,"isQuota":"固定贷","schemeName":"23是的","status":"AUDITING","statusName":"审核中"},{"id":106,"isQuota":"固定贷","schemeName":"将会放缓","status":"AUDITING","statusName":"审核中"},{"id":94,"isQuota":"固定贷","schemeName":"名单","status":"AUDITING","statusName":"审核中"},{"id":93,"isQuota":"固定贷","schemeName":"从","status":"IS_ENABLED","statusName":"已启用"},{"id":90,"isQuota":"固定贷","schemeName":"产品","status":"IS_ENABLED","statusName":"已启用"},{"id":89,"isQuota":"固定贷","schemeName":"12121212","status":"AUDITING","statusName":"审核中"},{"id":88,"isQuota":"固定贷","schemeName":"请问","status":"AUDITING","statusName":"审核中"},{"id":87,"isQuota":"常规贷","schemeName":"资金方高息","status":"AUDITING","statusName":"审核中"},{"id":86,"isQuota":"固定贷","schemeName":"资金贴息银行","status":"IS_ENABLED","statusName":"已启用"},{"id":85,"isQuota":"固定贷","schemeName":"23","status":"AUDITING","statusName":"审核中"},{"id":84,"isQuota":"固定贷","schemeName":"测试测试","status":"IS_ENABLED","statusName":"已启用"},{"id":82,"isQuota":"固定贷","schemeName":"最新测试","status":"IS_ENABLED","statusName":"已启用"},{"id":79,"isQuota":"常规贷","schemeName":"fdgdfg","status":"AUDITING","statusName":"审核中"},{"id":78,"isQuota":"固定贷","schemeName":"1","status":"IS_ENABLED","statusName":"已启用"},{"id":76,"isQuota":"常规贷","schemeName":"得的","status":"DISABLED","statusName":"已停用"},{"id":73,"isQuota":"常规贷","schemeName":"1","status":"AUDITING","statusName":"审核中"},{"id":72,"isQuota":"常规贷","schemeName":"俺是个好地方","status":"IS_ENABLED","statusName":"已启用"},{"id":71,"isQuota":"常规贷","schemeName":"1","status":"AUDITING","statusName":"审核中"},{"id":70,"isQuota":"常规贷","schemeName":"测试数据1","status":"AUDIT_NOT_PASS","statusName":"审核不通过"},{"id":69,"isQuota":"常规贷","schemeName":"贴息","status":"AUDITING","statusName":"审核中"},{"id":68,"isQuota":"固定贷","schemeName":"方案2","status":"AUDITING","statusName":"审核中"},{"id":67,"isQuota":"常规贷","schemeName":"金融方案1","status":"AUDITING","statusName":"审核中"},{"id":66,"isQuota":"固定贷","schemeName":"方案","status":"IS_ENABLED","statusName":"已启用"},{"id":65,"isQuota":"常规贷","schemeName":"流程测试","status":"IS_ENABLED","statusName":"已启用"},{"id":64,"isQuota":"常规贷","schemeName":"十六点","status":"IS_ENABLED","statusName":"已启用"},{"id":63,"isQuota":"常规贷","schemeName":"测试","status":"IS_ENABLED","statusName":"已启用"},{"id":62,"isQuota":"固定贷","schemeName":"高息","status":"IS_ENABLED","statusName":"已启用"},{"id":61,"isQuota":"常规贷","schemeName":"666","status":"IS_ENABLED","statusName":"已启用"},{"id":60,"isQuota":"常规贷","schemeName":"贴息","status":"IS_ENABLED","statusName":"已启用"},{"id":58,"isQuota":"常规贷","schemeName":"高息","status":"AUDIT_NOT_PASS","statusName":"审核不通过"},{"id":57,"isQuota":"常规贷","schemeName":"飒回复","status":"IS_ENABLED","statusName":"已启用"},{"id":52,"isQuota":"常规贷","schemeName":"测试","status":"IS_ENABLED","statusName":"已启用"},{"id":51,"isQuota":"常规贷","schemeName":"45","status":"AUDITING","statusName":"审核中"},{"id":50,"isQuota":"常规贷","schemeName":"qawszx","status":"AUDITING","statusName":"审核中"},{"id":49,"isQuota":"常规贷","schemeName":"qweasd","status":"AUDITING","statusName":"审核中"},{"id":48,"isQuota":"常规贷","schemeName":"艾弗森","status":"AUDITING","statusName":"审核中"},{"id":47,"isQuota":"常规贷","schemeName":"方案1","status":"AUDITING","statusName":"审核中"}],"info":"操作成功"}
		that.setState({
			spinning: false,
			loading: false,
			data: data.list,
			pagination: {
				totalPage: data.count,
			}
		});
		/*window.request({
			url: '/scheme/querySchemeAll',
			method: 'POST',
			data: params,
		}).then(data => {
			that.setState({
				spinning: false,
				loading: false,
				data: data.list,
				pagination: {
					totalPage: data.count,
				}
			});
		}).catch(err => {
			console.log(err);
		});*/
	};
	toForm = () =>{
		window.location.hash = '#/scheme/form'
	};
	searchMore = () =>{
		if(this.state.searchMoreDisplay == 'flex'){
			this.setState({
				searchMoreDisplay:'none',
				btnMore:'更多'
			});
		}else{
			this.setState({
				searchMoreDisplay:'flex',
				btnMore:'收起更多'
			});
		}
	};
	componentDidMount() { //类似mounted
		let that = this;
		that.fetch(that.state.searchForm);
	};
	render() {
		return(
			<div style={{}}>
				<div style={{ width:'100%',marginBottom:'20px',padding:12,background:'#fff',border:'1px solid #f2f2f2',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
					<div style={{width:'75%'}}>
						<Row gutter={20} style={{marginBottom:'0px !important'}} className="list">
						      <Col span={8}>
						      	<Input addonBefore="客户姓名" placeholder="客户姓名" />
						      </Col>
						      <Col span={8}>
						      	<Input addonBefore="贷款金额" placeholder="贷款金额" />
						      </Col>
						      <Col span={8} style={{display:'flex'}}>
						      	<span className='ant-select-group__prepend' style={{width:100}}>当前进度</span>
						      	<Select 
					        		defaultValue="lucy" 
					        		style={{ width: '90%' }}
					        		showSearch
				        		 	optionFilterProp="children"
						            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				        		>
							      <Option value="jack">Jack</Option>
							      <Option value="lucy">Lucy</Option>
							      <Option value="disabled" disabled>Disabled</Option>
							      <Option value="Yiminghe">yiminghe</Option>
							    </Select>
						      </Col>
					    </Row>
					</div>
					<div style={{width:'25%',textAlign:'right'}}>
				      	<Button style={{marginRight:10}}>重置</Button>
				      	<Button style={{marginRight:10}} type="primary">查找</Button>
				      	<Button style={{marginRight:10}} type="dashed" onClick={this.searchMore}>{this.state.btnMore}</Button>
					</div>
				</div>
				<div style={{position:'relative',width:'100%',marginBottom:'20px',padding:12,background:'#fff',border:'1px solid #f2f2f2',display:this.state.searchMoreDisplay,justifyContent:'space-between',alignItems:'center'}}>
					<span style={{fontSize:12,textAlign:'center',transform:'rotate(-45deg)',
						display:'inline-block',position:'absolute',top:14,left:-1,background:'#ead6d782',
						width:50,zIndex:99999,color:'#fff'}}>
						more
					</span>
					<div style={{width:'100%',display:''}}>
						<Row gutter={20}  type="flex" justify="start">
						      <Col span={6}>
						      	<Input addonBefore="客户姓名" placeholder="客户姓名" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="贷款金额" placeholder="贷款金额" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
						       <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
					    </Row>
					    <Row gutter={20} type="flex" justify="start">
						      <Col span={6}>
						      	<Input addonBefore="客户姓名" placeholder="客户姓名" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="贷款金额" placeholder="贷款金额" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
						       <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
					    </Row>
					    <Row gutter={20} type="flex" justify="start">
						      <Col span={6}>
						      	<Input addonBefore="客户姓名" placeholder="客户姓名" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="贷款金额" placeholder="贷款金额" />
						      </Col>
						      <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
						       <Col span={6}>
						      	<Input addonBefore="当前进度" placeholder="当前进度" />
						      </Col>
					    </Row>
					</div>
				</div>
				<div style={{border:'1px solid #f2f2f2'}}>
					<Table 
					 	rowKey="uid"
						scroll={{ x: 600, y: '50vh' }} 
						size="middle" 
						style={{background:'#fff',borderBottom:0}} 
						columns={this.state.columns} 
						dataSource={this.state.data} 
						loading={this.state.loading} 
						pagination={false}
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
		    </div>
		);
	}
}
export default ListScheme