import { useEffect } from 'react'

export const useSwipeToCloseMenu = (callback) => {
  useEffect(() => {
    let touchStartValue = 0
    let touchEndValue = 0

    const touchStart = (e) => {
      touchStartValue = e.changedTouches[0].pageY
    }

    const touchEnd = (e) => {
      touchEndValue = e.changedTouches[0].pageY
      if (touchStartValue < touchEndValue || touchStartValue > touchEndValue)
        callback()
    }
    document.addEventListener('touchstart', touchStart)

    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  })
}
