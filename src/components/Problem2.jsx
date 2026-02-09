import { useState, useCallback } from 'react'
import './Problem2.css'

const RATE_ETH_TO_USDT = 2500

function parseAmount(value) {
  const s = String(value).trim().replace(/,/g, '.')
  if (s === '' || s === '.') return null
  const n = parseFloat(s)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function formatAmount(num) {
  if (num == null) return ''
  if (num === 0) return '0'
  if (num >= 1e6) return num.toExponential(2)
  if (num < 0.0001 && num > 0) return num.toExponential(4)
  return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 8 })
}

export default function Problem2() {
  const [amountSend, setAmountSend] = useState('')
  const [unitFrom, setUnitFrom] = useState('ETH')
  const [unitTo, setUnitTo] = useState('USDT')
  const [hint, setHint] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const rate = unitFrom === 'ETH' ? RATE_ETH_TO_USDT : 1 / RATE_ETH_TO_USDT
  const receiveDisplay = (() => {
    const send = parseAmount(amountSend)
    return send === null ? '' : formatAmount(send * rate)
  })()

  const rateDisplay =
    unitFrom === 'ETH'
      ? `Rate: 1 ETH = ${RATE_ETH_TO_USDT} USDT`
      : `Rate: 1 USDT = ${formatAmount(1 / RATE_ETH_TO_USDT)} ETH`

  const handleSendChange = useCallback((e) => {
    setHint('')
    setAmountSend(e.target.value)
  }, [])

  const handleSwap = useCallback(() => {
    setAmountSend(receiveDisplay)
    setUnitFrom(unitTo)
    setUnitTo(unitFrom)
  }, [receiveDisplay, unitFrom, unitTo])

  const validate = useCallback(() => {
    const send = parseAmount(amountSend)
    if (send === null) {
      setHint('Enter a valid amount')
      return false
    }
    if (send <= 0) {
      setHint('Amount must be greater than 0')
      return false
    }
    setHint('')
    return true
  }, [amountSend])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!validate()) return
      const send = parseAmount(amountSend)
      const receive = parseAmount(receiveDisplay)
      setToast({
        show: true,
        message: `Swapped ${formatAmount(send)} ${unitFrom} for ${formatAmount(receive)} ${unitTo}.`,
        type: 'success',
      })
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500)
    },
    [amountSend, receiveDisplay, unitFrom, unitTo, validate]
  )

  return (
    <>
      <h2>Problem 2: Fancy Form (Swap)</h2>
      <div className="problem2-card">
        <h3 className="problem2-title">Swap</h3>
        <form className="problem2-form" onSubmit={handleSubmit} noValidate>
          <div className="problem2-field">
            <label htmlFor="amount-send">Amount to send</label>
            <div className="problem2-input-wrap">
              <input
                id="amount-send"
                type="text"
                inputMode="decimal"
                placeholder="0.0"
                autoComplete="off"
                value={amountSend}
                onChange={handleSendChange}
              />
              <span className="problem2-unit">{unitFrom}</span>
            </div>
            <span className={`problem2-hint ${hint ? 'error' : ''}`}>{hint}</span>
          </div>

          <button type="button" className="problem2-btn-swap" onClick={handleSwap} title="Swap amounts" aria-label="Swap amounts">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
            </svg>
          </button>

          <div className="problem2-field">
            <label htmlFor="amount-receive">Amount to receive</label>
            <div className="problem2-input-wrap">
              <input id="amount-receive" type="text" readOnly value={receiveDisplay} />
              <span className="problem2-unit">{unitTo}</span>
            </div>
          </div>

          <div className="problem2-rate">{rateDisplay}</div>
          <button type="submit" className="problem2-btn-confirm">CONFIRM SWAP</button>
        </form>

        {toast.show && (
          <div className={`problem2-toast show ${toast.type}`} role="status" aria-live="polite">
            {toast.message}
          </div>
        )}
      </div>
    </>
  )
}
