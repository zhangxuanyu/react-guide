import * as React from 'react';
import { Card,Icon,message,Modal,Select,Row,Col,Input,Button,Table,Pagination,DatePicker ,Cascader,TreeSelect,Upload} from 'antd';
import MyInput from '../../my/MyInput.js'
import ReactDOM from 'react-dom';
const {
	Option
} = Select;
class FormScheme extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			value: undefined,
			userName:'默认值',
			treeData: [{
				label: 'Node1',
				value: '0-0',
				key: '0-0',
				children: [{
					label: 'Child Node1',
					value: '0-0-1',
					key: '0-0-1',
				}, {
					label: 'Child Node2',
					value: '0-0-2',
					key: '0-0-2',
				}],
			}, {
				label: 'Node2',
				value: '0-1',
				key: '0-1',
			}],
			options:[{
			  value: 'zhejiang',
			  label: 'Zhejiang',
			  children: [{
			    value: 'hangzhou',
			    label: 'Hangzhou',
			    children: [{
			      value: 'xihu',
			      label: 'West Lake',
			    }],
			  }],
			}, {
			  value: 'jiangsu',
			  label: 'Jiangsu',
			  children: [{
			    value: 'nanjing',
			    label: 'Nanjing',
			    children: [{
			      value: 'zhonghuamen',
			      label: 'Zhong Hua Men',
			    }],
			  }],
			}],
			previewVisible: false,
		    previewImage: '',
		    fileList: [{
		      uid: -1,
		      name: 'xxx.png',
		      status: 'done',
		      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		    }],
		};
 	}
	onChange = (value) => {
		this.setState({
			value
		});
	}
	toList = () =>{
		window.location.hash = '#/scheme/list'
	}
	submitForm = () =>{
		alert('正在提交');
	};
	handleCancel = () =>{
		this.setState({
			previewVisible: false
		})
	};
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	};
	handleChange = ({fileList}) => {
		this.setState({
			fileList
		})
	};
	render() {
		const { userName } = this.state;
	 	const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">点击上传</div>
	      </div>
	    );
		return(
			<div style={{padding:20,minHeight:500,background:'#fff',border:'1px solid #f2f2f2'}}>
				<Card title="基本信息" style={{}} extra={<span></span>}>
					<Row type="flex" justify="start">
		        		<MyInput size="6" required={true}  validate="notNull" value={userName}  title="不为空" errorText="不能为空"  />
			      		<MyInput size="6" required={true}  validate="phone"   value={userName}  title="手机号" errorText="填写正确的手机号"  />
			      		<MyInput size="6" required={true}  validate="email"   value={userName}  title="邮箱"   errorText="填写正确的邮箱" />
			      		<MyInput size="6" required={true}  validate="idCard"  value={userName}  title="身份证" errorText="填写正确的身份证" />
			      	</Row>
			      	<Row type="flex" justify="start">
			      		<Col className="gutter-row" span={6} id='data'>
			      			<span class="placeholder must">普通日期</span>
		        			<DatePicker 
		        				style={{ width: '90%' }}
		        				getCalendarContainer={() => document.getElementById('data')}
		        			/>
		        		</Col>
						<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">普通日期</span>
		        			<DatePicker style={{ width: '90%' }}/>
		        		</Col>			      		<MyInput size="6" required={true}  validate="email"   value={userName}  title="邮箱"   errorText="填写正确的邮箱" />
			      		<MyInput size="6" required={true}  validate="idCard"  value={userName}  title="身份证" errorText="填写正确的身份证" />
			      	</Row>
			      	<Row type="flex" justify="start">
			      		<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">普通下拉组件(可查找)</span>
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
			      		<Col className="gutter-row" span={6} id="area">
			      			<span class="placeholder must">下拉多选组件</span>
			        		<Select 
				        		defaultValue="lucy" 
				        		style={{ width: '90%' }}
				        		mode="multiple"
		        		        getPopupContainer={() => document.getElementById('area')}
			        		>
						      <Option value="jack">Jack</Option>
						      <Option value="lucy">Lucy</Option>
						      <Option value="disabled" disabled>Disabled</Option>
						      <Option value="Yiminghe">yiminghe</Option>
						    </Select>
			      		</Col>
			      		<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">下拉级联组件</span>
			        		<Cascader options={this.state.options} style={{ width: '90%' }}/>
			      		</Col>
			      		<Col className="gutter-row" span={6} >
			      			<span class="placeholder must">下拉树组件</span>
			        		<TreeSelect
						        style={{ width: '90%' }}
						        value={this.state.value}
						        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						        treeData={this.state.treeData}
				                multiple
						        treeDefaultExpandAll
						        onChange={this.onChange}
					      	/>
			      		</Col>
			      	</Row>
			    </Card>
			    
			    
			    <Card title="重要信息" style={{}} extra={<span></span>}>
					<Row type="flex" justify="start">
		        		<MyInput size="6" required={true}  validate="notNull" value={userName}  title="不为空" errorText="不能为空"  />
			      		<MyInput size="6" required={true}  validate="phone"   value={userName}  title="手机号" errorText="填写正确的手机号"  />
			      		<MyInput size="6" required={true}  validate="email"   value={userName}  title="邮箱"   errorText="填写正确的邮箱" />
			      		<MyInput size="6" required={true}  validate="idCard"  value={userName}  title="身份证" errorText="填写正确的身份证" />
			      	</Row>
			      	<Row type="flex" justify="start">
		        		<MyInput size="6" required={true}  validate="notNull" value={userName}  title="不为空" errorText="不能为空"  />
			      		<MyInput size="6" required={true}  validate="phone"   value={userName}  title="手机号" errorText="填写正确的手机号"  />
			      		<MyInput size="6" required={true}  validate="email"   value={userName}  title="邮箱"   errorText="填写正确的邮箱" />
			      		<MyInput size="6" required={true}  validate="idCard"  value={userName}  title="身份证" errorText="填写正确的身份证" />
			      	</Row>
			      	<Row type="flex" justify="start">
			      		<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">普通下拉组件(可查找)</span>
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
			      		<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">下拉多选组件</span>
			        		<Select 
				        		defaultValue="lucy" 
				        		style={{ width: '90%' }}
				        		mode="multiple"
			        		>
						      <Option value="jack">Jack</Option>
						      <Option value="lucy">Lucy</Option>
						      <Option value="disabled" disabled>Disabled</Option>
						      <Option value="Yiminghe">yiminghe</Option>
						    </Select>
			      		</Col>
			      		<Col className="gutter-row" span={6}>
			      			<span class="placeholder must">下拉级联组件</span>
			        		<Cascader options={this.state.options} style={{ width: '90%' }}/>
			      		</Col>
			      		<Col className="gutter-row" span={6} >
			      			<span class="placeholder must">下拉树组件</span>
			        		<TreeSelect
						        style={{ width: '90%' }}
						        value={this.state.value}
						        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						        treeData={this.state.treeData}
				                multiple
						        treeDefaultExpandAll
						        onChange={this.onChange}
					      	/>
			      		</Col>
			      	</Row>
			    </Card>
			    
			    <Card title="附件信息" style={{}} extra={<span></span>}>
			      	<Row type="flex" justify="start">
			      		<Col className="gutter-row" span={12}>
			      			<div className="clearfix">
						        <Upload
						          action="//jsonplaceholder.typicode.com/posts/"
						          listType="picture-card"
						          fileList={this.state.fileList}
						          onPreview={this.handlePreview}
						          onChange={this.handleChange}
						        >
					          	{this.state.fileList.length >= 3 ? null : uploadButton}
						        </Upload>
						        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
						          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
						        </Modal>
					      	</div>
			      		</Col>
			      	</Row>
			    </Card>
		    </div>
		);
	}
}
export default FormScheme