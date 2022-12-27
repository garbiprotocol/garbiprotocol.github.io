$.STORE = function() {
};
$.STORE.prototype = (function() {
	var setting = {
        };
        var data = {
                garbiVenusLps: [],
		liquidityOfGarbiVenusLps: {}, // mapping(tokenName => bal);
		garbiVenusSwapPriceOf: {}, // mapping(pairString => price);
		allowsTransferToTradeMachineOf: {}, // mapping(tokenAddr => amount)
                allowsTransferOf: {}, // mapping(user => mapping(tokenAddr => amount)) 
                // { userAddr: { wbnbAddr: 111 ....}} - { oxo: { 0x0: 1 ... }}
                // mapping (user => mapping(token => bal));
                balanceOf: {},
                priceOf: {},
                farmInfoOf: {}, // mapping (user => mapping(farm-contract => Object));
                tvlOf: {} // mapping (conntract => amount);
        };
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			setting = $.extend({}, setting, options);
		},
                getValue(_key) {
                        return data[_key];
                },
                setVaule(_key, _value) {
                        data[_key] = _value;
                        return true;
                }
	};
}(jQuery));
