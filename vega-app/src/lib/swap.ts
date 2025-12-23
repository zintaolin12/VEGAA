export async function getQuote(
  fromToken: string,
  toToken: string,
  amount: string
) {
  return {
    rate: 1.23,
    estimatedGas: '0.002 MATIC',
  }
}

export async function executeSwap() {
  console.log('Swap executed')
}
