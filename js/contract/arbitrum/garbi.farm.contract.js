$.GARBI_FARM = function() {};
$.GARBI_FARM.prototype = (function() {
    var setting = {
        chainId: 42161,
        pids: [] // length == 0 => get ALL,
    };
    var uPoolsJoined = {}; // mapping( user => array);
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
                    await self._initPoolOf(_pools[_idx], _idx);
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
            let _uFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            _pools.forEach(item => {
                let _uFarmByPoolContract = _uFarm[item.contract] ? _uFarm[item.contract] : null;
                _init(item.pid, _uFarmByPoolContract);
            });

            setTimeout(function() {
                self.initFarmListPageInterface(_pidOfFarm);
            }, 3000);
        },
        initFarmDetailPageInterface(_pid) {
            let _self = this;
            let _pool = this._getPool(_pid);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _uFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _uFarmByPoolContract = _uFarm[_pool.contract];
            if (_uFarmByPoolContract) {
                $(`.apy`).html(`${ coreHelper.numberWithCommas(_uFarmByPoolContract.apy, 2) }%`);
                $(`.tvl`).html(`$${ coreHelper.formatBalance(_uFarmByPoolContract.tvl, 2) }`);
                $(`.u-share`).html(`${ coreHelper.numberWithCommas(_uFarmByPoolContract.uWantShare, 8) }`);
                $(`.u-want-bal`).html(`${ coreHelper.numberWithCommas(_uFarmByPoolContract.uWantBal, 8) }`);
                $(`.u-pending-grb`).html(`${ coreHelper.numberWithCommas(_uFarmByPoolContract.uGrbPending, 8) }`);
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
            return uPoolsJoined[_user];
        },
        async _initPoolOf(_pool, pid) {
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
            // _data.miningSpeed = parseInt(_r[0]);
            // _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[1]) / 1e18, 1e18), 18);
            // _data.uBNBBal = coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 18);
            // _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            // _data.uWantShare = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[8]) / 1e18, 1e18), 18);
            // _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r[9]) / 1e18, 18);
            // _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 18);
            // _data.totalWantRewardPerDay = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            // _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            // _data.cakePrice = coreHelper.parseFloatNumber(parseInt(_r[10]) / 1e18, 18);
            // _data.userCakePending = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            // _data.turingRewardAPY = 0;
            // _data.wantRewardAPY = 0;
            // _data.price = _pool.price;
            // _data.tvl = _data.totalShare * _pool.price;
            // if (_data.tvl > 0) {
            //     _data.turingRewardAPY = _data.totalMintPerDay * _data.turingPrice * 36500 / (_data.tvl);
            //     _data.wantRewardAPY = _data.totalWantRewardPerDay * _data.cakePrice * 36500 / (_data.tvl);

            // }
            // _data.apy = _data.turingRewardAPY + _data.wantRewardAPY;
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;
        },
        async _initUserData(_user, _contract, _data, _pid) {
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            _farmInfoOf = _farmInfoOf ? _farmInfoOf : {};
            _farmInfoOf[_user] = _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            _farmInfoOf[_user][_contract] = _farmInfoOf[_user][_contract] ? _farmInfoOf[_user][_contract] : {};
            _farmInfoOf[_user][_contract] = _data;
            storeHelper.setVaule('farmInfoOf', _farmInfoOf);
            storeHelper.setVaule('tvlOf', _data[_contract]);
            let _uPoolsJoined = uPoolsJoined[_user] ? uPoolsJoined[_user] : [];
            if (_data.uWantShare > 0 && _uPoolsJoined.includes(_contract) == false) {
                _uPoolsJoined.push(_contract);
            }
            uPoolsJoined[_user] = _uPoolsJoined;
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