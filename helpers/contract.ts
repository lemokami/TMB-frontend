import { Program, web3 } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { getProvider } from './solana';
import idl from '../idl.json';

export const createPostContract = async (
  wallet: AnchorWallet,
  shareable: boolean,
  metaHash: string
) => {
  const provider = await getProvider(wallet, 'processed');
  const postID = web3.Keypair.generate();

  if (!provider) {
    return null;
  }
  const IDL = JSON.parse(JSON.stringify(idl));

  const program = new Program(IDL, idl.metadata.address, provider);
  try {
    var tx = await program.rpc.initialize({
      accounts: {
        data: postID.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [postID],
    });
    tx = await program.rpc.uploadmedia(shareable, wallet.publicKey, metaHash, {
      accounts: {
        data: postID.publicKey,
      },
      signers: [],
    });
    return { tx: tx, postID: postID.publicKey };
  } catch (error) {
    return null;
  }

  //   let owner = await program.account.Metadata.fetch(postID.publicKey);
  // console.log(program.account.metadata.fetch(wallet.publicKey))
};

export const sharePostContract = async (wallet: AnchorWallet, postID: any) => {
  const provider = await getProvider(wallet, 'processed');

  if (!provider) {
    return null;
  }
  const IDL = JSON.parse(JSON.stringify(idl));

  const program = new Program(IDL, idl.metadata.address, provider);
  try {
    // const fd = new FormData();
    // fd.append('Media',file,file.name)

    // const data = await axios.post('http://localhost:8080/upload',fd)

    const tx = await program.rpc.sharemedia(wallet.publicKey, {
      accounts: {
        data: postID,
      },
      signers: [],
    });
    return tx;
  } catch (error) {
    return null;
  }

  //   let owner = await program.account.Metadata.fetch(postID.publicKey);
  // console.log(program.account.metadata.fetch(wallet.publicKey))
};
