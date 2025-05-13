import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  // baseURL: `http://localhost:3333/`,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'x-Requested-With': 'XMLHttpRequest',
  },
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    // if (!res.data) 
    return res?.data;
    // }
    // throw new Error(message || 'Not found.'));
  },
  (error: AxiosError<any>) => {
    const { response, message } = error || {};

    const errMsg = response?.data?.message || message ;


    const status = response?.status;
    // if (status === 401) {
    //   cookies().delete('token')
    //   cookies().delete('user')
    //   // userStore.getState().actions.clearUserInfoAndToken();
    // }
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }
  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<any>>(config)
        .then((res: AxiosResponse<any>) => {
          resolve(res as unknown as Promise<T>);
          return res;
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
          return e;
        });
    });
  }
}
export default new APIClient();
