import { FC } from "react"
import cl from "./ToggleCheckbox.module.scss"

const toggleCheckboxSizes = {
  sm: cl.sm,
  md: cl.md,
  lg: cl.lg,
}

type ToggleCheckboxProps = {
  size?: keyof typeof toggleCheckboxSizes
  checked: boolean
  onClick: () => void
}

const ToggleCheckbox: FC<ToggleCheckboxProps> = ({ size = "lg", checked, onClick }) => {
  const stylesToggle = `${cl.toggle} ${toggleCheckboxSizes[size]}`
  const stylesSlider = `${cl.toggle_slider} ${toggleCheckboxSizes[size]}`

  return (
    <label className={stylesToggle}>
      <input className={cl.toggle_checkbox} type="checkbox" checked={checked} onClick={onClick} />
      <span className={stylesSlider}></span>
    </label>
  )
}

export default ToggleCheckbox
