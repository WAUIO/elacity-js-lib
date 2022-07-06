/* eslint-disable max-classes-per-file */
class ElacityBaseError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

export class ErrorNoWalletConnected extends ElacityBaseError {
  public constructor() {
    super('No wallet connected. Please connect your wallet first');
  }
}

export class ErrorWrongNetwork extends ElacityBaseError {
  public constructor() {
    super('Wrong network connected');
  }
}

export class ErrorBanned extends ElacityBaseError {
  public constructor() {
    super('You are banned from minting');
  }
}

export class ErrorNotEnoughBalance extends ElacityBaseError {
  public constructor(amount: string | number) {
    super(`Insufficient balance to fullfil this operation. You need ${amount} to mint`);
  }
}
