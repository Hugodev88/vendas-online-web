import { Spin, Table } from "antd"
import Screen from "../../../shared/components/screen/Screen"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { UserType } from "../../login/types/UserType"
import { ColumnsType } from "antd/es/table"
import { insertMaskInPhone } from "../../../shared/functions/phone"
import { insertMaskInCpf } from "../../../shared/functions/cpf"
import { DisplayFlexJustifyBetween, DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import Search from "antd/es/input/Search"
import Button from "../../../shared/components/buttons/button/button"
import { getUserInfoByToken } from "../../../shared/functions/connection/auth"
import { useMemo } from "react"
import { UserTypeEnum } from "../../../shared/enums/user-type.enum"

const columns: ColumnsType<UserType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Telefone',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => <a>{insertMaskInPhone(text)}</a>
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
        render: (text) => <a>{insertMaskInCpf(text)}</a>
    },

]

const listBreadcrumb = [
    {
        name: 'HOME',
    },
    {
        name: 'CLIENTES',
    },
]

const Customer = () => {
    const { users, loading, handleOnChangeSearch } = useUser()
    const navigate = useNavigate()
    const userToken = useMemo(() => getUserInfoByToken(), [])

    return (

        <Screen listBreadcrumb={listBreadcrumb}>
            {!users || loading ? (<DisplayFlexJustifyCenter><Spin size="large" /></DisplayFlexJustifyCenter>) :
                <>
                    <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
                        <LimitedContainer width={240}>
                            <Search placeholder="Buscar cliente" onSearch={handleOnChangeSearch} enterButton />
                        </LimitedContainer>
                        <LimitedContainer width={180}>
                            {userToken?.typeUser === UserTypeEnum.Root && (
                                <Button type="primary" onClick={() => null}>Inserir Admin</Button>
                            )}
                        </LimitedContainer>
                    </DisplayFlexJustifyBetween>
                    <Table onRow={() => ({
                        onClick: () => navigate('')
                    })} columns={columns} dataSource={users} />
                </>}
        </Screen>
    )
}

export default Customer