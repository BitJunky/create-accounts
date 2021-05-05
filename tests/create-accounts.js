const assert = require("assert");
const anchor = require("@project-serum/anchor");
const Account = anchor.web3.Account;
const BN = anchor.BN;

describe("create-accounts", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("Is initialized!", async () => {
    const program = anchor.workspace.CreateAccounts;

    const acc1 = new Account();
    const acc2 = new Account();

    const remainingAccounts = [
      { pubkey: acc1.publicKey, isSigner: true, isWritable: true },
      { pubkey: acc2.publicKey, isSigner: true, isWritable: true },
    ];
    const size = new BN(100);
    const lamports = new BN(
      await program.provider.connection.getMinimumBalanceForRentExemption(
        size.toNumber()
      )
    );
    const tx = await program.rpc.createAccounts(size, lamports, {
      accounts: {
        funding: program.provider.wallet.publicKey,
        owner: program.programId,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      remainingAccounts,
      signers: [acc1, acc2],
    });

    const account1 = await program.provider.connection.getAccountInfo(
      acc1.publicKey
    );
    assert.ok(account1.data.length == 100);
    const account2 = await program.provider.connection.getAccountInfo(
      acc1.publicKey
    );
    assert.ok(account2.data.length == 100);
  });
});
