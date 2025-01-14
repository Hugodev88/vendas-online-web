import Screen from "../../../shared/components/screen/Screen"
import { ProductRoutesEnum } from "../routes"
import Input from "../../../shared/components/inputs/input/input"
import Button from "../../../shared/components/buttons/button/button"
import Select from "../../../shared/components/inputs/select/select"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { useNavigate } from "react-router-dom"
import InputMoney from "../../../shared/components/inputs/inputMoney/inputMoney"
import { useInsertProduct } from "../hooks/useInsertProduct"
import { useCategory } from "../../category/hooks/useCategory"
import { ProductInsertContainer } from "../styles/productInsert.style"

const ProductInsert = () => {

	const { product, loading, disabledButton, onChangeInput, handleInsertProduct, handleChangeSelect } = useInsertProduct()

	const { categories } = useCategory()
	const navigate = useNavigate()

	const handleOnClickCancel = () => {
		navigate(ProductRoutesEnum.PRODUCT)
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
			<ProductInsertContainer>
				<LimitedContainer width={400}>
					<Input onChange={(e) => onChangeInput(e, 'name', false)} value={product.name} margin="0px 0px 16px 0" title="Nome" placeholder="Nome" />
					<Input onChange={(e) => onChangeInput(e, 'image', false)} value={product.image} margin="0px 0px 16px 0" title="Url imagem" placeholder="Url imagem" />
					<InputMoney onChange={(e) => onChangeInput(e, 'price', true)} value={product.price} margin="0px 0px 16px 0" title="Preço" placeholder="Preço" />
					<Select
						title="Categoria"
						margin="0px 0px 32px 0"
						onChange={handleChangeSelect}
						options={
							categories.map((category) => ({
								value: `${category.id}`,
								label: `${category.name}`,
							}))
						}
					/>
					<DisplayFlexJustifyRight>
						<LimitedContainer margin="0px 8px" width={120}>
							<Button danger onClick={handleOnClickCancel}>Cancelar</Button>
						</LimitedContainer>
						<LimitedContainer width={120}>
							<Button loading={loading} disabled={disabledButton} onClick={handleInsertProduct} type="primary">Inserir Produto</Button>
						</LimitedContainer>
					</DisplayFlexJustifyRight>
				</LimitedContainer>
			</ProductInsertContainer>
		</Screen >
	)
}

export default ProductInsert