export default abstract class Factory {
    protected parent: string;
    protected search: string;
    constructor(parent?: string);
    protected instances: {
        [key: string]: object;
    };
    find(name?: string): any;
    protected validate(object: any): boolean;
    protected getRegistration(registration: any): any;
    /**
     * instantiate instance with provided arguments
     */
    protected with(...args: any): any;
    protected getSearches(): string[];
    /**
     * instantiate and return resolved instance
     */
    instantiate(name?: string): {
        with: (...args: any[]) => any;
    };
    /**
     * object of application default instances
     */
    protected getDefaultInstances(): any;
    /**
     * object of parent specific instances
     */
    protected getParentInstances(): any;
    /**
     * default instance to return when a requested instance
     * was not found
     */
    protected abstract getDefaultInstance(): object;
    static isObject(object: any): boolean;
}
//# sourceMappingURL=Factory.d.ts.map