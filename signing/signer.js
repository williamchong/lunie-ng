import { getWallet } from '~/common/keystore'
import { getLedger } from '~/common/ledger'

export async function getSigner(
  signingType,
  { address, password },
  chainId,
  ledgerTransport,
  sessionSigner
) {
  if (signingType === `local`) {
    const { Secp256k1HdWallet } = await import('@cosmjs/amino')
    const { wallet: serializedWallet } = getWallet(address)
    const wallet = await Secp256k1HdWallet.deserialize(
      serializedWallet,
      password
    )
    return wallet
  } else if (signingType === `ledger`) {
    const { ledger } = await getLedger(ledgerTransport)
    return ledger
  } else if (signingType === `keplr`) {
    return window.getOfflineSigner(chainId)
  } else if (signingType === `cosmostation` || signingType === `authcore`) {
    if (!sessionSigner) {
      throw new Error(`session signer is not inited`)
    }
    return sessionSigner
  }

  throw new Error(`Signing via ${signingType} is not supported`)
}
