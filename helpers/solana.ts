import { Program, Provider, web3, BN, Wallet } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';

export async function getProvider(
  wallet: AnchorWallet | undefined,
  preflightCommitment: web3.Commitment
) {
  if (!wallet) {
    return null;
  }
  const network = 'http://127.0.0.1:8899';
  const connection = new Connection(network, preflightCommitment);

  const provider = new Provider(connection, wallet, {
    preflightCommitment: preflightCommitment,
  });
  return provider;
}
