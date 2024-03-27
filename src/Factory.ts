import ObjectManager from "@razaman2/object-manager";

export default abstract class Factory {
    protected search: string | number = "";

    public constructor(protected parent: string | number = "") {}

    protected instances: {[key: string]: object} = {
        ...this.getParentInstances(),
        default: this.getDefaultInstances(),
    };

    public find(name = this.search) {
        this.search = name;
        const searches = this.getSearches();

        while (searches.length) {
            const registration = ObjectManager.on(this.instances).get(searches.pop()!);

            if (this.validate(registration, searches)) {
                const instance = this.getRegistration(registration);

                if (instance) {
                    return instance;
                }
            } else if (registration) {
                return registration;
            }
        }

        return this.getDefaultInstance();
    }

    protected validate(object: any, ...rest: Array<any>) {
        return Factory.isObject(object);
    }

    protected getRegistration(registration: any) {
        return registration[`${this.search}`.toLowerCase()];
    }

    /**
     * instantiate instance with provided arguments
     */
    protected with(...args: Array<any>) {
        const [instance, ...rest] = args;

        return new instance(...rest);
    }

    protected getSearches() {
        return ["default", this.parent];
    }

    /**
     * instantiate and return resolved instance
     */
    public instantiate(name?: string | number) {
        const instance = this.find(name);

        return {with: this.with.bind(this, instance)};
    }

    /**
     * object of application default instances
     */
    protected getDefaultInstances(): any {}

    /**
     * object of parent specific instances
     */
    protected getParentInstances(): any {}

    /**
     * default instance to return when a requested instance was not found
     * you can also throw an error here
     */
    protected abstract getDefaultInstance(): any

    public static isObject(object: any) {
        try {
            return object.constructor.name === "Object";
        } catch {
            return false;
        }
    }
}
