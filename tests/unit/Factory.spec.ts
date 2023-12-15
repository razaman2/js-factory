import FactoryPattern from "../../src";
import {describe, it, expect} from "vitest";

class Factory extends FactoryPattern {
    protected getDefaultInstance(): object {
        return Test1;
    }

    protected getParentInstances(): object {
        return {
            parent1: Parent1,
            parent2: {
                name: Parent2Name,
                age: Parent2Age,
            },
            1: {
                1: "parent-one",
            },
        };
    }

    protected getDefaultInstances(): object {
        return {
            name: DefaultName,
            age: DefaultAge,
            1: "one",
        };
    }
}

class Test1 {
    constructor(name: string, age: number) {
        this.name = name ?? "default";
        this.age = age ?? 10;
    }

    name: string;
    age: number;
}

class Parent1 {
    name = "parent1";
}

class Parent2Name {
    name = "parent2-name";
}

class Parent2Age {
    age = "parent2-age";
}

class DefaultName {
    name = "default-name";
}

class DefaultAge {
    age = "default-age";
}

describe("Factory Tests", () => {
    it("should find registered default value", () => {
        const instance = new Factory().find();

        expect(new instance().name).toBe("default");
    });

    it("should instantiate registered default value", () => {
        const instance = new Factory().instantiate();

        expect(instance.with().name).toBe("default");
    });

    it("should return default value when trying to find unregistered parent value", () => {
        const instance = new Factory("unregisteredParent").find();

        expect(new instance().name).toBe("default");
    });

    it("should instantiate with constructor params", () => {
        const instance = new Factory().instantiate();

        const object = instance.with("john", 10);

        expect(object.name).toBe("john");
        expect(object.age).toBe(10);
    });

    it("should return an object that can be instantiated with params", () => {
        const instance = new Factory().find();

        const object = new instance("jane", 20);

        expect(object.name).toBe("jane");
        expect(object.age).toBe(20);
    });

    it("should find registered parent instances", () => {
        const instance = new Factory("parent1").find();

        expect(new instance().name).toBe("parent1");
    });

    it("should be able to find the registered instance for a parent", () => {
        const instance1 = new Factory("parent2").find("name");
        const instance2 = new Factory("parent2").find("age");

        expect(new instance1().name).toBe("parent2-name");
        expect(new instance2().age).toBe("parent2-age");
    });

    it("should be able to find default registered instance", () => {
        const instance1 = new Factory().find("name");
        const instance2 = new Factory().find("age");

        expect(new instance1().name).toBe("default-name");
        expect(new instance2().age).toBe("default-age");
    });

    it("should search by numbers", () => {
        expect(new Factory().find(1)).toBe("one");
        expect(new Factory(1).find(1)).toBe("parent-one");
    });
});
