import { render, screen } from "@testing-library/react"
import Button from "../button"

const TEXT_MOCK = 'TEXT_MOCK'
const TEST_ID = 'TEST_ID'
const MARGIN_MOCK = '23px'

describe('Test Button', () => {

    beforeEach(() => {
        render(<Button data-testid={TEST_ID} margin={MARGIN_MOCK}>{TEXT_MOCK}</Button>)
    });

    it('should render', () => {
        expect(screen.getByText(TEXT_MOCK)).toBeDefined()
    })
    it('should render with margin', () => {
        expect(screen.getByTestId(TEST_ID).getAttribute('style')).toBe(`margin: ${MARGIN_MOCK};`);
    })

})