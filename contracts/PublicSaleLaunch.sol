// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;


/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath { 
    /** 
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
     function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}
interface IERC20 {
        /**
         * @dev Returns the amount of tokens in existence.
        */
        function totalSupply() external view returns (uint256);

        /**
        * @dev Returns the token decimals.
        */
        function decimals() external view returns (uint8);

        /**
        * @dev Returns the token symbol.
        */
        function symbol() external view returns (string memory);

        /**
        * @dev Returns the token name.
        */
        function name() external view returns (string memory);

        /**
        * @dev Returns the bep token owner.
        */
        function getOwner() external view returns (address);

        /**
        * @dev Returns the amount of tokens owned by `account`.
        */
        function balanceOf(address account) external view returns (uint256);

        /**
        * @dev Moves `amount` tokens from the caller's account to `recipient`.
        *
        * Returns a boolean value indicating whether the operation succeeded.
        *
        * Emits a {Transfer} event.
        */
        function transfer(address recipient, uint256 amount) external returns (bool);

        /**
        * @dev Returns the remaining number of tokens that `spender` will be
        * allowed to spend on behalf of `owner` through {transferFrom}. This is
        * zero by default.
        *
        * This value changes when {approve} or {transferFrom} are called.
        */
        function allowance(address _owner, address spender) external view returns (uint256);

        /**
        * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
        *
        * Returns a boolean value indicating whether the operation succeeded.
        *
        * IMPORTANT: Beware that changing an allowance with this method brings the risk
        * that someone may use both the old and the new allowance by unfortunate
        * transaction ordering. One possible solution to mitigate this race
        * condition is to first reduce the spender's allowance to 0 and set the
        * desired value afterwards:
        * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        *
        * Emits an {Approval} event.
        */
        function approve(address spender, uint256 amount) external returns (bool);

        /**
        * @dev Moves `amount` tokens from `sender` to `recipient` using the
        * allowance mechanism. `amount` is then deducted from the caller's
        * allowance.
        *
        * Returns a boolean value indicating whether the operation succeeded.
        *
        * Emits a {Transfer} event.
        */
        function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

        /**
        * @dev Emitted when `value` tokens are moved from one account (`from`) to
        * another (`to`).
        *
        * Note that `value` may be zero.
        */
        event Transfer(address indexed from, address indexed to, uint256 value);

        /**
        * @dev Emitted when the allowance of a `spender` for an `owner` is set by
        * a call to {approve}. `value` is the new allowance.
        */
        event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract PublicSaleLaunch {
    uint8 public VERSION = 100;
    using SafeMath for uint256;
    
    address public owner;

    IERC20 public GRB; 
    IERC20 public USDC; 

    uint256 public salePrice = 4 * 1e4; // 1 grb = 0.04 USDC
    // uint256 public totalSale = 250000 * 1e18; // 250k grb
    uint256 public totalPurchased = 0;
    uint256 public endTime = 0;

    bool public ENABLE = false;    
    uint256 public HARD_CAP_PER_USER = 1250 * 1e18; // 50$
    uint256 public MIN_BUY = 750 * 1e18; // 30$
    uint256 public SALE_TIME_PERIOD = 3 * 60 * 60; // 3h

    mapping(address => uint256) public totalBoughtOf;

    modifier onlyOwner() {
        require(msg.sender == owner, "INVALID_PERMISSION");
        _;
    }

    modifier onlyWhitelisted() {
        require(msg.sender == tx.origin, "INVALID_WHITElIST");
        _;
    }

    event onBuy(address _user, uint256 _payAmt, uint256 _grbReceive);

    constructor(
        IERC20 _grb,
        IERC20 _usdc
    ) {
        GRB = _grb;
        USDC = _usdc;

        owner = msg.sender;
    }

    receive() external payable {}

    function enable() public onlyOwner {
        ENABLE = true;
    }
    function disable() public onlyOwner {
        ENABLE = false;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
    function start() public onlyOwner {
        endTime = block.timestamp.add(SALE_TIME_PERIOD);
        ENABLE = true;
    }
    function setEndTime(uint256 _value) public onlyOwner {
        endTime = _value;
    }
    function setGRBToken(IERC20 _grb) public onlyOwner {
        require(address(_grb) != address(0), "INVALID_ADDRESS");
        GRB = _grb;
    }

    function setUSDCToken(IERC20 _usdc) public onlyOwner {
        require(address(_usdc) != address(0), "INVALID_ADDRESS");
        USDC = _usdc;
    }

    function setSalePrice(uint256 _value) public onlyOwner {
        salePrice = _value; 
    }

    function setHardCapPerUser(uint256 _value) public onlyOwner {
        HARD_CAP_PER_USER = _value;
    }

    function setMinBuy(uint256 _value) public onlyOwner {
        MIN_BUY = _value;
    }

    function buy(uint256 _payAmt) public onlyWhitelisted {
        require(ENABLE == true, "SYSTEM_STOP");
        require(endTime > 0 && endTime <= block.timestamp, "SYSTEM_NOT_RUNNING");
        require(_payAmt > 0, "INVALID_AMOUNT_1");

        uint256 _maxBuy = getMaxBuyOf(msg.sender);
        require(_maxBuy > 0, "INVALID_PERMISSION");
        // quatity = pay / price
        uint256 _quatity  = _payAmt.mul(1e18).div(salePrice);
        // limit quatity
        if(_quatity > _maxBuy) {
            _quatity = _maxBuy;
            _payAmt = _quatity.mul(salePrice).div(1e18);
        }
        require(_quatity > 0, "INVALID_QUATITY:01");
        require(_quatity >= MIN_BUY, "INVALID_QUATITY:02");
        require(_payAmt > 0, "INVALID_PAYMENT:01");
        require(_claimUSDC(_payAmt) == true, "INVALID_PAYMENT:02");

        GRB.transfer(msg.sender, _quatity);
        totalPurchased = totalPurchased.add(_payAmt);
        totalBoughtOf[msg.sender] = totalBoughtOf[msg.sender].add(_quatity);

        emit onBuy(msg.sender, _payAmt, _quatity);
    }
    function _claimUSDC(uint256 _amt) private returns(bool)
    {
        uint256 _cBalBefore = USDC.balanceOf(address(this));
        USDC.transferFrom(msg.sender, address(this), _amt);
        uint256 _cBalAfter = USDC.balanceOf(address(this));
        if (_cBalAfter <= _cBalBefore) return false;
        if (_cBalAfter < _cBalBefore.add(_amt)) return false;
        return true;
    }
    function moveFund(IERC20 _token) public onlyOwner {
        uint256 _cBal = _token.balanceOf(address(this));
        _token.transfer(owner, _cBal);
    }
    
    function getMaxBuyOf(address _user) public view returns(uint256) {
        uint256 _totalSale = getTotalSale();
        if (
            totalBoughtOf[_user] >= HARD_CAP_PER_USER ||
            _totalSale <= 0 ||
            ENABLE == false
            ) {
            return 0;
        }
        // limit by user
        uint256 _maxBuy = HARD_CAP_PER_USER.sub(totalBoughtOf[_user]);
        // limit by total sale
        if (_maxBuy > _totalSale) {
            _maxBuy = _totalSale;
        }
        return _maxBuy;
    }

    function getUSDCBalance() public view returns(uint256) {
        return USDC.balanceOf(address(this));
    }
    function getTotalSale() public view returns(uint256) {
        return GRB.balanceOf(address(this));
    }
    
    function getData(address _user) public view returns(
        uint256 uUSDCBal_,
        uint256 uMaxGrbBuy_,
        uint256 uMaxUSDCPay_,
        uint256 cUSDCBal_,
        uint256 totalSale_,
        uint256 salePrice_,
        uint256 totalPurchased_,
        uint256 allowed_
    ) {
        uUSDCBal_ = USDC.balanceOf(_user);
        uMaxGrbBuy_ = getMaxBuyOf(_user);
        uMaxUSDCPay_ = uMaxGrbBuy_.mul(salePrice).div(1e18);
        cUSDCBal_ = getUSDCBalance();
        totalSale_ = getTotalSale();
        salePrice_ = salePrice;
        totalPurchased_ = totalPurchased;
        allowed_ = USDC.allowance(_user, address(this));
    }
}
