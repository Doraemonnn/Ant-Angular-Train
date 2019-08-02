import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpInterceptorService {

  // 请求头
  headers: any;
  options: any;

  constructor(private http: Http) {
    // 设置请求头
    this.headers = new Headers({
      'SystemCode': 'Train'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  // 发送请求
  public request(params: any): any {
    // POST请求（参数、返回值类型都是任意类型）
    if (params['method'] == 'post' || params['method'] == 'POST') {
      return this.post(params['url'], params['data']);
    } else { // 其他请求
      return this.get(params['url'], params['data']);
    }
  }

  // post 请求
  public post(url: string, params: any) {
    return this.http.post(url, params, this.options)
      .toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));
  }

  // get 请求
  public get(url: string, params: any): any {
    return this.http.get(url, { search: params })
      .toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));
  }

  // 请求成功
  private handleSuccess(res: Response) {
    return res.json();
  }

  // 请求失败
  private handleError(error) {
    let msg = '请求失败';
    if (error.status == 400) {
      console.log('请求参数不正确');
    }
    if (error.status == 404) {
      console.error('请检查路径是否正确');
    }
    if (error.status == 500) {
      console.error('请求的服务器错误');
    }
    return { success: false, msg: msg };
  }

}