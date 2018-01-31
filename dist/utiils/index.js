"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertComponentNameToComponentClassName(componentName = '') {
    return componentName
        .split('-')
        .map(w => {
        return w.charAt(0).toUpperCase() + w.slice(1);
    })
        .join('');
}
exports.convertComponentNameToComponentClassName = convertComponentNameToComponentClassName;
//# sourceMappingURL=index.js.map