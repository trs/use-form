"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubmit = void 0;
function useSubmit(control, handle) {
    control.registerEvent('onSubmit', handle);
    return () => {
        control.unregisterEvent('onChange', handle);
    };
}
exports.useSubmit = useSubmit;
