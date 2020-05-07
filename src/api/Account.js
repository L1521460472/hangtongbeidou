import Http from './http'
import http from './http';

export default {
    login(dto) {
        return http
            .post('/rest/login', {
                username: dto.uid,
                password: dto.pwd
            }, {
                adapter: async (config) => {
                    return {
                        data: config
                    }
                }
            })
    }
}