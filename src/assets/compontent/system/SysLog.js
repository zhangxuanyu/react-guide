import React from 'react'
import {Timeline,Card} from 'antd'
class SysLog extends React.Component {
	state = {

	};
	render() {
		return(
			<div style={{marginBottom:'20px'}}>
				<Card title="开发日志" style={{ width: '100%' }}>
					<Timeline>
					    <Timeline.Item>
					    	<p>Solve initial network problems 1</p>
					      	<p>Solve initial network problems 2</p>
					      	<p>Solve initial network problems 3 2015-09-01</p>
					    </Timeline.Item>
					    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
					    <Timeline.Item>
				    	 	<p>Technical testing 1</p>
					      	<p>Technical testing 2</p>
					      	<p>Technical testing 3 2015-09-01</p>
					    </Timeline.Item>
					    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
				  	</Timeline>
				</Card>
		    </div>
		);
	}
}
export default SysLog