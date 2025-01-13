import { Tag } from "antd"
import { CategoryType } from "../../../shared/types/CategoryType"

interface CategoryColumnProps {
    category?: CategoryType
}

const colors: string[] = [
    'volcano',
    'red',
    'gold',
    'blue',
    'orange',
    'lime',
    'green',
    'cyan',
    'magenta',
    'geekblue',
    'purple',
]

const CategoryColumn = ({ category }: CategoryColumnProps) => {

    if (!category) {
        return null
    }

    const currentColor = colors[category.id] || colors[0]

    return (
        <Tag color={currentColor}>{category.name}</Tag>
    )
}

export default CategoryColumn