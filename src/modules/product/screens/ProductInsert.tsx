import { useEffect, useState } from "react"
import Screen from "../../../shared/components/screen/Screen"
import { ProductRoutesEnum } from "../routes"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls"
import { LimitedContainer } from "../styles/productInsert.style"
import Input from "../../../shared/components/inputs/input/input"
import Button from "../../../shared/components/buttons/button/button"
import Select from "../../../shared/components/inputs/select/select"
import { InsertProductDto } from "../../../shared/dtos/InsertProduct.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI"

const ProductInsert = () => {

	const [product, setProduct] = useState<InsertProductDto>({
		name: '',
		price: 0,
		image: ''
	})
	const { categories, setCategories } = useDataContext()
	const { request } = useRequests()

	useEffect(() => {
		if (categories.length === 0) {
			request(URL_CATEGORY, MethodsEnum.GET, setCategories)
		}
	}, [])

	const handleChange = (value: string) => {
		setProduct({
			...product,
			categoryId: Number(value)
		})
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
		setProduct({
			...product,
			[nameObject]: e.target.value
		})
	}

	const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({
			...product,
			price: Number(e.target.value)
		})
	}

	const handleInsertProduct = () => {
		connectionAPIPost(URL_PRODUCT, product)
	}

	return (
		<Screen listBreadcrumb={[
			{
				name: 'HOME',
			},
			{
				name: 'PRODUTOS',
				navigateTo: ProductRoutesEnum.PRODUCT
			},
			{
				name: 'INSERIR PRODUTO',
			},
		]}>
			<LimitedContainer>
				<Input onChange={(e) => onChange(e, 'name')} value={product.name} margin="0px 0px 16px 0" title="Nome" placeholder="Nome" />
				<Input onChange={(e) => onChange(e, 'image')} value={product.image} margin="0px 0px 16px 0" title="Url imagem" placeholder="Url imagem" />
				<Input onChange={onChangePrice} value={product.price} margin="0px 0px 16px 0" title="Preço" placeholder="Preço" />
				<Select
					title="Categoria"
					margin="0px 0px 32px 0"
					onChange={handleChange}
					options={
						categories.map((category) => ({
							value: `${category.id}`,
							label: `${category.name}`,
						}))
					}
				/>
				<Button onClick={handleInsertProduct} type="primary">Inserir Produto</Button>
			</LimitedContainer>
		</Screen>
	)
}

export default ProductInsert