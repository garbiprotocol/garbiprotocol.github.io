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

contract ProtocolLiquidityLaunch {
    uint8 public VERSION = 100;
    using SafeMath for uint256;
    
    address public owner;

    IERC20 public GAR;

    uint256 public salePrice = 1e15; // 1 gar = 0.001 ETH
    uint256 public totalSale = 50 * 1e27; // 50B gar
    uint256 public totalPurchased = 0;

    bool public ENABLE = true;    
    uint256 public HARD_CAP_PER_USER = 120 * 1e24; // 120M

    mapping(address => uint256) public totalBoughtOf;

    modifier onlyOwner() {
        require(msg.sender == owner, 'INVALID_PERMISSION');
        _;
    }

    modifier onlyWhitelisted() {
        require(msg.sender == tx.origin, "INVALID_WHITElIST");
        _;
    }

    event onBuy(address _user, uint256 _payAmt, uint256 _refundAmt, uint256 _garReceive);

    constructor(
        IERC20 _gar
    ) {
        GAR = _gar;

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

    function setGARToken(IERC20 _gar) public onlyOwner {
        require(address(_gar) != address(0), "INVALID_ADDRESS");
        GAR = _gar;
    }

    function setSalePrice(uint256 _value) public onlyOwner {
        salePrice = _value; 
    }

    function setTotalSale(uint256 _totalSale) public onlyOwner {
        totalSale = _totalSale;
    }

    function setHardCapPerUser(uint256 _value) public onlyOwner {
        HARD_CAP_PER_USER = _value;
    }

    function buy() public payable onlyWhitelisted {
        require(ENABLE == true, "SYSTEM_STOP");
        require(msg.value > 0, "INVALID_AMOUNT_1");

        uint256 _maxBuy = getMaxBuyOf(msg.sender);
        require(_maxBuy > 0, 'INVALID_PERMISSION');

        uint256 _payAmt   = msg.value;
        uint256 _refundAmt = 0;
        uint256 _quatity  = _payAmt.mul(1e18).div(salePrice);
        // limit quatity
        if(_quatity > _maxBuy) {
            _quatity = _maxBuy;
            _payAmt = _quatity.mul(salePrice).div(1e18);
            _refundAmt = msg.value.sub(_payAmt);
        }
        require(_quatity > 0, "INVALID_QUATITY");
        require(_payAmt > 0, "INVALID_PAYMENT");
        require(_payAmt.add(_refundAmt) <= msg.value, "INVALID_AMOUNT_2");

        GAR.transfer(msg.sender, _quatity);
        totalPurchased = totalPurchased.add(_payAmt);
        totalSale = totalSale.sub(_quatity);
        totalBoughtOf[msg.sender] = totalBoughtOf[msg.sender].add(_quatity);

        if(_refundAmt >  0) {
            bool sent = payable(msg.sender).send(_refundAmt);
            require(sent, "Failed to send Ether");
        }
        emit onBuy(msg.sender, _payAmt, _refundAmt, _quatity);
    }

    function moveFund() public onlyOwner {
        uint256 _cBal = getETHBalance();
        bool sent = payable(owner).send(_cBal);
        require(sent, "Failed to send Ether");
    }

    function emergencyWithdraw() public onlyOwner {
        uint256 _cBal = GAR.balanceOf(address(this));
        require(_cBal > 0, "NO ASSET");
        GAR.transfer(owner, _cBal);
    }
    function getMaxBuyOf(address _user) public view returns(uint256) {
        if (
            totalBoughtOf[_user] >= HARD_CAP_PER_USER ||
            totalSale <= 0 ||
            ENABLE == false
            ) {
            return 0;
        }
        // limit by user
        uint256 _maxBuy = HARD_CAP_PER_USER.sub(totalBoughtOf[_user]);
        // limit by total sale
        if (_maxBuy > totalSale) {
            _maxBuy = totalSale;
        }
        return _maxBuy;
    }
    
    function getETHBalance() public view returns(uint256) {
        return address(this).balance;
    }
    /**
    data_[0] = uint256 userETHBalance;
    data_[1] = uint256 userMaxGabBuy;
    data_[2] = uint256 userMaxETHPay;
    data_[3] = uint256 contractETHBalance;
    data_[4] = uint256 HARD_CAP_PER_USER;
    data_[5] = uint256 totalSaleGab;
    data_[6] = uint256 salePrice;
    data_[7] = uint256 totalPurchased;
     */
    function getData(address _user) public view returns(uint256[8] memory data_) {
        data_[0] = _user.balance;
        data_[1] = getMaxBuyOf(_user);
        data_[2] = data_[1].mul(salePrice).div(1e18);
        data_[3] = getETHBalance();
        data_[4] = HARD_CAP_PER_USER;
        data_[5] = totalSale;
        data_[6] = salePrice;
        data_[7] = totalPurchased;
    }



}
