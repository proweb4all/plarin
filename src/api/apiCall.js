import qs from 'query-string'

export const DOMAIN = 'https://reqres.in/api/users'

class ApiCall {
  constructor(domain) {
    this.domain = domain
  }
  
  async perform(url, config, data) {
    try {
      const request = await fetch(`${this.domain}/${url}`, {
        ...config,
        headers: {
          'Content-type': 'application-json'
        },
        body: JSON.stringify(data),
      })
      return await request.json()
    } catch (e) {
      console.error('Error receiving data: ', e);
    }
  }

  async get(path, searchParams = {}) {
    return this.perform(`${path}?${qs.stringify(searchParams)}`)
  }

  async post(path, payload) {
    return await this.perform(path, { method: 'POST' }, payload)
  }

  async put(path, payload) {
    return await this.perform(path, { method: 'PUT' }, payload)
  }

  async delete(path) {
    return await this.perform(path, { method: 'DELETE' })
  }
}

export default new ApiCall(DOMAIN)