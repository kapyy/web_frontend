

import React, { useEffect, useRef, useState } from "react";
import { composeRef } from 'rc-util/lib/ref';

import styles from "./index.module.sass"


export const Ktextarea = React.forwardRef((props: any, ref) => {

  const {
    onBlur,
    onFocus,
    helperText,
    error,
    name,
    label,
    first,
    addonAfter,
    width,
    placeholder
  } = props;

  const inputRef = useRef<Element>(null)

  const [fouceState, setFouceState] = useState(false)

  const [val, setVal] = useState<string | number | readonly string[] | undefined>('')

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFouceState(false)
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFouceState(true)
    onFocus?.(e);
  };

  useEffect(() => {
    const handleInput = (event: any) => {
      const inputValue = event.target.value;
      console.log(inputValue, 'inputValue')
      setVal(inputValue)
    };
    inputRef.current?.addEventListener('input', handleInput);
    return () => {
      inputRef.current?.removeEventListener('input', handleInput);
    };
  }, [])


  //需要的状态 foce  err noml hover first
  return <div className={[
    styles.fieldset,
    fouceState ? styles.fouce : null,
    ((val !== '' && val) || (placeholder !== '' && placeholder)) ? styles.hasVal : null,
    error ? styles.err : null,
    first ? styles.first : null,
  ].join(' ')} style={{
    width: width + 'px'
  }}>

    <div className={styles.borderBox} style={{
      height: '200px'
    }}>
      <div className={styles.inputBox}>

        <textarea
          resize='none'
          maxRows={4}
          maxlength={100}
          className={styles.input}
          {...props}
          ref={composeRef(ref, inputRef)}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}

        />
        <div className={styles.label}>
          {label}
        </div>
        {
          addonAfter && (
            <span className={styles.addonAfter}>
              {addonAfter}
            </span>
          )
        }
      </div>
    </div>
    <p className={styles.helperText}>  {helperText}
    </p>
  </div >
}
)






