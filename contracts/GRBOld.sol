// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

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

contract GRB is IERC20 {

    using SafeMath for uint256;

    address public owner;

    mapping(bytes32 => TimeLock) public timeLockOf;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;
    uint256 private _maxTotalSupply = 1000000 * 1e18;

    string public override name = "GRB  Token";
    string public override symbol = "GRB";
    uint8 public override decimals = 18;

    address public miningMachine;
    address public burnMachine;

    uint public constant GRACE_PERIOD = 30 days;
    uint public constant MINIMUM_DELAY = 2 days;
    uint public constant MAXIMUM_DELAY = 30 days;
    uint public delay;

    struct TimeLock {
        bool queuedTransactions;
        uint256 timeOfExecute;
        mapping(bytes32 => address) addressOf;
        mapping(bytes32 => uint256) uintOf;
    }

    modifier onlyOwner()
    {
        require(msg.sender == owner, "INVALID_PERMISSION");
        _;
    }

    modifier onlyMiningMachine()
    {
        require(msg.sender == miningMachine, "INVALID_PERMISSION");
        _;
    }

     modifier onlyBurnMachine()
    {
        require(msg.sender == burnMachine, "INVALID_PERMISSION");
        _;
    }

    event onQueuedTransactionsChangeAddress(string _functionName, string _fieldName, address _value);
    event onQueuedTransactionsChangeUint(string _functionName, string _fieldName, uint256 _value);
    event onCancelTransactions(string _functionName);

    constructor() {
        owner = msg.sender;
    }

    function setDelay(uint delay_) public onlyOwner {
        require(delay_ >= MINIMUM_DELAY, "Timelock::setDelay: Delay must exceed minimum delay.");
        require(delay_ <= MAXIMUM_DELAY, "Timelock::setDelay: Delay must not exceed maximum delay.");

        delay = delay_;
    }

    function cancelTransactions(string memory _functionName) public onlyOwner {

        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];
        _timelock.queuedTransactions = false;

        emit onCancelTransactions(_functionName);
    }

    function queuedTransactionsChangeAddress(string memory _functionName, string memory _fieldName, address _newAddr) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];

        _timelock.addressOf[keccak256(abi.encode(_fieldName))] = _newAddr;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeAddress(_functionName, _fieldName, _newAddr);
    }

    function queuedTransactionsChangeUint(string memory _functionName, string memory _fieldName, uint256 _value) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];

        _timelock.uintOf[keccak256(abi.encode(_fieldName))] = _value;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeUint(_functionName, _fieldName, _value);
    }

    function transferOwnership() public onlyOwner {

        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode("transferOwnership"))];

        _validateTimelock(_timelock);
        require(_timelock.addressOf[keccak256(abi.encode("owner"))] != address(0), "INVALID_ADDRESS");

        owner = _timelock.addressOf[keccak256(abi.encode("owner"))];
        delete _timelock.addressOf[keccak256(abi.encode("owner"))];
        _timelock.queuedTransactions = false;
    }

    function setMiningMachine() public onlyOwner {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode("setMiningMachine"))];

        _validateTimelock(_timelock);
        require(_timelock.addressOf[keccak256(abi.encode("miningMachine"))] != address(0), "INVALID_ADDRESS");

        miningMachine = _timelock.addressOf[keccak256(abi.encode("miningMachine"))];
        delete _timelock.addressOf[keccak256(abi.encode("miningMachine"))];
        _timelock.queuedTransactions = false;
    }

    function setBurnMachine() public onlyOwner {

        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode("setBurnMachine"))];

        _validateTimelock(_timelock);
        require(_timelock.addressOf[keccak256(abi.encode("setBurnMachine"))] != address(0), "INVALID_ADDRESS");

        burnMachine = _timelock.addressOf[keccak256(abi.encode("burnMachine"))];
        delete _timelock.addressOf[keccak256(abi.encode("burnMachine"))];
        _timelock.queuedTransactions = false;
    }

    function setMaxTotalSupply() public onlyOwner {

        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode("setMaxTotalSupply"))];

        _validateTimelock(_timelock);
        require(_timelock.uintOf[keccak256(abi.encode("_maxTotalSupply"))] > 0, "INVALID_AMOUNT");

        _maxTotalSupply = _timelock.uintOf[keccak256(abi.encode("_maxTotalSupply"))];
        delete _timelock.uintOf[keccak256(abi.encode("_maxTotalSupply"))];
        _timelock.queuedTransactions = false;
    }

    function _validateTimelock(TimeLock storage _timelock) private view {
        require(_timelock.queuedTransactions == true, "Transaction hasn't been queued.");
        require(_timelock.timeOfExecute <= block.timestamp, "Transaction hasn't surpassed time lock.");
        require(_timelock.timeOfExecute.add(GRACE_PERIOD) >= block.timestamp, "Transaction is stale.");
    }

    function getAddressChangeOnTimeLock(string memory _functionName, string memory _fieldName) public view returns(address) {
        return timeLockOf[keccak256(abi.encode(_functionName))].addressOf[keccak256(abi.encode(_fieldName))];
    }

    function getUintChangeOnTimeLock(string memory _functionName, string memory _fieldName) public view returns(uint256) {
        return timeLockOf[keccak256(abi.encode(_functionName))].uintOf[keccak256(abi.encode(_fieldName))];
    }

    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function maxTotalSupply() public view returns (uint256) {
        return _maxTotalSupply;
    }

    function balanceOf(address _addr) public override view returns (uint256) {
        return _balances[_addr];
    }
    function getOwner() public override view returns (address) {
        return owner;
    }
    function allowance(address _owner, address _spender)
        public
        virtual
        override
        view
        returns (uint256)
    {
        return _allowances[_owner][_spender];
    }

    function mint(address account, uint256 amount) public virtual onlyMiningMachine {

        require(account != address(0), "ERC20: mint to the zero address");

        if (_totalSupply > _maxTotalSupply) {
            amount = 0;
        } else if (_totalSupply.add(amount) > _maxTotalSupply) {
            amount = _maxTotalSupply.sub(_totalSupply);
        }

        require(_totalSupply.add(amount) <= _maxTotalSupply, "over maxTotalSupply");

        _totalSupply = _totalSupply.add(amount);

        _balances[account] = _balances[account].add(amount);

        emit Transfer(address(0), account, amount);
    }

    function burn(address account, uint256 amount) public virtual onlyBurnMachine {

        _balances[account] = _balances[account].sub(amount);

        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(account, address(0), amount);
    }

    function approve(address _spender, uint256 _amount)
        public
        virtual
        override
        returns (bool)
    {
        require(_spender != address(0), "INVALID_SPENDER");

        _allowances[msg.sender][_spender] = _amount;

        emit Approval(msg.sender, _spender, _amount);

        return true;
    }

    function transfer(address _to, uint256 _amount)
        public
        virtual
        override
        returns (bool)
    {
        require(_amount > 0, "INVALID_AMOUNT");
        require(_balances[msg.sender] >= _amount, "INVALID_BALANCE");

        _balances[msg.sender] = _balances[msg.sender].sub(_amount);
        _balances[_to]        = _balances[_to].add(_amount);
        /*------------------------ emit event ------------------------*/
        emit Transfer(msg.sender, _to, _amount);
        /*----------------------- response ---------------------------*/
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public virtual override returns (bool) {
        require(_amount > 0, "INVALID_AMOUNT");
        require(_balances[_from] >= _amount, "INVALID_BALANCE");
        require(_allowances[_from][msg.sender] >= _amount, "INVALID_PERMISSION");
        
        _allowances[_from][msg.sender] = _allowances[_from][msg.sender].sub(_amount);
        
        _balances[_from]    = _balances[_from].sub(_amount);
        _balances[_to]      = _balances[_to].add( _amount);
        /*------------------------ emit event ------------------------*/
        emit Transfer(_from, _to, _amount);
        /*----------------------- response ---------------------------*/
        return true;
    }
}