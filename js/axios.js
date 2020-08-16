import axios from 'axios'

export function getOpenCode(params) {
    return axios({
        url: `/api/`,
        params
    })
}

export default axios
