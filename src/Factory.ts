import ObjectManager
    from "@razaman2/object-manager";

export default abstract class Factory {
    public constructor(protected parent = '') {
    }

    protected instances: { [key: string]: object } = {
        ...this.getParentInstances(),
        default: this.getDefaultInstances()
    };

    public find(name = '') {
        const searches = this.getSearches();

        while (searches.length) {
            const registration = ObjectManager.on(this.instances).get(`${searches.pop()}`);

            if (Factory.isObject(registration)) {
                const instance = registration[`${name}`.toLowerCase()];

                if (instance) {
                    return instance;
                }

            } else if (registration) {
                return registration;
            }
        }

        return this.getDefaultInstance();
    }

    /**
     * instantiate instance with provided arguments
     */
    protected with(...args: any) {
        const [instance, ...options] = args;

        return options ? new instance(...options) : new instance();
    }

    protected getSearches() {
        return ['default', this.parent];
    }

    /**
     * instantiate and return resolved instance
     */
    public instantiate(name = '') {
        const instance = this.find(name);

        return {with: this.with.bind(this, instance)};
    }

    /**
     * object of application default instances
     */
    protected getDefaultInstances(): object {
        return {};
    }

    /**
     * object of parent specific instances
     */
    protected getParentInstances(): object {
        return {};
    }

    /**
     * default instance to return when a requested instance
     * was not found
     */
    protected abstract getDefaultInstance(): object;

    private static isObject(object: any) {
        return ((object !== null) && (typeof object === "object"));
    }
}
