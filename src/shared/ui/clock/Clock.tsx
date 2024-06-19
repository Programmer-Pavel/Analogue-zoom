import React, { useEffect, useRef, useState } from 'react'
import styles from './Clock.module.scss'

export function Clock() {
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)

  const secondRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let nextAt = new Date().getTime() + 1000

    const wrapper = () => {
      nextAt += 1000
      timeout = setTimeout(wrapper, nextAt - new Date().getTime())

      if (secondRef && secondRef.current) {
        secondRef.current.style.transform = `rotate(${second * 6}deg)`

        if (second === 60)
          setSecond(1)
        else
          setSecond(second + 1)
      }

      if (minuteRef && minuteRef.current && second === 60) {
        minuteRef.current.style.transform = `rotate(${minute * 6}deg)`

        if (minute === 60)
          setMinute(0)
        else
          setMinute(minute + 1)
      }

      if (
        hourRef
        && hourRef.current
        && (minute === 12
        || minute === 24
        || minute === 36
        || minute === 48
        || minute === 60)
      ) {
        hourRef.current.style.transform = `rotate(${hour * 6}deg)`
        setHour(hour + 1)
      }
    }

    timeout = setTimeout(wrapper, nextAt - new Date().getTime())

    return () => clearTimeout(timeout)
  }, [second])

  return (
    <div className={styles.circle}>
      <div ref={hourRef} className={styles.hour} />
      <div ref={minuteRef} className={styles.minute} />
      <div ref={secondRef} className={styles.second} />
    </div>
  )
}
