import axios from 'axios'

axios.defaults.timeout = 15000;           //超时时间
axios.defaults.retry = 3;                 //请求次数
axios.defaults.retryDelay = 200;         //请求间隙
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        // 请求超时， 重新请求
        const config = err.config;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(err);

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            // Reject with the error
            return Promise.reject(err);
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        const backoff = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, config.retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function () {
            return axios(config);
        });

    });

export function getOpenCode(params) {
    return axios({
        url: `/api/`,
        params
    })
}

export default axios
