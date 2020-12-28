import React from "react"
import cx from "classnames"
import { IBlueprintIcon } from "../../../types"
import ItemIcon from "../ItemIcon"
import * as SC from "./build-icon.styles"

interface IBuildIconProps {
  icons: IBlueprintIcon[]
  size?: "medium" | "large"
}

function BuildIcon({ icons, size = "medium" }: IBuildIconProps): JSX.Element {
  return (
    <SC.BuildIconWrapper
      className={cx({
        "large-icons": icons.length === 1,
        "medium-icons": icons.length > 1,
        "size-medium": size === "medium",
        "size-large": size === "large",
      })}
    >
      {icons.map((icon) => (
        <ItemIcon key={icon.index} itemName={icon.signal.name} />
      ))}
    </SC.BuildIconWrapper>
  )
}

export default BuildIcon
