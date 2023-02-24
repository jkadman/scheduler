import React from "react";
import { useState } from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {

   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   //    console.log('buttonClass:', buttonClass)
   // }

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

   // classNames('props.confirm', {buttonClass:'button--confirm'});
   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }
   // classNames('props', {danger: true});
   

    return (

      <button 
      className={buttonClass} 
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
      </button>

   )
}
