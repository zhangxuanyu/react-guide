import * as React from 'react';
import { Button } from 'antd';
import Index      	from './assets/compontent/my/Index';
import Record 		from './assets/compontent/my/subMy/Record';
import Task 		from './assets/compontent/my/subMy/Task';
import Learn 		from './assets/compontent/my/subMy/Learn';
import Blog 		from './assets/compontent/my/subMy/Blog';
import Note 		from './assets/compontent/my/subMy/Note';
import ListOrder 	from './assets/compontent/order/ListOrder.js';
import FormOrder 	from './assets/compontent/order/FormOrder.js';
import ListScheme 	from './assets/compontent/scheme/ListScheme';
import FormScheme 	from './assets/compontent/scheme/FormScheme';
import ListCapital 	from './assets/compontent/capital/ListCapital.js';
import FormCapital 	from './assets/compontent/capital/FormCapital.js';
import ListDealer 	from './assets/compontent/dealer/ListDealer.js';
import FormDealer 	from './assets/compontent/dealer/FormDealer.js';
import DownLoad 	from './assets/compontent/download/Download.js';
import SysLog 		from './assets/compontent/system/SysLog.js';

const router = { //依据当前hash值，找到对应的组件(页面)
	'#/my/index': {
		breadCrumb: ['主页', '主页'],
		compontent:function(){
			return <Index/>
		} 
	},
	'#/my/subMy/record': {
		breadCrumb: ['我的', '我的消费'],
		compontent:function(){
			return <Record/>
		} 
	},
	'#/my/subMy/task': {
		breadCrumb: ['我的', '我的计划'],
		compontent:function(){
			return <Task/>
		} 
	},
	'#/my/subMy/learn': {
		breadCrumb: ['我的', '技术汇总'],
		compontent:function(){
			return <Learn/>
		} 
	},
	'#/my/subMy/blog': {
		breadCrumb: ['我的', '牛人博客'],
		compontent:function(){
			return <Blog/>
		} 
	},
	'#/my/subMy/note': {
		breadCrumb: ['我的', '我的笔记'],
		compontent:function(){
			return <Note/>
		} 
	},
	'#/order/list': {
		breadCrumb: ['订单管理', '列表'],
		compontent:function(){
			return <ListOrder/>
		} 
	},
	'#/order/form': {
		breadCrumb: ['订单管理', '新增进件'],
		compontent:function(){
			return <FormOrder/>
		} 
	},
	'#/scheme/list': {
		breadCrumb: ['金融方案', '列表'],
		btnList:[
			<Button type="primary" onClick={new ListScheme().toForm}>新增</Button>	
		],
		compontent:function(){
			return <ListScheme/>
		} 
	},
	'#/scheme/form': {
		breadCrumb: ['金融方案', '新增金融方案'],
		btnList:[
			<Button  type="dashed"  style={{marginRight:10}} onClick={new FormScheme().toList}>返回列表</Button>
			,
			<Button  type="primary" style={{marginRight:10}} onClick={new FormScheme().submitForm} >保存</Button>
			,
			<Button type="primary" >提交</Button>
		],
		compontent:function(){
			return <FormScheme/>
		} 
	},
	//动态路由配置
	'#/scheme/form?id': {
		breadCrumb: ['金融方案', '修改金融方案'],
		btnList:[
			<Button  type="dashed"  style={{marginRight:10}} onClick={new FormScheme().toList}>返回列表</Button>
			,
			<Button  type="primary" style={{marginRight:10}} onClick={new FormScheme().submitForm} >保存</Button>
			,
			<Button type="primary" >提交</Button>
		],
		compontent:function(){
			return <FormScheme/>
		} 
	},
	'#/capital/list': {
		breadCrumb: ['资金方管理', '列表'],
		compontent:function(){
			return <ListCapital/>
		} 
	},
	'#/capital/form': {
		breadCrumb: ['资金方管理', '新增资金方报备'],
		compontent:function(){
			return <FormCapital/>
		} 
	},
	'#/capital/form?id': {
		breadCrumb: ['资金方管理', '修改资金方报备'],
		compontent:function(){
			return <FormCapital/>
		} 
	},
	'#/dealer/list': {
		breadCrumb: ['车商管理', '列表'],
		compontent:function(){
			return <ListDealer/>
		} 
	},
	'#/dealer/form': {
		breadCrumb: ['车商管理', '新增车商报备'],
		compontent:function(){
			return <FormDealer/>
		} 
	},
	'#/dealer/form?id': {
		breadCrumb: ['车商管理', '修改车商报备'],
		compontent:function(){
			return <FormDealer/>
		} 
	},
	'#/download/download':{
		breadCrumb: ['下载管理', '下载管理'],
		compontent:function(){
			return <DownLoad/>
		}
	},
	'#/system/sysLog':{
		breadCrumb: ['系统管理', '开发日志'],
		compontent:function(){
			return <SysLog/>
		}
	}
}
export default router;