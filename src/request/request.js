import axios from "axios";
import store from "@/store";
// console.log(process.env, "process.env");
const request = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000,
    header: {},
});

request.interceptors.request.use((config) => {
    /*
1,一般每次请求的时候都要进度条的时候，那么久写在请求拦截器里面
2，如果是每次切换路由的话，那么久写在路由守卫里面
*/
    config.headers.userTempId = store.state.User.userTempId;
    config.headers.token = store.state.User.token;
    return config;
});
request.interceptors.response.use(
    (res) => {
        // console.log(res, "res");
        // 这个要和后端沟通，判断如果成功请求，但是不是我们要的数据的时候，给我返回一个提示。一般是200或者20000
        if (res.data.code !== 200 && res.data.code !== 20000) {
            // alert(res.data.message);
            console.log(res.data.message);

            return Promise.reject({ message: res.data.message });
        } else {
            return res.data.data;
        }
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default request;