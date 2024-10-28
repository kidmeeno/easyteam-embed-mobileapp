import axios from 'axios';
import { BASE_URL } from '../../config/api';

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get(url, config = {}) {
    return this.client.get(url, config);
  }

  async post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }
}

const httpClient = new HttpClient(BASE_URL);

export default httpClient;
