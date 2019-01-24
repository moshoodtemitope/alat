import * as React from "react";
import {Redirect} from "react-router";
import {Observable} from "rxjs";
import {history} from "../_helpers";

const axios = require('axios');

export class ApiService {

    state = {
        redirect: false
    };

    static request(url, type, data, headers, noStringify=false){
        let bodyData;
        let service;
        // let header: any;
        let options;
        let httpService;
        bodyData = noStringify ? JSON.stringify(data) : data;

        // header = new Headers(headers || {
        //     'Content-Type': 'application/json',
        //     'alat-client-apiKey': 'ERTojertoijertoijert',
        //     'Accept': 'application/json',
        // });
        //
        // options = new RequestOptions({ headers: header });
        if (type.toLowerCase() === 'get') {
            service = httpService.get(url, options);
        } else {
            axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            if(headers){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            service = axios.post(url, bodyData);
            return service.then(function (response) {
                console.log(service);
                return service;
            }).catch(function (error) {

                console.log(error.response);
                console.log(service);
                // return service;
                if (error.response.status === 401 && error.response.statusText.toLowerCase().includes('token not valid')) {
                    localStorage.removeItem("user");
                    history.push('/');
                } else {
                    return service;
                    // let requestError = error.response.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
                    // console.log(requestError);
                    // try {
                    //     requestError = JSON.parse(requestError);
                    // } catch (e) {
                    //     requestError = 'Sorry, an error occured';
                    // }
                    // console.log(requestError);
                    // return Observable.throw(requestError || 'Server error');
                }
            });
        }
    }


    static requests(url, type, data, headers, noStringify=false) {
        let bodyData;
        let service;
        // let query: any;

        bodyData = noStringify ? JSON.stringify(data) : data;
        // if (headers) {
        //     console.log("headers in");
        //     axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
        //     axios.defaults.headers.common['Content-Type'] = 'application/json';
        //     console.log(headers);
        //     for (let [key, value] of Object.entries(headers)) {
        //         axios.defaults.headers.common[key] = value;
        //     }
        // }
        // else {
        //     console.log("no headers in");
        //     axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
        //     axios.defaults.headers.common['Content-Type'] = 'application/json';
        // }

        if (type.toLowerCase() === "get") {
            console.log("get method");
            axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            console.log(headers);
            if(headers){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            axios.get(url, bodyData).then(function (response) {
                console.log('dcfv');
                console.log(response);
                return service.map((res) => {
                    return res._body !== '' ? res.json() : null;
                    // return response;
                });
                // return response;
            }).catch(function (error) {
                if (error.status === 401 && error.statusText.toLowerCase().includes('token not valid')) {
                    sessionStorage.clear();
                    return <Redirect to='/login'/>
                    // this.router.navigate(['/login']); redirect to login
                } else {
                    let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
                    try {
                        requestError = JSON.parse(requestError);
                    } catch (e) {
                        requestError = 'Sorry, an error occured';
                    }
                    return Observable.throw(requestError || 'Server error');
                    // return error._body;
                    // let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
                    // try {
                    //     requestError = JSON.parse(requestError);
                    // } catch (e) {
                    //     requestError = 'Sorry, an error occured';
                    // }
                    // throw(requestError || 'Server error');
                }
            });
        }
        else {
            console.log("post method");
            axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            console.log(headers);
            if(headers){
                for (let [key, value] of Object.entries(headers)) {
                    axios.defaults.headers.common[key] = value;
                }
            }
            return axios.post(url, bodyData).then(function (response) {
                console.log('dcfv');
                console.log(response);
                console.log(service);
                return service.map((res) => {
                    console.log(response);
                    return response;
                    // return res._body !== '' ? res.json() : null;
                    // return response;
                }).catch(function (error) {
                    console.log(error);
                    if (error.status === 401 && error.statusText.toLowerCase().includes('token not valid')) {
                        sessionStorage.clear();
                        return <Redirect to='/login'/>
                        // this.router.navigate(['/login']); redirect to login
                    } else {
                        let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
                        console.log(requestError);
                        try {
                            requestError = JSON.parse(requestError);
                        } catch (e) {
                            requestError = 'Sorry, an error occured';
                        }
                        return Observable.throw(requestError || 'Server error');
                        // let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
                        // try {
                        //     requestError = JSON.parse(requestError);
                        // } catch (e) {
                        //     requestError = 'Sorry, an error occured';
                        // }
                        // throw(requestError || 'Server error');
                    }
                });
            });
        }
    }
}
