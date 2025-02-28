//TYPESCRIPT BASICS

let variable = "hello"; //initial value string
variable = 345; //error

let age = 18;
age = "eighteen"; //error
age = 10; // no error

let ageWithType: number; //declared with type without initial value
let ageWitType2: number = 22; //with initial value
agwWithType: 99;

let testStringOrNumber: string | number; //OR
testStringOrNumber = []; // //error

let testString: string;
testString = "hi there";

let testBoolean: boolean;
testBoolean = 22; //error

//ARRAY
let names = ["John", "Jane", "Tom"];
names[0] = 232;
names.push(true);
names.push("bla");

let testStringArray: string[];
testStringArray = [21, "dasdjka"];

let testStringArray2: string[] = ["dasj", 34];

//NUMBERS
let testNumbersArray: number[] = [21312, "dasdsadsa"]; // initial value

//String or number
let testStringOrNumberArray: (string | number)[] = [12, "sajhd", true, null];

//OBJECTS - no need to defined type for objects, TS understands this
let user = {
  name: "something",
  age: 22,
  isAdmin: true,
};

user.name = "bla bla";
user.name = 213; //error
user.isAdmin = "test"; //error

//can't add property like js, have to define type first
user.phone = "+880123421";

//OBJECT with types definition
let userObj: {
  name: string;
  age: number;
  isAdmin: boolean;
};

//error : isAdmin is missing
userObj = {
  name: "John",
  age: 22,
};

//some of the users have phone and some don't ?
let userObj2: {
  name: string;
  age: number;
  isAdmin: boolean;
  phone?: string; //optional property
};

userObj2 = {
  name: "John",
  age: 22,
  isAdmin: true,
  phone: "+02381283", //
};
userObj2 = {
  name: "John",
  age: 22,
  isAdmin: true,
};

//ANY type | avoid using
let testAny; // equals to => let testAny : any;

testAny = "sadsa";
testAny = 22;
testAny = null;
testAny = [true];
testAny = {};

//any ARRAY
let testAnyArray: any[];

//FUNCTIONS | determined automatically like objects
let sayHi = () => {
  //return type = void initially => returns nothing
  console.log("Say hi to the user");
};
sayHi = "asdjas"; //error

let functionReturnString = (): string => {
  //return type = string
  return "Hello";
};

//TS is smart enough to determine what the function returns | hover name
let functionNumber = (num: number) => {
  // parameter type number
  return num * 2;
};

//defining return type
let functionNumber2 = (num: number): number => {
  return num * 2;
};

//don't return anything
let functionVoid = (num: number): void => {
  console.log(num * 2);
};

let functionVoid = (num: number): void => {
  return 100; //error cause we're returning
};

//optional
let sum = (num1: number, num2: number, another?: number): number => {
  return num1 + num2;
};
sum(2, 3); //5

//object parameter | but this is too long & ugly
let userDetails = (user: { name: string; age: number; number?: string }) => {
  console.log(user.name);
};

//shorten using TYPE ALIASES | extracted
type UserType = {
  name: string;
  age: number;
  phone?: string;
};

let betterFunc = (user: UserType) => {
  console.log(user.name);
};

//function signature    | any function inheriting this type should return void
type myFunc = (a: number, b: string) => void;

//write's type will be myFunc  |  function declaration
let write: myFunc = (num, str) => {
  console.log(num + "times" + str);
};

//giving options to object property
type UserType2 = {
  name: string;
  age: number;
  phone?: string;
  theme: "dark" | "light" | 21;
};

const userWithThem: UserType2 = {
  name: "John",
  age: 22,
  theme: 21,
};

//INTERFACES | used to define object types with extends feature, multiple samename interfaces are allowed
//they Are merged automatically, which we can't do with "type"
interface IUser {
  username: string;
  email: string;
  age: number;
}

interface IEmployee extends IUser {
  employeeId: number;
}

//object with interface
const emp: IEmployee = {
  username: "John",
  email: "samiul@gmail.com",
  age: 22,
  employeeId: 12345,
};

const client: IUser = {
  username: "Jane",
  email: "samiul@gmail.com",
  age: 23,
  // employeeId - error
};

//GENERICS

interface IAuthor {
  id: number;
  username: string;
}

interface ICategory {
  id: number;
  name: string;
}

//array of Author or Category to retrieve when fetched
interface IPost {
  id: number;
  title: string;
  desc: string;
  extra: IAuthor[] | ICategory[];
}

const myPost: IPost = {
  id: 1,
  title: "Hello",
  desc: "World",
  extra: [
    { id: 1, username: "John" },
    { id: 2, name: "asdsad" }, //only one type allowed, first value IAuthor is precedence
  ],
};

//but suppose we don't know what type of fields I'm gona need inside extra in future
//I can not come back and define enterface again and again
//soluting : taking type ,<T> as a parameter and using it, T = anytype, whatever I pass (sting, number , interface)
interface IPostBetter<T> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}
//passed the parameter type "string"
const testMe: IPostBetter<String> = {
  id: 1,
  title: "Hello",
  desc: "World",
  extra: ["John", "Jane"],
};

//adding limitation | now I can not give any other type except array
//mist give array of object/objects
interface IPostEvenBetter<T extends object> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}
// const testMe2 : IPostEvenBetter<String> //error
const testMe2 : IPostEvenBetter<{id : number, username : string}> = {
  id: 11;
  title: "Hello",
  desc:   "World World",
  extra: [{id : 1, username : "John"}, {id : 2, username : "Jane"}]
}

//used interface | we can also use ALIAS (type something = {...})
const testMe3 : IPostEvenBetter<ICategory> = {
  id: 13,
  title: "Hello",
  desc:   "World World",
  extra: [{
      id : 1,
      name : "John", 
      age : 22    //errro - not in ICategory
    }]
}