import { useState } from "react"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
// import cx from "classnames"
import * as SC from "./markdown-editor.styles"

interface IMarkdownEditorProps {
  id: string
  name?: string
  value: string
  // placeholder?: string
  // customPrefix?: JSX.Element
  // icon?: JSX.Element
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  // onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const MarkdownEditor = ({
  // id,
  // name,
  // placeholder,
  // ...restProps
  value,
  onChange,
}: IMarkdownEditorProps): JSX.Element => {
  return (
    // <SC.StyledInputWrapper className={cx({ "is-focused": focused })}>
    <SC.StyledInputWrapper>
      {/* {customPrefix && <SC.Prefix>{customPrefix}</SC.Prefix>}
      {icon} */}
      <ReactMde value={value} onChange={onChange} />
      {/* <SC.StyledInput
        {...restProps}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        spellCheck={spellCheck}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={setFocus}
        onBlur={clearFocus}
      /> */}
    </SC.StyledInputWrapper>
  )
}

export default MarkdownEditor
