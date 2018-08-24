import * as React from 'react';
import {Col,Input} from 'antd';
import ReactDOM from 'react-dom';
class MyInput extends React.Component {
	/**
	 * 自己实现数据双向绑定
	 */
	constructor(props) {
		super(props);
	    this.state = {
	    	border:'',
	    	value:this.props.value,
	    	errorText:this.props.errorText,
	    	validate:this.props.validate,
	    }
  	};
	onBlur = () =>{
		if(this.props.required){//校验
			if(this.state.value != ''){
				if(this.state.validate=='notNull'){//只是非空检验
					this.setState({border:'1px solid #d9d9d9'});
					this.refs.errorText.innerHTML = '';
					return ;
				}else if(this.state.validate=='phone'){//验证手机号码
					this.setState({border:'1px solid red'});
					this.refs.errorText.innerHTML = this.state.errorText;
					return ;
				}else if(this.state.validate=='email'){//验证邮箱
					this.setState({border:'1px solid red'});
					this.refs.errorText.innerHTML = this.state.errorText;
					return ;
				}else if(this.state.validate=='idCard'){//验证身份证
					this.setState({border:'1px solid red'});
					this.refs.errorText.innerHTML = this.state.errorText;
					return ;
				}
				return;
			}
			this.setState({border:'1px solid red'});
			this.refs.errorText.innerHTML = this.state.errorText;
		}
	};
	handelChange = (event) =>{
		this.setState({
			value:event.target.value
		})
	};
	render() {
		let span = "";
		if(this.props.required){
			span = <span className="placeholder must">{this.props.title}</span>
		}else{
			span = <span className="placeholder">{this.props.title}</span>
		}
		return(
			<Col className="gutter-row" span={this.props.size} >
				<div style={{width:'90%'}}>
					{span}
					<span ref='errorText' style={{fontSize:12,color:'red',textAlign:'right',display:'inline-block',float:'right'}}></span>
				</div>
				<Input value={this.state.value} onChange={this.handelChange} onBlur={this.onBlur} style={{width:'90%',border:this.state.border}} />
			</Col>
		);
	}
}
export default MyInput