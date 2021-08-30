const lunieMessageTypes = {
  SEND: `SendTx`,
  SEND_MULTIPLE: `SendMultiTx`,
  STAKE: `StakeTx`,
  RESTAKE: `RestakeTx`,
  UNSTAKE: `UnstakeTx`,
  VOTE: `VoteTx`,
  DEPOSIT: `DepositTx`,
  CLAIM_REWARDS: `ClaimRewardsTx`,
  SUBMIT_PROPOSAL: `SubmitProposalTx`,
  CREATE_ISCN_RECORD: `CreateISCNRecord`,
  UPDATE_ISCN_RECORD: `UpdateISCNRecord`,
  CHANGE_ISCN_OWNERSHIP: `ChangeISCNOwnership`,
  UNKNOWN: `UnknownTx`,
}

module.exports = { lunieMessageTypes }
