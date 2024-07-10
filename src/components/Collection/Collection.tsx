import { FC, ReactNode } from "react"
import cl from "./Collection.module.scss"

const orientationStyles = {
  vertical: cl.vertical,
  horizontal: cl.horizontal,
}

type CollectionProps<T> = {
  orientation: keyof typeof orientationStyles
  displayData: (item: T, index: number) => ReactNode
  listOfData: T[]
}

const Collection = <T extends object | string | number>({
  orientation,
  displayData,
  listOfData,
}: CollectionProps<T>) => {
  return <div className={orientationStyles[orientation]}>{listOfData.map(displayData)}</div>
}

export default Collection
