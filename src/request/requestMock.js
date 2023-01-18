import axios from "axios";
// console.log(process.env, "process.env");
// 创建axios实例
const request = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {},
});

//设置axios实例的请求拦截器属性
request.interceptors.request.use((config) => {
    //
    return config;
});

//设置axios实例的响应拦截器实现
request.interceptors.response.use(
    (res) => {
        if (res.data.code !== 200 && res.data.code !== 20000) {
            alert(res.data.message);
            //因为error的值就是一个对象，其中里面有个属性message代表着一些问题信息。为了保持一致，我们就需要同样返回一个对象，其中对象里面需要有message属性
            return Promise.reject({ message: res.data.message });
        } else {
            return res.data.data;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;