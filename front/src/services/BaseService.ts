import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

export abstract class BaseService {
  protected axiosInstance : AxiosInstance;

  constructor(config: CreateAxiosDefaults|null = null) {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      ...config,
    });
  }
}

export default BaseService;
