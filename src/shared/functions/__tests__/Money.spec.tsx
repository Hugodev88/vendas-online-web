import { convertNumberToMoney } from "../money"

describe('money', () => {
    it("should return cents", () => {
        const returnValue = convertNumberToMoney(123.45)
        expect(returnValue).toContain("R$")
        expect(returnValue).toContain("123,45")
    })
    it("should return integer", () => {
        const returnValue = convertNumberToMoney(123)
        expect(returnValue).toContain("R$")
        expect(returnValue).toContain("123,00")
    })
    it("should return thousand", () => {
        const returnValue = convertNumberToMoney(1234.44)
        expect(returnValue).toContain("R$")
        expect(returnValue).toContain("1.234,44")
    })
})