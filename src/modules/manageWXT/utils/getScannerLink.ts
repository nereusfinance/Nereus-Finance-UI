function getScannerLink(txHash: string, chainId: number) {
  if (chainId === 42) {
    return `https://kovan.etherscan.io/tx/${txHash}`;
  } else if (chainId === 43114) {
    return `https://avascan.info/blockchain/c/tx/${txHash}}`;
  } else {
    // default
    return `https://avascan.info/blockchain/c/tx/${txHash}}`;
  }
}

export { getScannerLink };
