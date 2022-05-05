import { useState, useEffect } from 'react';
// import { getProvider } from '../../helpers/config/markets-and-network-config';

// const mainnetProvider = getProvider(ChainId.mainnet);

const useGetEnsName = (address: string) => {
  const [ensName, setEnsName] = useState<string | undefined | null>(undefined);

  // const getRecord = async (address: string) => {
  //   try {
  //     const name = await mainnetProvider.lookupAddress(address);
  //     setEnsName(name);
  //   } catch (error) {
  //     console.error('ENS lookup error', error);
  //   }
  // };

  useEffect(() => {
    setEnsName(undefined);
    // if (address) {
    //   getRecord(address);
    // } else {
    //   setEnsName(undefined);
    // }
  }, [address]);

  return { ensName };
};

export default useGetEnsName;
