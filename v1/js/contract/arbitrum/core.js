$.Core = function() {};

function dealNum(val) {
    var str = Math.floor(val)
    return (str < 10 ? '0' : '') + str
}
$.Core.prototype = (function() {
    var setting = {

    };
    const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.loadUserAccount();
            this.makeActionConnectWallet();
        },
        loadUserAccount() {
            let self = this;
            let _acc = this.getCurrentAddress();
            if (_acc && _acc != '') {
                $('.wrap-user-acct').html(`${_acc.slice(0,5)}...${_acc.slice(-5)}`);
                $('.wrap-user-acct').show();
                $('.wrap-btn-connect').hide();
            } else {
                $('.wrap-user-acct').hide();
                $('.wrap-btn-connect').show();
            }
            setTimeout(function() {
                self.loadUserAccount();
            }, 3000);
        },
        initBTNName(_btnClass, _btnName) {
            let self = this;
            let _acc = this.getCurrentAddress();
            if (_acc && _acc != '') {
                $(`.${_btnClass}`).html(_btnName);
            } else {
                $(`.${_btnClass}`).html('Connect a wallet');
            }
            setTimeout(function() {
                self.initBTNName(_btnClass, _btnName);
            }, 3000);
        },
        makeActionConnectWallet() {
            let self = this;
            $('.btn-connect-wallet').click(e => {
                e.preventDefault();
                self.connectToWallet();
            });
        },
        async connectToWallet() {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
                return true;
            }
            return false;
        },
        getAmountAllow() {
            return ALLOW_LIMIT_AMT;
        },
        numberWithCommas(x, decimals = 3) {
            if (isNaN(x) == true) x = 0;
            x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
            x = parseFloat(x).toFixed(decimals);
            x = parseFloat(x).toString();
            x = x.split(".");
            x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            x = x.join('.');
            return x;
        },
        displayBalance(x, decimals = 3) {
            if (isNaN(x) == true) x = 0;
            x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
            x = parseFloat(x).toFixed(decimals);
            // x = parseFloat(x).toString();
            x = x.split(".");
            x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            x = x.join('.');
            return x;
        },
        formatBalance(labelValue, decimals = 2) {
            return Math.abs(Number(labelValue)) >= 1.0e+12 ?
                Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T" :
                Math.abs(Number(labelValue)) >= 1.0e+9 ?
                Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B" :
                Math.abs(Number(labelValue)) >= 1.0e+6 ?
                Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M" :
                Math.abs(Number(labelValue)) >= 1.0e+3 ?
                Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K" :
                this.numberWithCommas(labelValue, decimals);
        },
        getCurrentAddress() {
            if (!window) return null;
            if (!window.ethereum) return null;
            if (window.ethereum.selectedAddress == '') return null;
            return window.ethereum.selectedAddress;
        },
        getUserAccount() {
            let _default = '0x0000000000000000000000000000000000000000';
            let _acct = this.getCurrentAddress();
            if (!_acct || _acct == '') {
                _acct = _default;
            }
            return _acct;
        },
        toBN(amount, tokenDecimal = 18) {
            amount = amount * 10 ** tokenDecimal;
            amount = Math.round(amount);
            amount = bigInt(amount).toString();
            return amount;
        },
        roundDownFloat(value, decimals) {
            return Math.floor(value * decimals) / decimals;
        },
        parseFloatNumber(value, decimals) {
            return parseFloat(value.toFixed(decimals));
        },
        formatDate(_timestamp, _format = 'DD-MMM-YYYY hh:mm:ss') {
            var date = moment.utc(_timestamp).format('YYYY-MM-DD HH:mm:ss');
            var stillUtc = moment.utc(date).toDate();
            return moment(stillUtc).local().format(_format);
        },
        sortArray(array, key, isAsc = true, isValueString = false) {
            array.sort(function(a, b) {
                if (isValueString == true) {
                    var valueA = a[key].toUpperCase();
                    var valueB = b[key].toUpperCase();
                    if (isAsc == true) {
                        if (valueA < valueB) {
                            return -1;
                        }
                    } else {
                        if (valueB < valueA) {
                            return -1;
                        }
                    }

                } else {
                    if (isAsc == true) {
                        return a[key] - b[key] //sort by date ascending
                    } else {
                        return b[key] - a[key] //sort by date ascending
                    }
                }
            });
            return array;
        },
        getTimeCountDown(time) {
            if (time < 0) {
                return {
                    "day": dealNum(0),
                    "hour": dealNum(0),
                    "min": dealNum(0),
                    "sec": dealNum(0)
                }
            }
            return {
                "day": dealNum((time / (24 * 60 * 60))),
                "hour": dealNum((time % (24 * 60 * 60)) / (60 * 60)),
                "min": dealNum((time % (60 * 60)) / 60),
                "sec": dealNum(time % 60)
            };
        },
        showPopup(id) {
            $(`#${id}`).show();
        },
        hidePopup(id, time = 10000) {
            setTimeout(() => {
                $(`#${id}`).hide();
            }, time);
        }
    };
}(jQuery));