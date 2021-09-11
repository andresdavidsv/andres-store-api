const myName = 'Andres';
const myAge = 12;

const variables = (name: string, age: number) => {
  return `Soy ${name}, y tengo ${age}`;
};
variables(myName, myAge);

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 12);

class Persona {
  private age;
  private name;

  constructor(age: number, name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my names is ${this.name}, ${this.age}`;
  }
}

const andres = new Persona(15, 'Andres');
andres.getSummary();
