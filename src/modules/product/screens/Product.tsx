import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

const Product = () => {

    const { user } = useGlobalContext()

    return <div>Products {`${user?.name}`}</div>

}

export default Product