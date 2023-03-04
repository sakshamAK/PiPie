import React from 'react'
import style from "./ErrorPage.module.css"

export const ErrorPage = () => {
  return (
    <div className={`${style["errorpage"]}`}>
        <img src="../../assets/logo.png" alt="PiPie logo" />
        <h1>
            404: Looks like you have visited the wrong page.
        </h1>
    </div>
  )
}
