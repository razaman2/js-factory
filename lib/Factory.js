"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_manager_1 = __importDefault(require("@razaman2/object-manager"));
class Factory {
    constructor(parent = '') {
        this.parent = parent;
        this.instances = Object.assign(Object.assign({}, this.getParentInstances()), { default: this.getDefaultInstances() });
    }
    find(name = '') {
        const searches = this.getSearches();
        while (searches.length) {
            const registration = object_manager_1.default.on(this.instances).get(`${searches.pop()}`);
            if (Factory.isObject(registration)) {
                const instance = registration[`${name}`.toLowerCase()];
                if (instance) {
                    return instance;
                }
            }
            else if (registration) {
                return registration;
            }
        }
        return this.getDefaultInstance();
    }
    /**
     * instantiate instance with provided arguments
     */
    with(...args) {
        const [instance, ...options] = args;
        return options ? new instance(...options) : new instance();
    }
    getSearches() {
        return ['default', this.parent];
    }
    /**
     * instantiate and return resolved instance
     */
    instantiate(name = '') {
        const instance = this.find(name);
        return { with: this.with.bind(this, instance) };
    }
    /**
     * object of application default instances
     */
    getDefaultInstances() {
        return {};
    }
    /**
     * object of parent specific instances
     */
    getParentInstances() {
        return {};
    }
    static isObject(object) {
        return ((object !== null) && (typeof object === "object"));
    }
}
exports.default = Factory;
//# sourceMappingURL=Factory.js.map