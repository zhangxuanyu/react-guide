import * as React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'antd';
import G2 from '@antv/g2';
class AntVRecord extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	data:[
		  		{ key: '支付宝', value: 60 },
		  		{ key: '微信', value: 24 },
		  		{ key: '银行卡', value: 4 },
		  		{ key: '现金', value: 10 },
			],
	    }
  	};
	init = () =>{
		// Step 1: 创建 Chart 对象
		const chart = new G2.Chart({
		  container: 'c1', // 指定图表容器 ID
		  width : 400, // 指定图表宽度
		  height : 300 // 指定图表高度
		});
		// Step 2: 载入数据源
		chart.source(this.state.data);
		// Step 3：创建图形语法，绘制柱状图，由 key 和 value 两个属性决定图形位置，key 映射至 x 轴，value 映射至 y 轴
		chart.interval().position('key*value').color('key')
		// Step 4: 渲染图表
		chart.render();
		
		var chart2 = new G2.Chart({
	  		container: 'c2',
	 		width : 400, // 指定图表宽度
		  	height : 300 // 指定图表高度
		});
		chart2.source(this.state.data);
		chart2.scale('value', {
	  		min: 0
		});
		chart2.scale('key', {
	  		range: [0, 1]
		});
		chart2.tooltip({
	  		crosshairs: {
	    		type: 'line'
	  		}
		});
		chart2.line().position('key*value');
		chart2.point().position('key*value').size(4).shape('circle').style({
	  		stroke: '#fff',
	  		lineWidth: 1
		});
		chart2.render();
	}
	componentDidMount() {
		this.init();//初始化数据
	}
	render() {
		let table = [];
		this.state.data.map(m=>{
			table.push(
				m.key+'     ('+m.value+')'
			);
		});
		return(
			<div style={{display:'flex',justifyContent:'space-between'}}>
    	 		<div id="c2"></div>
    	 		<div id="c1"></div>
    	 		<div>
    	 			<List
    	 				header={<div>数据展示</div>}
	 			 		style={{width:200,color:'#9a9a9a',textAlign:'center',margin:'20px 40px'}}
	 			  		size="small"
			      		bordered
		      			dataSource={table}
			      		renderItem={item => (<List.Item>{item}</List.Item>)}
				    />
    	 		</div>
		    </div>
		);
	}
}
export default AntVRecord