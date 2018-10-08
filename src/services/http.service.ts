import axios, { AxiosPromise } from 'axios';

export class Http {
  static post<T>(url: string, parameters: T): AxiosPromise<any> {
    return axios.post(url, parameters, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
