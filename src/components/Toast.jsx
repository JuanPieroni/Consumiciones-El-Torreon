import React, { useState, useEffect } from 'react'
import './Toast.css'

let toastId = 0
const toasts = new Set()
const listeners = new Set()

export const showToast = (message, type = 'success', duration = 2000) => {
  const id = ++toastId
  const toast = { id, message, type, duration }
  
  toasts.add(toast)
  listeners.forEach(listener => listener([...toasts]))
  
  setTimeout(() => {
    toasts.delete(toast)
    listeners.forEach(listener => listener([...toasts]))
  }, duration)
}

const Toast = () => {
  const [toastList, setToastList] = useState([])

  useEffect(() => {
    const updateToasts = (newToasts) => setToastList(newToasts)
    listeners.add(updateToasts)
    return () => listeners.delete(updateToasts)
  }, [])

  return (
    <div className="toast-container">
      {toastList.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : 'ℹ'}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default Toast