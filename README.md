# Create Accounts

A program to batch calls to the system program's create account instruction.
This should only be used when trying to optimize transaction sizes in the event
where a single byte, quite literally, counts.

## Deployments

* Mainnet: `nEgTksbfS91Y3rNUViY8L9oFsgZ6HWqG25ZFhQ5CSDw`
* Devnet: `nEgTksbfS91Y3rNUViY8L9oFsgZ6HWqG25ZFhQ5CSDw`

## Upgrade Authorities

The deployed program is not upgradeable.

## Developing

[Anchor](https://github.com/project-serum/anchor) is used for developoment, and it's
recommended workflow is used here. To get started, see the [guide](https://project-serum.github.io/anchor/getting-started/introduction.html).

### Build

```bash
anchor build --verifiable
```

The `--verifiable` flag should be used before deploying so that your build artifacts
can be deterministically generated with docker.

### Test

```bash
anchor test
```

### Verify

To verify the program deployed on Solana matches your local source code, install
docker, `cd programs/multisig`, and run

```bash
anchor verify <program-id | write-buffer>
```

A list of build artifacts can be found under [releases](https://github.com/project-serum/create-accounts/releases).
