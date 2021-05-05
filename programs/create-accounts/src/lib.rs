use anchor_lang::prelude::*;
use anchor_lang::solana_program::program;
use anchor_lang::solana_program::system_instruction;

#[program]
pub mod create_accounts {
    use super::*;
    pub fn create_accounts<'info>(
        ctx: Context<'_, '_, '_, 'info, CreateAccounts<'info>>,
        size: u64,
        lamports: u64,
    ) -> ProgramResult {
        for acc_info in ctx.remaining_accounts {
            let ix = system_instruction::create_account(
                ctx.accounts.funding.key,
                acc_info.key,
                lamports,
                size,
                ctx.accounts.owner.key,
            );
            program::invoke(
                &ix,
                &[
                    ctx.accounts.funding.clone(),
                    acc_info.clone(),
                    ctx.accounts.system_program.clone(),
                ],
            )?;
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAccounts<'info> {
    #[account(mut, signer)]
    funding: AccountInfo<'info>,
    owner: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
}
