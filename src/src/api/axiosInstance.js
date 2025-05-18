import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',  // 👉 FastAPI 주소
  timeout: 5000
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
