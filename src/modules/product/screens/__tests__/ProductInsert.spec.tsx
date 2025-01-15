import { fireEvent, render } from "@testing-library/react"
import ProductInsert from "../ProductInsert"
import { ProductInsertTestIdEnum } from "../enum/ProductInsertTestIdEnum"
import { mockProductInsert } from "../../__mocks__/productInsert.mock"
import '@testing-library/jest-dom';


const mockNavigate = jest.fn()
let value = '';
let type = '';
const mockButtonInsert = jest.fn()

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}))

jest.mock('../../../category/hooks/useCategory', () => ({
    useCategory: () => ({
        categories: []
    })
}))

jest.mock('../../hooks/useInsertProduct', () => ({
    useInsertProduct: () => ({
        product: mockProductInsert,
        loading: false,
        disabledButton: false,
        onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, x: string) => {
            value = e.target.value;
            type = x;
        },
        handleInsertProduct: mockButtonInsert,
        handleChangeSelect: jest.fn()
    })
}))

describe('Test Header', () => {

    it('should render', () => {
        const { getByTestId } = render(<ProductInsert />)
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL)).toBeDefined()
        expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT)).toBeDefined()
    })
    it('should call onChangeInput on change name', () => {
        const { getByTestId } = render(<ProductInsert />)
        const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME)
        fireEvent.change(input, { target: { value: '23' } })
        expect(value).toEqual('23')
        expect(type).toEqual('name')
    })

    it('should call onChangeInput on change price', () => {
        const { getByTestId } = render(<ProductInsert />)
        const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE)
        fireEvent.change(input, { target: { value: mockProductInsert.price } })
        expect(value).toEqual('1.00')
        expect(type).toEqual('price')
    })

    it('should call onChangeInput on change image', () => {
        const { getByTestId } = render(<ProductInsert />)
        const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE)
        fireEvent.change(input, { target: { value: 'mockProductInsert.image' } })
        expect(value).toEqual('mockProductInsert.image')
        expect(type).toEqual('image')
    })
    it('should call handleInsertProduct in click insertButton', () => {
        const { getByTestId } = render(<ProductInsert />)
        const button = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT)
        fireEvent.click(button)
        expect(mockButtonInsert).toBeCalled()
    })
    it('should call navigate in click cancelButton', () => {
        const { getByTestId } = render(<ProductInsert />)
        const button = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL)
        fireEvent.click(button)
        expect(mockNavigate).toBeCalled()
    })

})