$.GARBI_FARM = function() {};
$.GARBI_FARM.prototype = (function() {
    var setting = {
        chainId: 42161,
        pids: [] // length == 0 => get ALL,
    };
    var userPoolsJoined = {}; // mapping( user => array);
    const GRB_TOKEN_DECIMAL = 18;
    const GRB_TOKEN_NAME = 'GRB';
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.initData();
        },
        async initData() {
            let self = this;
            try {
                let _pools = self._getPools();
                // let _user = coreHelper.getUserAccount();
                for (let _idx = 0; _idx < _pools.length; _idx++) {
                    await self._initPoolData(_pools[_idx], _idx);
                }
                self.reloadData();
            } catch (e) {
                console.log("INIT::GARBI_FARM_INFO::FALSE", e);
                self.reloadData();
            }
        },
        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 15000);
        },
        initFarmListPageInterface(_pidOfFarm) {
            let self = this;
            let _pools = self._getPools();
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _userFarmInfoObj = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            _pools.forEach(item => {
                let _userFarmInfoByPoolContract = _userFarmInfoObj[item.contract] ? _userFarmInfoObj[item.contract] : null;
                _initInterface(item.pid, _userFarmInfoByPoolContract);
            });

            function _initInterface(_pid, _data) {
                if (!_data) return false;
                $(`#apr-${_pid}`).html(`${ coreHelper.numberWithCommas(_data["apy"], 2) }%`);
                $(`#tvl-${_pid}`).html(`$${ coreHelper.formatBalance(_data["tvl"], 2) }`);
            }

            setTimeout(function() {
                self.initFarmListPageInterface(_pidOfFarm);
            }, 3000);
        },
        initFarmDetailPageInterface(_pid) {
            let _self = this;
            let _pool = this._getPool(_pid);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _userFarmInfoObj = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _userFarmInfoByPoolContract = _userFarmInfoObj[_pool.contract];
            if (_userFarmInfoByPoolContract) {
                $(`.apy`).html(`${ coreHelper.numberWithCommas(_userFarmInfoByPoolContract["apy"], 2) }%`);
                $(`.tvl`).html(`$${ coreHelper.formatBalance(_userFarmInfoByPoolContract["tvl"], 2) }`);
                $(`.u-share`).html(`${ coreHelper.numberWithCommas(_userFarmInfoByPoolContract["userWantShare"], 8) }`);
                $(`.u-want-bal`).html(`${ coreHelper.numberWithCommas(_userFarmInfoByPoolContract["userWantBal"], 8) }`);
                $(`.u-pending-grb`).html(`${ coreHelper.numberWithCommas(_userFarmInfoByPoolContract["userGRBPending"], 8) }`);
            }
            setTimeout(function() {
                _self.initFarmDetailPageInterface(_pid);
            }, 3000);
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

        formatTime(timestamp) {
            var date = moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss');
            var stillUtc = moment.utc(date).toDate();
            return moment(stillUtc).local().format('MMM Do');
        },
        getPoolsJoined() {
            let _user = coreHelper.getUserAccount();
            return userPoolsJoined[_user];
        },
        /**
         *  ========================================================================================
         *                                  PRIVATE FUNCTION
         *  ========================================================================================
         */
        async _initPoolData(_pool, pid) {
            if (!_pool) {
                return true;
            }
            if (_pool.type == 'garbi_pool') {
                return this._initGarbiPool(_pool);
            }
            return true;
        },
        async _initGarbiPool(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getCakeLPPoolABI();
            let _readContract = bscContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = {};
            _data["miningSpeed"] = parseInt(_r["miningSpeed_"]);
            _data["userGRBBal"] = coreHelper.parseFloatNumber(parseInt(_r["userGRBBal_"]) / (10 ** GRB_TOKEN_DECIMAL), GRB_TOKEN_DECIMAL);
            _data["userGRBPending"] = coreHelper.parseFloatNumber(parseInt(_r["userGRBPending_"]) / (10 ** GRB_TOKEN_DECIMAL), GRB_TOKEN_DECIMAL);
            _data["totalMintPerDay"] = coreHelper.parseFloatNumber(parseInt(_r["totalMintPerDay_"]) / (10 ** GRB_TOKEN_DECIMAL), GRB_TOKEN_DECIMAL);
            _data["totalWantShare"] = coreHelper.parseFloatNumber(parseInt(_r["tvl_"]) / (10 ** _pool["wantDecimal"]), _pool["wantDecimal"]);
            _data["userWantBal"] = coreHelper.parseFloatNumber(parseInt(_r["userWantBal_"]) / (10 ** _pool["wantDecimal"]), _pool["wantDecimal"]);
            _data["userWantShare"] = coreHelper.parseFloatNumber(parseInt(_r["userGRBShare_"]) / (10 ** _pool["wantDecimal"]), _pool["wantDecimal"]);
            _data["userETHBal"] = coreHelper.parseFloatNumber(parseInt(_r["userETHBal_"]) / (10 ** 18), 18);
            // Calculate TVL and APY
            _data["price"] = _pool["price"];
            _data["tvl"] = _data["totalWantShare"] * _data["price"];
            if (_data["tvl"] > 0) {
                let _grbPrice = configHelper.getPriceByTokenName(setting.chainId, GRB_TOKEN_NAME);
                _data["grbRewardAPY"] = _data["totalMintPerDay"] * _grbPrice * 36500 / (_data["tvl"]);
            }
            _data["apy"] = _data["grbRewardAPY"];
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;
        },
        async _initUserData(_user, _contract, _data, _pid) {
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            _farmInfoOf = _farmInfoOf ? _farmInfoOf : {};
            _farmInfoOf[_user] = _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            // set farm data by pool (using the contract of pool is key)
            _farmInfoOf[_user][_contract] = _farmInfoOf[_user][_contract] ? _farmInfoOf[_user][_contract] : {};
            _farmInfoOf[_user][_contract] = _data;
            storeHelper.setVaule('farmInfoOf', _farmInfoOf);
            storeHelper.setVaule('tvlOf', _data[_contract]);
            // Check and Push the pool of user joined
            let _uPoolsJoined = userPoolsJoined[_user] ? userPoolsJoined[_user] : [];
            if (_data["userWantShare"] > 0 && _uPoolsJoined.includes(_contract) == false) {
                _uPoolsJoined.push(_contract);
            }
            userPoolsJoined[_user] = _uPoolsJoined;
        },
        _getPool(_pid) {
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _farmsObj = _contractsObj.farms ? _contractsObj.farms : {};
            return _farmsObj[_pid];
        },
        _getPools(_pids = null) {
            let _data = [];
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _farmsObj = _contractsObj.farms ? _contractsObj.farms : {};
            if (setting.pids.length <= 0) {
                for (let _pid in _farmsObj) {
                    if (_farmsObj[_pid].isActive == true) {
                        _data.push(_farmsObj[_pid]);
                    }
                }
            } else {
                setting.pids.forEach(item => {
                    let _pool = _farmsObj[item];
                    if (_pool) {
                        if (_pids == null) {
                            _data.push(_pool);
                        } else if (_pids.includes(item) == true) {
                            _data.push(_pool);
                        }
                    }
                });
            }
            return _data;
        }
    };
}(jQuery));