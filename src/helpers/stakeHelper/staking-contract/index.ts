import { constants, Contract, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '../commons/types';
import { DEFAULT_APPROVE_AMOUNT, valueToWei } from '../commons/utils';
import { ERC20Service, IERC20ServiceInterface } from '../erc20-contract';
import { IStakedToken__factory } from './typechain/IStakedToken__factory';
import { IChefController__factory } from './typechain/chechControllerFactory';
export interface StakingInterface {
  stakingContractAddress: tEthereumAddress;
  stake: (user: tEthereumAddress, amount: string) => Promise<EthereumTransactionTypeExtended[]>;
  claimRewards: (
    user: tEthereumAddress,
    tokens: [tEthereumAddress, tEthereumAddress]
  ) => Promise<EthereumTransactionTypeExtended[]>;
  signStaking: (user: tEthereumAddress, amount: string, nonce: string) => Promise<string>;
}

type StakingServiceConfig = {
  STAKING_POOL: string;
  LP_TOKEN: string;
  CHEF_CONTROLLER: string;
};

export class StakingService extends BaseService<any> implements StakingInterface {
  public readonly stakingContractAddress: tEthereumAddress;
  public readonly stakingLPToken: tEthereumAddress;
  public readonly chefControllerAddress: tEthereumAddress;
  public readonly chefController: Contract;

  readonly stakingHelperContractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, stakingServiceConfig: StakingServiceConfig) {
    super(provider, IStakedToken__factory);

    this.erc20Service = new ERC20Service(provider);
    this.stakingContractAddress = stakingServiceConfig.STAKING_POOL;
    this.stakingLPToken = stakingServiceConfig.LP_TOKEN;
    this.chefControllerAddress = stakingServiceConfig.CHEF_CONTROLLER;
    this.chefController = IChefController__factory.connect(this.chefControllerAddress, provider);
  }

  public async signStaking(user: tEthereumAddress, amount: string, nonce: string): Promise<string> {
    const { getTokenData } = this.erc20Service;
    const stakingContract = this.getContractInstance(this.stakingContractAddress);
    const stakedToken: string = await stakingContract.STAKED_TOKEN();
    const { name, decimals } = await getTokenData(stakedToken);
    const convertedAmount: string = valueToWei(amount, decimals);
    const { chainId } = await this.provider.getNetwork();

    const typeData = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      },
      primaryType: 'Permit',
      domain: {
        name,
        version: '1',
        chainId,
        verifyingContract: stakedToken,
      },
      message: {
        owner: user,
        spender: this.stakingHelperContractAddress,
        value: convertedAmount,
        nonce,
        deadline: constants.MaxUint256.toString(),
      },
    };

    return JSON.stringify(typeData);
  }

  public async stake(
    user: tEthereumAddress,
    amount: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;
    const stakingContract = this.getContractInstance(this.stakingContractAddress);
    const stakedTokenDecimals: number = await decimalsOf(this.stakingLPToken);
    const convertedAmount: string = valueToWei(amount, stakedTokenDecimals);
    const approved: boolean = await isApproved({
      token: this.stakingLPToken,
      user,
      spender: this.stakingContractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: this.stakingLPToken,
        spender: this.stakingContractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }
    console.log(stakingContract);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => stakingContract.populateTransaction.stake(convertedAmount),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async withdraw(
    user: tEthereumAddress,
    amount: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    let convertedAmount: string;
    const stakingContract = this.getContractInstance(this.stakingContractAddress);
    if (amount === '-1') {
      convertedAmount = constants.MaxUint256.toString();
    } else {
      const { decimalsOf } = this.erc20Service;
      const stakedTokenDecimals: number = await decimalsOf(this.stakingLPToken);
      convertedAmount = valueToWei(amount, stakedTokenDecimals);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => stakingContract.populateTransaction.unstake(user, convertedAmount),
      from: user,
      gasSurplus: 20,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.STAKE_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  public async claimRewards(
    user: tEthereumAddress,
    tokens: [tEthereumAddress, tEthereumAddress]
  ): Promise<EthereumTransactionTypeExtended[]> {
    const stakingContract = this.chefController;
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => stakingContract.populateTransaction.claim(user, tokens),
      from: user,
      gasSurplus: 20,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.STAKE_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }
}
