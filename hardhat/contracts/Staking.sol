// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title Staking Contract
 * @dev Implements staking, reward distribution, and loan functionalities with interest calculation.
 */
contract Staking is ReentrancyGuard, Ownable, Pausable {
    // Custom errors for efficient error handling
    error AmountMustBeGreaterThanZero();
    error AmountNotEnough();
    error TransferFailed();
    error LoanNotRepaid();
    error InsufficientCollateral();

    // State variables for staking and reward tokens
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    // Variables to track reward rate, staked tokens, and borrowing details
    uint256 public rewardRate;
    uint256 public totalStakedTokens;
    uint256 public totalBorrowedAmount;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;

    // Mappings to track user balances and rewards
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public userRewardPerTokenPaid;

    // Events for logging important actions
    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);
    event RewardRateUpdated(uint256 newRewardRate);
    event EmergencyWithdrawal(address indexed user, uint256 indexed amount);

    /**
     * @dev Constructor to initialize the staking and reward tokens.
     * @param stakingToken Address of the staking token.
     * @param rewardToken Address of the reward token.
     */
    constructor(address stakingToken, address rewardToken) Ownable(msg.sender) {
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
        rewardRate = 1e15; // Initial reward rate
    }

    /**
     * @dev Calculates the reward per token based on the elapsed time and total staked tokens.
     * @return Updated reward per token.
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStakedTokens == 0) {
            return rewardPerTokenStored;
        }
        uint256 totalTime = block.timestamp - lastUpdateTime;
        uint256 totalRewards = rewardRate * totalTime;
        return
            rewardPerTokenStored + ((totalRewards * 1e18) / totalStakedTokens);
    }

    /**
     * @dev Calculates the earned rewards for a given account.
     * @param account Address of the account.
     * @return Earned rewards for the account.
     */
    function earned(address account) public view returns (uint256) {
        uint256 effectiveStakedBalance = stakedBalance[account];

        return
            ((effectiveStakedBalance *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    // Modifier to update reward data for an account
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    /**
     * @dev Allows users to stake tokens in the contract.
     * @param amount Amount of tokens to stake.
     */
    function stake(
        uint256 amount
    ) external nonReentrant whenNotPaused updateReward(msg.sender) {
        if (amount <= 0) revert AmountMustBeGreaterThanZero();
        totalStakedTokens += amount;
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
        bool success = s_stakingToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        if (!success) revert TransferFailed();
    }

    /**
     * @dev Allows users to withdraw staked tokens from the contract.
     * @param amount Amount of tokens to withdraw.
     */
    function withdrawStakedTokens(
        uint256 amount
    ) external nonReentrant whenNotPaused updateReward(msg.sender) {
        if (amount <= 0) revert AmountMustBeGreaterThanZero();
        if (stakedBalance[msg.sender] < amount) revert AmountNotEnough();

        totalStakedTokens -= amount;
        stakedBalance[msg.sender] -= amount;
        emit Withdrawn(msg.sender, amount);
        bool success = s_stakingToken.transfer(msg.sender, amount);
        if (!success) revert TransferFailed();
    }

    /**
     * @dev Allows users to claim their earned rewards.
     */
    function getReward()
        external
        nonReentrant
        whenNotPaused
        updateReward(msg.sender)
    {
        uint256 reward = rewards[msg.sender];
        if (reward < 0) revert AmountNotEnough();

        rewards[msg.sender] = 0;
        emit RewardsClaimed(msg.sender, reward);
        bool success = s_rewardToken.transfer(msg.sender, reward);
        if (!success) revert TransferFailed();
    }
}
