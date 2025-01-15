import 'fast-text-encoding';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { URL_AUTH } from "../../../constants/urls";
import ConnectionAPI, { connectionAPIDelete, connectionAPIGet, connectionAPIPatch, connectionAPIPost, connectionAPIPut } from "../connectionAPI";
import { MethodsEnum } from '../../../enums/methods.enum';
import { ERROR_ACESS_DANIED, ERROR_CONECTION } from '../../../constants/errosStatus';

const mockAxios = new MockAdapter(axios)
const RETURN_VALUE = "RETURN_VALUE"
const MOCK_TOKEN = "MOCK_TOKEN"
const MOCK_BODY = {
    name: 'MOCK_BODY'
}

jest.mock('../auth', () => ({
    getAuthorizationToken: () => MOCK_TOKEN
}))

describe('connectionApi', () => {

    describe('connectionAPIGet', () => {
        it('should success get', async () => {
            const spyAxios = jest.spyOn(axios, 'get')
            mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE)

            const returnGet = await connectionAPIGet(URL_AUTH)
            expect(returnGet).toEqual(RETURN_VALUE)

            expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH)
        });
    });
    describe('connectionAPIDelete', () => {
        it('should success delete', async () => {
            const spyAxios = jest.spyOn(axios, 'delete')
            mockAxios.onDelete(URL_AUTH).reply(200, RETURN_VALUE)
            const returnGet = await connectionAPIDelete(URL_AUTH)
            expect(returnGet).toEqual(RETURN_VALUE)
            expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH)
        });
    });
    describe('connectionAPIPost', () => {
        it('should success post', async () => {
            const spyAxios = jest.spyOn(axios, 'post')
            mockAxios.onPost(URL_AUTH).reply(200, RETURN_VALUE)
            const returnGet = await connectionAPIPost(URL_AUTH, MOCK_BODY)
            expect(returnGet).toEqual(RETURN_VALUE)
            expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH)
            expect(spyAxios.mock.calls[0][1]).toEqual(MOCK_BODY)
        });
    });
    describe('connectionAPIPut', () => {
        it('should success put', async () => {
            const spyAxios = jest.spyOn(axios, 'put')
            mockAxios.onPut(URL_AUTH).reply(200, RETURN_VALUE)
            const returnGet = await connectionAPIPut(URL_AUTH, MOCK_BODY)
            expect(returnGet).toEqual(RETURN_VALUE)
            expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH)
            expect(spyAxios.mock.calls[0][1]).toEqual(MOCK_BODY)
        });
    });
    describe('connectionAPIPatch', () => {
        it('should success patch', async () => {
            const spyAxios = jest.spyOn(axios, 'patch')
            mockAxios.onPatch(URL_AUTH).reply(200, RETURN_VALUE)
            const returnGet = await connectionAPIPatch(URL_AUTH, MOCK_BODY)
            expect(returnGet).toEqual(RETURN_VALUE)
            expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH)
            expect(spyAxios.mock.calls[0][1]).toEqual(MOCK_BODY)
        });
    });

    describe('test connect', () => {
        it('should return success', async () => {
            mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE)
            const returnGet = await ConnectionAPI.connect(URL_AUTH, MethodsEnum.GET)

            expect(returnGet).toEqual(RETURN_VALUE)
        });
        it('should return error 401', async () => {
            mockAxios.onGet(URL_AUTH).reply(401)
            expect(ConnectionAPI.connect(URL_AUTH, MethodsEnum.GET)).rejects.toThrowError(Error(ERROR_ACESS_DANIED));
        });
        it('should return error 401', async () => {
            mockAxios.onGet(URL_AUTH).reply(403)
            expect(ConnectionAPI.connect(URL_AUTH, MethodsEnum.GET)).rejects.toThrowError(Error(ERROR_ACESS_DANIED));
        });
        it('should return error 400', async () => {
            mockAxios.onGet(URL_AUTH).reply(400)
            expect(ConnectionAPI.connect(URL_AUTH, MethodsEnum.GET)).rejects.toThrowError(Error(ERROR_CONECTION));
        });
    });

    describe('test call', () => {
        it('should header send authorization', async () => {
            const spyAxios = jest.spyOn(axios, 'get')
            mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE)
            await ConnectionAPI.call(URL_AUTH, MethodsEnum.GET)
            expect(spyAxios.mock.calls[0][1]?.headers?.Authorization).toEqual(MOCK_TOKEN)
            expect(spyAxios.mock.calls[0][1]?.headers?.['Content-Type']).toEqual('application/json')
        });
    });

});