import * as types from '../types';
import router from '../../router';
import request from '../../utils/request';

const state = {
	nodes_loading: false,
	nodes: [],
	users_loading: false,
	users: [],
	ssrs_loading: false,
	ssrs: []
};

const getters = {

};

const actions = {
	async getNodes({commit, state}) {
		commit(types.SET_NODES_LOADING, true);
		try {
			let data = await request("/ssr/nodelist");
			commit(types.SET_NODES, data);
		} catch (error) {
			console.log(error);
		}
		commit(types.SET_NODES_LOADING, false);
	},
	async getUsers({commit, state}) {
		commit(types.SET_USERS_LOADING, true);
		try {
			let data = await request("/ssr/userlist");
			commit(types.SET_USERS, data);
		} catch (error) {
			console.log(error);
		}
		commit(types.SET_USERS_LOADING, false);
	},
	async getSsrs({commit, state}) {
		commit(types.SET_SSRS_LOADING, true);
		try {
			let data = await request("/ssr/list");
			commit(types.SET_SSRS, data);
		} catch (error) {
			console.log(error);
		}
		commit(types.SET_SSRS_LOADING, false);
	},
	setSsrs({commit, state} , data) {
		commit(types.SET_SSRS, data);
	}
};

const mutations = {
	[types.SET_NODES](state, data) {
		state.nodes = data;
		mutations[types.SSR_COMPUTE](state);
	},
	[types.SET_USERS](state, data) {
		state.users = data;
		mutations[types.SSR_COMPUTE](state);
	},
	[types.SET_SSRS](state, data) {
		for (let row of data) {
			let path = router.currentRoute.fullPath;
			let s = row.node_id + ":" + row.port + ":" + row.passwd;
			row.link = location.href.replace(path, "/user/view?key=" + window.btoa(s));
		}
		state.ssrs = data;
		mutations[types.SSR_COMPUTE](state);
	},
	[types.SSR_COMPUTE](state) {
		let {nodes,users,ssrs} = state;
		if (nodes.length&&ssrs.length&&ssrs.nodes!=nodes) {
			let nodesMap = {};
			for(let row of nodes){
				nodesMap[row.id] = row;
				let ssrs = [];
				row.ssrs = ()=>ssrs;
			}
			for(let row of ssrs){
				row.node = _.find(nodes, x => x.id == row.node_id) || {};
				row.node.ssrs&&row.node.ssrs().push(row);
			}
			Object.defineProperty(ssrs, 'nodes', {
				configurable:true,
				value:nodes
			});
		}
		if (nodes.length&&ssrs.length&&ssrs.users!=users) {
			let usersMap = {};
			for(let row of users){
				usersMap[row.id] = row;
				let ssrs = [];
				row.ssrs = ()=>ssrs;
			}
			for(let row of ssrs){
				row.user = _.find(users, x => x.id == row.uid) || {};
				row.user.ssrs&&row.user.ssrs().push(row);
			}
			Object.defineProperty(ssrs, 'nodes', {
				configurable:true,
				value:users
			});
		}
	},
	[types.SET_NODES_LOADING](state, data) {
		state.nodes_loading = data;
	},
	[types.SET_USERS_LOADING](state, data) {
		state.users_loading = data;
	},
	[types.SET_SSRS_LOADING](state, data) {
		state.ssrs_loading = data;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};