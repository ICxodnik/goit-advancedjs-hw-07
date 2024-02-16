class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }
  public getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}
  public getKey() {
    return this.key;
  }
}

abstract class House {
  protected isClosed: boolean = true; ///rename door
  protected tenants: Array<Person> = [];

  constructor(protected key: Key) {}

  public abstract openDoor(key: Key): void;
  public abstract closeDoor(key: Key): void;
  public isDoorClosed(): boolean {
    return this.isClosed;
  }

  public comeIn(person: Person): void {
    if (this.isDoorClosed()) {
      throw new Error("person can't come in");
    }
    if (this.tenants.includes(person)) {
      throw new Error("person is already a tenant");
    }
    this.tenants.push(person);
  }

  public comeOut(person: Person): void {
    if (this.isDoorClosed()) {
      throw new Error("person can't come out");
    }
    if (!this.tenants.includes(person)) {
      throw new Error("person isn't a tenant");
    }
    this.tenants = this.tenants.filter((x) => x !== person);
  }
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  public openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.isClosed = false;
    }
  }

  public closeDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.isClosed = true;
    }
  }
}

const key = new Key();
const key2 = new Key();

const house = new MyHouse(key);
const person = new Person(key);
const person2 = new Person(key2);

house.openDoor(person.getKey());
house.comeIn(person);
house.comeIn(person2);
house.comeOut(person2);
house.comeOut(person);
house.closeDoor(person.getKey());

export {};
