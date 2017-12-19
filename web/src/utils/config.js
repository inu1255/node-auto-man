'use strict';
/**
 * Created Date: 2017-11-27 19:54:11
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
import moment from 'moment';
export const methods = ["none", "table", "rc4", "rc4-md5", "rc4-md5-6", "aes-128-cfb", "aes-192-cfb", "aes-256-cfb", "aes-128-cbc", "aes-128-ctr", "aes-192-ctr", "aes-256-ctr", "aes-128-cfb1", "bf-cfb", "camellia-128-cfb", "camellia-192-cfb", "camellia-256-cfb", "salsa20", "chacha20", "chacha20-ietf"];
export const protocol = ["origin", "auth_sha1_v4", "auth_aes128_md5", "auth_aes128_sha1", "auth_chain_a"];
export const obfs = ["plain", "http_simple", "http_simple_compatible", "http_post", "http_post_compatible", "tls1.2_ticket_auth", "tls1.2_ticket_auth_compatible"];
export const ssr_body = {
	id: null,
	uid: null,
	node_id: null,
	port: null,
	passwd: null,
	u: 0,
	d: 0,
	transfer_enable: 10,
	enable: 1,
	method: "chacha20",
	protocol: "auth_aes128_md5",
	protocol_param: 2,
	obfs: "http_simple",
	obfs_param: null,
	speed_limit_per_user: 2048,
	personal: null,
	expired_at: new Date(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		new Date().getDate()
	)
};
const bs = ["b","Kb", "Mb", "Gb"];
function formatKb(v,i) {
	for (i = i||0; i < 4; i++) {
		if (v < 1024) {
			return v + bs[i];
		}
		v = (v / 1024).toFixed(2);
	}
	return v + "GB";
}

export const ssr_columns = function({isAdmin, users, nodes, renderEdit}) {
	let columns = [
		{
			key: "mark",
			title: "备注",
			fixed: "left",
			width: 100,
			render: (h, {row}) => row.mark||"无",
			ellipsis: true
		},
		{
			key: "update_at",
			title: "在线",
			width: 100,
			render: (h, {row}) => moment(row.update_at).fromNow(),
			requireAdmin: true,
			sortable: true,
		},
		{
			key: "u",
			title: "上传",
			width: 100,
			render: (h, {row}) => formatKb(row.u),
			sortable: true,
		},
		{
			key: "d",
			title: "下载",
			width: 100,
			render: (h, {row}) => formatKb(row.d),
			sortable: true,
		},
		{
			key: "transfer_enable",
			title: "总流量",
			width: 100,
			render: (h, {row}) => formatKb(row.transfer_enable),
			sortable: true,
		},
		{
			key: "protocol_param",
			title: "设备",
			width: 80,
			requireAdmin: true,
			sortable: true,
		},
		{
			key: "uid",
			title: "用户",
			width: 100,
			requireAdmin: true,
			render: (h, {row}) => row.user&&(row.user.name||row.user.account||row.user.email)||row.uid,
			filters: users.map(x=>({label:x.name,value:x.id})),
			filterMultiple: false,
			filterMethod (value, row) {
				return row.uid==value;
			}
		},
		{
			key: "node_id",
			title: "节点",
			width: 120,
			render: (h, {row}) => row.node&&(row.node.name||row.node.ip)||row.node_id,
			filters: nodes.map(x=>({label:x.name||x.ip,value:x.id})),
			filterMultiple: false,
			filterMethod (value, row) {
				return row.node_id==value;
			}
		},
		{
			key: "speed_limit_per_user",
			title: "网速",
			width: 100,
			render: (h, {row}) => formatKb(row.speed_limit_per_user,1),
			requireAdmin: true,
			sortable: true,
		},
		{
			key: "port",
			title: "端口",
			width: 100,
			sortable: true,
		},
		{
			key: "passwd",
			title: "密码",
			width: 100
		},
		{
			key: "enable",
			title: "启用",
			width: 100,
			render: (h, {row}) => row.enable ? "启用" : "未启用"
		},
		// {
		// 	key: "method",
		// 	title: "加密方法",
		// 	width: 100
		// },
		// {
		// 	key: "protocol",
		// 	title: "协议",
		// 	width: 100
		// },
		// {
		// 	key: "obfs",
		// 	title: "混淆",
		// 	width: 100
		// },
		// {
		// 	key: "obfs_param",
		// 	title: "混淆参数",
		// 	width: 100
		// },
		{
			key: "personal",
			title: "类型",
			width: 100,
			render: (h, {row}) => row.personal ? "私人" : "通用",
			requireAdmin: true,
			filters: [
				{
					label: '私人',
					value: 1
				},
				{
					label: '通用',
					value: 2
				}
			],
			filterMultiple: false,
			filterMethod (value, row) {
				if (value === 1) {
					return row.personal;
				} else if (value === 2) {
					return !row.personal;
				}
			}
		},
		{
			key: "expired_at",
			title: "过期",
			fixed: "right",
			width: 100,
			render: (h, {row}) => row.expired_at && moment(row.expired_at).format("YYYY-MM-DD"),
			sortable: true,
		},
		{
			title: "操作",
			fixed: "right",
			width: isAdmin?150:120,
			render: renderEdit
		}
	];
	if (isAdmin) return columns;
	return columns.filter(x => !x.requireAdmin);
};

const ssr_num = function(row) {
	if (!row.ssrs) return "0/0";
	let ssrs = row.ssrs();
	let n = ssrs.filter(x=>(new Date().getTime() - new Date(x.update_at).getTime()) < 300000).length;
	return n+"/"+ssrs.length;
};

const ssr_num_v = function(ssrs) {
	if (!ssrs) return 0;
	ssrs = ssrs();
	let n = ssrs.filter(x=>(new Date().getTime() - new Date(x.update_at).getTime()) < 300000).length;
	return n*1000+ssrs.length;
};

const ssr_num_sort = function(a,b,type){
	if (type=="asc") {
		return ssr_num_v(a)-ssr_num_v(b);
	}else{
		return ssr_num_v(b)-ssr_num_v(a);
	}
};

export const user_columns = function({renderEdit}) {
	let columns = [
		{
			key: "name",
			title: "用户名",
			// fixed: "left",
			width: 160,
		},
		{
			key: "account",
			title: "账号",
			width: 160,
			ellipsis: true,
		},
		{
			key: "password",
			title: "密码",
			width: 100,
			ellipsis: true,
			render: (h, {row}) => row.account=="admin"?"******":row.password,
		},
		{
			key: "ssrs",
			title: "用户",
			width: 100,
			render: (h, {row})=>ssr_num(row),
			sortable:true,
			sortMethod: ssr_num_sort,
		},
		{
			key: "level",
			title: "级别",
			width: 100,
			sortable: true,
		},
		{
			title: "操作",
			fixed: "right",
			width: 120,
			render: renderEdit
		}
	];
	return columns;
};

export const user_body = {
	name:"",
	account:"",
	password:"123456",
	ssr_num:1,
	level:0,
};

export const node_columns = function({isAdmin,renderEdit}) {
	let columns = [
		{
			key: "name",
			title: "节点名",
			width: 120,
			// fixed: "left",
		},
		{
			key: "ip",
			title: "ip",
			width: 120,
		},
		{
			key: "traffic_rate",
			title: "费率",
			width: 80,
			sortable: true,
		},
		{
			key: "update_at",
			title: "在线",
			width: 100,
			render: (h, {row}) => row.update_at && moment(row.update_at).fromNow(),
			sortable: true,
		},
		{
			key: "level",
			title: "级别",
			width: 80,
			sortable: true,
		},
		{
			key: "ssrs",
			title: "用户",
			width: 100,
			render: (h, {row})=>ssr_num(row),
			sortable:true,
			sortMethod: ssr_num_sort,
		},
		{
			title: "操作",
			fixed: "right",
			width: 120,
			render: renderEdit,
			requireAdmin: true,
		}
	];
	if (isAdmin) return columns;
	return columns.filter(x => !x.requireAdmin);
};
