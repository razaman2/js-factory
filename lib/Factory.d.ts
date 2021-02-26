export default abstract class Factory {
    protected parent: string;
    constructor(parent?: string);
    protected instances: {
        [key: string]: object;
    };
    find(name?: string): any;
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
    protected getDefaultInstances(): object;
    /**
     * object of parent specific instances
     */
    protected getParentInstances(): object;
    /**
     * default instance to return when a requested instance
     * was not found
     */
    protected abstract getDefaultInstance(): object;
    private static isObject;
}
//# sourceMappingURL=Factory.d.ts.map