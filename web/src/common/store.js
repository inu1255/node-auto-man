/**
 * Created Date: 2017-10-13 12:47:40
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
import { regist } from 'easy-react/store'
import request from './request'
import his from '../common/history'

function goback() {
    let location = his.location.state && his.location.state.from
    location = (location && location.pathname.indexOf("/login") < 0) ? location : "/"
    setTimeout(() => his.push(location || "/"))
}

regist("user", {
    logined: false,
    login: async function({ title, password }) {
        let self = await request("/user/login", { title, password })
        goback()
        return { logined: true, self }
    },
    register: async function(body) {
        let self = await request("/user/register", body)
        goback()
        return { logined: true, self }
    },
    logout: async function() {
        let self = await request("/user/logout")
        setTimeout(() => his.push("/user/login", { from: his.location }))
        return { logined: false, self }
    },
}, true)