import { useNavigate } from "react-router-dom"
import Button from "../../../shared/components/buttons/button/button"
import Input from "../../../shared/components/inputs/input/input"
import Screen from "../../../shared/components/screen/Screen"
import { DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { useInsertCategory } from "../hooks/useInsertCategory"
import { CategoryRoutesEnum } from "../routes"

const CategoryInsert = () => {

    const { name, loading, handleOnChangeName, insertCategory, disabledButton } = useInsertCategory()
    const navigate = useNavigate()

    const handleOnClickCancel = () => {
        navigate(CategoryRoutesEnum.CATEGORY)
    }

    return (
        <Screen listBreadcrumb={[
            {
                name: 'HOME',
            },
            {
                name: 'CATEGORIAS',
                navigateTo: CategoryRoutesEnum.CATEGORY
            },
            {
                name: 'INSERIR CATEGORIA',
            },
        ]}>
            <DisplayFlexJustifyCenter>
                <LimitedContainer width={400}>
                    <Input onChange={handleOnChangeName} value={name} margin="0px 0px 16px 0" title="Nome" placeholder="Nome" />
                    <DisplayFlexJustifyRight>
                        <LimitedContainer margin="0px 8px" width={120}>
                            <Button onClick={handleOnClickCancel} danger >Cancelar</Button>
                        </LimitedContainer>
                        <LimitedContainer width={160}>
                            <Button disabled={disabledButton} loading={loading} onClick={insertCategory} type="primary">Inserir Categoria</Button>
                        </LimitedContainer>
                    </DisplayFlexJustifyRight>
                </LimitedContainer>
            </DisplayFlexJustifyCenter>
        </Screen>
    )
}

export default CategoryInsert