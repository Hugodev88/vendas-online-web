import { render } from "@testing-library/react"
import Button from "../button"

describe('Test Button', () => {
    it('teste render', () => {
        render(<Button />)
        expect(1).toBe(1)
    })
})