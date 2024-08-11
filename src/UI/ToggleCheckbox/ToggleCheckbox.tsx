import { FC } from "react"
import cl from "./ToggleCheckbox.module.scss"

type ToggleCheckboxProps = {
    checked: boolean,
    onClick: () => void
}

const ToggleCheckbox: FC<ToggleCheckboxProps> = ({ checked, onClick }) => {
  return (
    <label className={cl.toggle}>
      <input className={cl.toggle_checkbox} type="checkbox" checked={checked} onClick={onClick} />
      <span className={cl.toggle_slider}></span>
    </label>
  )
}

export default ToggleCheckbox
