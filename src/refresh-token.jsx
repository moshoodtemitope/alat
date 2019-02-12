import {routes} from "./shared/urls";
import {ApiService} from "./shared/apiService";
import {history} from "./_helpers";
import {alertActions} from "./_actions";
import * as React from "react";
import {SystemConstant} from "./shared/constants";

const TOKEN_REFRESH_INTERVAL = 5000; // five minutes
const TOKEN_REFRESH_URL = routes.REISSUE_TOKEN;
let timeout = null;

const refreshableFetch = () => {
    // clearTimeout(timeout);
    //
    timeout = setTimeout(() => refreshableFetch(TOKEN_REFRESH_URL), TOKEN_REFRESH_INTERVAL);
    console.log(this.props);
    let consume = ApiService.request(routes.REISSUE_TOKEN, "GET", null);
    return consume
        .then(function (response){
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

    // return fetch(url, init);
};

class TokenReissuer {
//     private timer;
//     constructor(private store: DataService) {
//     this.timer = this.getInitialTimer();
// }

    initTokenizer() {
        setInterval(() => {
            if (this.tokenIsAvailable()) {
                this.timer++;
                this.updateTimer(this.timer);
                this.checkAndRevalidateToken();
            }
        }, 2000);
    }

    updateTimer(timer) {
        sessionStorage.setItem('_ss1234bb_ll_qq', timer);
        sessionStorage.setItem('_kkll12asa_aa_', String(Date.now()));
    }

    getInitialTimer() {
        let initialTime = sessionStorage.getItem('_kkll12asa_aa_');
        if (initialTime) {
            return this.calcInitialTimer(initialTime);
        } else {
            return 0;
        }
    }

    calcInitialTimer(initialTime) {
        let time = Date.now() - initialTime;
        return Number(sessionStorage.getItem('_ss1234bb_ll_qq')) + Math.floor( time / 1000);
    }

    tokenIsAvailable() {
        return !!this.store.getData('token');
    }

    checkAndRevalidateToken() {
        if (this.timeHasElapsed()) {
            this.resetTimer();
            this.revalidateToken((err, token) => {
                if (token) {
                    this.store.keepData('token', token);
                }
            });
        }
    }

    timeHasElapsed() {
        return 240 < this.timer;
    }

    resetTimer() {
        this.timer = 0;
        sessionStorage.setItem('_ss1234bb_ll_qq', this.timer);
    }

    revalidateToken(cb) {
        this.fetchNewToken((err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(null, data);
            }
        });
    }

    fetchNewToken(cb) {
        SystemConstant.HEADER['alat-token'] = this.getToken();
        $(document).ready(() => {
            $.ajax({
                url: routes.REISSUE_TOKEN,
                type: 'GET',
                headers: SystemConstant.HEADER
            }).done((data) => {
                cb(null, data.token);
            }).fail((xhr, status, error) => {
                cb(error);
            });
        });
    }

    getToken() {
        return this.store.getData('token');
    }
}

export default TokenReissuer;