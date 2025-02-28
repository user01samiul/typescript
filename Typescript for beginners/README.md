# TypeScript Basics - Simplified Notes

## Variables & Types
- TypeScript automatically infers types from initial values.
- Once a type is assigned, it cannot be changed.

```typescript
let variable = "hello"; // Type: string
variable = 345; // Error: Type mismatch
```

### Explicit Type Declaration
- You can declare variables with types explicitly.

```typescript
let ageWithType: number; // Declared without initial value
let ageWitType2: number = 22; // Declared with initial value
agwWithType = 99;
```

### Union Types (OR Operator)
- A variable can have multiple allowed types.

```typescript
let testStringOrNumber: string | number;
testStringOrNumber = []; // Error: Not a string or number
```

### Boolean Type
```typescript
let testBoolean: boolean;
testBoolean = 22; // Error: Not a boolean
```

## Arrays
- TypeScript enforces type consistency in arrays.

```typescript
let names = ["John", "Jane", "Tom"];
names[0] = 232; // Error
names.push(true); // Error
names.push("bla"); // No Error
```

- Explicitly defining an array type:

```typescript
let testStringArray: string[];
testStringArray = [21, "dasdjka"]; // Error: Contains a number
```

- Mixed-type array using union:

```typescript
let testStringOrNumberArray: (string | number)[] = [12, "text", true, null]; // Error: Boolean & null not allowed
```

## Objects
- TypeScript infers object types automatically.

```typescript
let user = {
  name: "something",
  age: 22,
  isAdmin: true,
};

user.name = "bla bla"; // No error
user.name = 213; // Error: Expected a string
user.isAdmin = "test"; // Error: Expected a boolean
```

- You cannot add properties dynamically like JS:

```typescript
user.phone = "+880123421"; // Error
```

### Object Type Definition
- Define object structure explicitly:

```typescript
let userObj: {
  name: string;
  age: number;
  isAdmin: boolean;
};
```

- Optional properties:

```typescript
let userObj2: {
  name: string;
  age: number;
  isAdmin: boolean;
  phone?: string; // Optional
};
```

## Any Type (Avoid If Possible)
- `any` allows assigning any type of value, but it removes type safety.

```typescript
let testAny: any;
testAny = "string";
testAny = 22;
testAny = null;
testAny = [true];
testAny = {};
```

## Functions
- TypeScript can infer return types, but you can also define them explicitly.

```typescript
let sayHi = () => {
  console.log("Say hi to the user");
};
sayHi = "hello"; // Error
```

- Function returning a specific type:

```typescript
let functionReturnString = (): string => {
  return "Hello";
};
```

- Function with explicit return type:

```typescript
let functionNumber2 = (num: number): number => {
  return num * 2;
};
```

- Function that does not return anything:

```typescript
let functionVoid = (num: number): void => {
  console.log(num * 2);
};
```

- Optional Parameters:

```typescript
let sum = (num1: number, num2: number, another?: number): number => {
  return num1 + num2;
};
```

## Type Aliases
- Simplify object types with `type`:

```typescript
type UserType = {
  name: string;
  age: number;
  phone?: string;
};
```

- Using alias in functions:

```typescript
let betterFunc = (user: UserType) => {
  console.log(user.name);
};
```

- Function Signature:

```typescript
type myFunc = (a: number, b: string) => void;
let write: myFunc = (num, str) => {
  console.log(num + " times " + str);
};
```

- **Alias for Object Example:**

```typescript
type Car = {
  brand: string;
  model: string;
  year: number;
};

let myCar: Car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};
```

## Interfaces
- Used for defining object structures with extensibility.

```typescript
interface IUser {
  username: string;
  email: string;
  age: number;
}

interface IEmployee extends IUser {
  employeeId: number;
}
```

- Implementing an interface:

```typescript
const emp: IEmployee = {
  username: "John",
  email: "samiul@gmail.com",
  age: 22,
  employeeId: 12345,
};
```

## Generics
- Allow dynamic typing.

```typescript
interface IPost<T> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}
```

- Example usage:

```typescript
const testMe: IPost<string> = {
  id: 1,
  title: "Hello",
  desc: "World",
  extra: ["John", "Jane"],
};
```

- Restricting Generics to Objects:

```typescript
interface IPostEvenBetter<T extends object> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}
```

- Example with Object Type:

```typescript
const testMe2: IPostEvenBetter<{ id: number; username: string }> = {
  id: 11,
  title: "Hello",
  desc: "World",
  extra: [{ id: 1, username: "John" }, { id: 2, username: "Jane" }],
};
```

### Alternative Using Interface

```typescript
const testMe3: IPostEvenBetter<ICategory> = {
  id: 13,
  title: "Hello",
  desc: "World",
  extra: [{ id: 1, name: "John" }],
};
```

### Alternative Using Alias

```typescript
type PostAlias<T> = {
  id: number;
  title: string;
  desc: string;
  extra: T[];
};

const testMe4: PostAlias<{ id: number; name: string }> = {
  id: 14,
  title: "Hello Alias",
  desc: "TypeScript Notes",
  extra: [{ id: 1, name: "John" }],
};
```

---
### End of Notes
These notes provide a structured overview of TypeScript fundamentals while ensuring adherence to type safety principles.
