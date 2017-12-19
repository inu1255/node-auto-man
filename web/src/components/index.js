import Vue from 'vue';
import Markdown from './Markdown';
import LoginLink from './LoginLink';
import { random } from '@/utils/utils';
import HttpCard from './HttpCard';

export default {
	install(vue, options) {
		Vue.filter("fromNow", function(value) {
			if (typeof value === "number" && value < 1000000000000) {
				value *= 1000;
			}
			return moment(value).fromNow();
		});
		Vue.filter("date", function(value) {
			if (typeof value === "number" && value < 1000000000000) {
				value *= 1000;
			}
			return moment(value).format('YYYY-MM-DD');
		});
		Vue.filter("time", function(value) {
			if (typeof value === "number" && value < 1000000000000) {
				value *= 1000;
			}
			return moment(value).format('HH:mm:ss');
		});
		const bs = ["b", "Kb", "Mb", "Gb"];
		Vue.filter("traffic", function(v, i, n) {
			v = parseInt(v);
			n = n || 0;
			for (i = i || 0; i < 4; i++) {
				if (v < 1024) {
					return v + bs[i];
				}
				v = (v / 1024).toFixed(n);
			}
			return v + "GB";
		});

		Vue.directive("random", {
			bind(el, {arg, value} ,vnode) {
				if (vnode.data.model) {
					if(el.__vue__.__random) el.__vue__.$off("on-click",el.__vue__.__random);
					el.__vue__.__random = new Function('n','r','v',`n.context.${vnode.data.model.expression}=r("${arg}",v)`).bind(this,vnode,random,value);
					el.__vue__.$on("on-click", el.__vue__.__random);
				}
			}
		});

		Vue.component("Markdown", Markdown);
		Vue.component("LoginLink", LoginLink);
		Vue.component("HttpCard", HttpCard);
	}
};