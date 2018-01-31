"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('When using utils file', () => {
    it('Should be able to convert component name', () => {
        expect(index_1.convertComponentNameToComponentClassName('my-app')).toBe('MyApp');
    });
});
//# sourceMappingURL=utils.spec.js.map