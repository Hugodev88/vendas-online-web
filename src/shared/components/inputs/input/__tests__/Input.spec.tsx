import { render, screen } from "@testing-library/react"
import Input from "../input"
import { InputTextIdEnum } from "../enum/InputTestIdEnum"

const TEST_ID = 'TEST_ID'
const TITLE_MOCK = 'TITLE_MOCK'
const MARGIN_MOCK = '23px'

describe('Test Input', () => {

    beforeEach(() => {
        render(<Input data-testid={TEST_ID} margin={MARGIN_MOCK} />)
    });

    it('should render', () => {
        expect(screen.getByTestId(TEST_ID)).toBeDefined()
        expect(screen.getByTestId(InputTextIdEnum.BOX_INPUT)).toBeDefined()
    })
    it('should render with margin', () => {
        expect(screen.getByTestId(InputTextIdEnum.BOX_INPUT).getAttribute('style')).toBe(`margin: ${MARGIN_MOCK};`);
    })
    it('should hide title in title undefined', () => {
        const element = screen.queryAllByTestId(InputTextIdEnum.INPUT_TITLE)
        expect(element.length).toEqual(0)
    })
    it('should render title', () => {
        const { queryAllByTestId } = render(<Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN_MOCK} />)
        const element = queryAllByTestId(InputTextIdEnum.INPUT_TITLE)
        expect(element.length).toEqual(1)
    })
    it('should render title', () => {
        const { getByText } = render(<Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN_MOCK} />)
        const element = getByText(TITLE_MOCK)
        expect(element).toBeDefined()
    })

})