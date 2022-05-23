import ObjectManager
    from "@razaman2/object-manager";

export default abstract class Factory {
    protected parent = "";
    protected search = "";
    
    public constructor(parent = "") {
        this.parent = parent;
    }
    
    protected instances: { [key: string]: object } = {
        ...this.getParentInstances(),
        default: this.getDefaultInstances(),
    };
    
    public find(name = this.search) {
        this.search = name;
        const searches = this.getSearches();
        
        while (searches.length) {
            const registration = ObjectManager.on(this.instances).get(searches.pop());
            
            if (this.validate(registration)) {
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
    
    protected validate(object: any) {
        return Factory.isObject(object);
    }
    
    protected getRegistration(registration: any) {
        return registration[this.search.toLowerCase()];
    }
    
    /**
     * instantiate instance with provided arguments
     */
    protected with(...args: any) {
        const [instance, ...options] = args;
        
        return options ? new instance(...options) : new instance();
    }
    
    protected getSearches() {
        return ["default", this.parent];
    }
    
    /**
     * instantiate and return resolved instance
     */
    public instantiate(name = "") {
        const instance = this.find(name);
        
        return {with: this.with.bind(this, instance)};
    }
    
    /**
     * object of application default instances
     */
    protected getDefaultInstances(): any {
    }
    
    /**
     * object of parent specific instances
     */
    protected getParentInstances(): any {
    }
    
    /**
     * default instance to return when a requested instance
     * was not found
     */
    protected abstract getDefaultInstance(): object;
    
    public static isObject(object: any) {
        return ((object !== null) && (typeof object === "object"));
    }
}
