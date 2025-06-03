import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sabu.o-r.kr',  // AWS 주소
  // baseURL: 'http://localhost:8000',  // AWS 주소
  timeout: 20000
});

export async function callAPI(endpoint, method = 'GET', data = null, config = {}) {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      data,
      ...config
    });
    return response.data;
  } catch (error) {
    console.error(`[API ERROR] ${method} ${endpoint}`, error);
    throw error;
  }
}
