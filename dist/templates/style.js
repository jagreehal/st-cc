"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStyleContent({ componentName, isShadow = false }) {
    return `${isShadow ? ':host' : componentName} {
  display: block; /* by default, custom elements are display: inline */
}
`;
}
exports.createStyleContent = createStyleContent;
//# sourceMappingURL=style.js.map