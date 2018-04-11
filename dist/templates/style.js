"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStyleContent({ componentName, isShadow = false }) {
    return `${isShadow ? ':host' : componentName} {}`;
}
exports.createStyleContent = createStyleContent;
//# sourceMappingURL=style.js.map