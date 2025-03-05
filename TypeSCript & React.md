### Updated Simplified Notes: React with TypeScript

#### 1. **PostCard Component**
   - **Purpose**: Displays a post with a title and description.
   - **Code**:
     ```typescript
     const PostCard = (props: { title: string; desc: string }) => {
         return (
             <div className="postCard">
                 <h1>{props.title}</h1>
                 <p>{props.desc}</p>
             </div>
         );
     };
     ```

#### 2. **PostList Component (Initial Attempt)**
   - **Purpose**: Fetches data and maps over it to render `PostCard` components.
   - **Code**:
     ```typescript
     const PostList = async () => {
         const data = await getData();
         return (
             <div className="postList">
                 {data.map((post: PostProps) => (
                     <PostCard key={post.id} {...post} />
                 ))}
             </div>
         );
     };
     ```

#### 3. **PostList Component (Corrected)**
   - **Purpose**: Corrects the syntax and ensures proper mapping over data.
   - **Code**:
     ```typescript
     const PostList = async () => {
         const data: PostProps[] = await getData();
         return (
             <div className="postList">
                 {data.map((post) => (
                     <PostCard key={post.id} {...post} />
                 ))}
             </div>
         );
     };
     ```

#### 4. **PostCard Component (Using Destructuring)**
   - **Purpose**: Uses destructuring to directly access `title` and `body` from `PostProps`.
   - **Code**:
     ```typescript
     const PostCard = ({ title, body }: PostProps) => {
         return (
             <div className="postCard">
                 <h1>{title}</h1>
                 <p>{body}</p>
             </div>
         );
     };
     ```

#### 5. **Parent and Children Components**
   - **Purpose**: Demonstrates how to pass and render children components.
   - **Parent Component**:
     ```typescript
     const Parent = ({ children }: { children: React.ReactNode }) => {
         return (
             <div>
                 <h1>This is the parent</h1>
                 {children}
             </div>
         );
     };
     ```
   - **ChildrenPropExample**:
     ```typescript
     const ChildrenPropExample = () => {
         return (
             <div>
                 <Parent>
                     <Child />
                 </Parent>
             </div>
         );
     };
     ```

#### 6. **Event Handling**
   - **Purpose**: Shows how to handle events like clicks and input changes.
   - **handleClick**:
     ```typescript
     const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.preventDefault();
         console.log("Button clicked");
     };
     ```
   - **handleChange**:
     ```typescript
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         console.log(e.target.value);
     };
     ```
   - **Passing Arguments to Event Handlers**:
     ```typescript
     <button onClick={(e) => handleDelete(e, 1)}>Delete</button>
     ```

#### 7. **useState Example**
   - **Purpose**: Demonstrates the use of `useState` to manage component state.
   - **Code**:
     ```typescript
     const UseStateExample = () => {
         const [username, setUsername] = useState("");
         const [user, setUser] = useState<UserType | null>(null);

         const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
             setUsername(e.target.value);
         };

         const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
             e.preventDefault();
             setUser({
                 name: username,
                 sessionId: Math.random(),
             });
         };

         return (
             <div className="useStateExample">
                 <input type="text" placeholder="Username" onChange={handleChange} />
                 <button onClick={handleClick}>Login</button>
             </div>
         );
     };
     ```

#### 8. **useContext Example**
   - **Purpose**: Demonstrates the use of `useContext` to manage global state.
   - **NavContext**:
     ```typescript
     type NavContextType = {
         isOpen: boolean;
         setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     };

     const NavContext = createContext<NavContextType | undefined>(undefined);

     export function NavProvider({ children }: { children: React.ReactNode }) {
         const [isOpen, setIsOpen] = useState<boolean>(false);

         return (
             <NavContext.Provider value={{ isOpen, setIsOpen }}>
                 {children}
             </NavContext.Provider>
         );
     }

     export function useNav() {
         const context = useContext(NavContext);
         if (!context) {
             throw new Error("useNav must be used within a NavProvider");
         }
         return context;
     }
     ```

#### 9. **useRef Example**
   - **Purpose**: Demonstrates the use of `useRef` to access DOM elements and persist values.
   - **Code**:
     ```typescript
     const UseRefExample = () => {
         const inputRef = useRef<HTMLInputElement>(null);
         const usernameInputRef = useRef<HTMLInputElement>(null);

         useEffect(() => {
             inputRef.current?.focus();
         }, []);

         const handleClick = () => {
             console.log("username is: " + usernameInputRef.current?.value);
         };

         return (
             <div className="useRefExample">
                 <input ref={inputRef} type="text" placeholder="focus here" />
                 <input ref={usernameInputRef} type="text" placeholder="username" />
                 <button onClick={handleClick}>Send</button>
             </div>
         );
     };
     ```

#### 10. **useReducer with Context**
   - **Purpose**: Demonstrates state management using `useReducer` and `Context`.
   - **Reducer and Initial State**:
     ```typescript
     const INITIAL_STATE = {
         theme: "dark",
         fontSize: 16,
     };

     const reducer = (state: StateType, action: ActionType) => {
         switch (action.type) {
             case "CHANGE_THEME":
                 return {
                     ...state,
                     theme: state.theme === "dark" ? "light" : "dark",
                 };
             case "CHANGE_FONTSIZE":
                 return {
                     ...state,
                     fontSize: action.payload,
                 };
             default:
                 return state;
         }
     };
     ```
   - **ThemeContext**:
     ```typescript
     export const ThemeContext = createContext<{
         state: StateType;
         dispatch: React.Dispatch<ActionType>;
     }>({
         state: INITIAL_STATE,
         dispatch: () => {},
     });

     export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
         const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

         return (
             <ThemeContext.Provider value={{ state, dispatch }}>
                 {children}
             </ThemeContext.Provider>
         );
     };
     ```
   - **useContext Example**:
     ```typescript
     const UseContextExample = () => {
         const { state, dispatch } = useContext(ThemeContext);

         return (
             <div className="useContextExample">
                 <button onClick={() => dispatch({ type: "CHANGE_THEME" })}>Change Theme</button>
                 <button onClick={() => dispatch({ type: "CHANGE_FONTSIZE", payload: 20 })}>Change Font Size</button>
             </div>
         );
     };
     ```

#### 11. **Generics in React with TypeScript**
   - **Purpose**: Demonstrates the use of generics to create flexible components.
   - **Item Component**:
     ```typescript
     type ItemProps<T> = {
         id: number;
         title: string;
         extra: T[];
     };

     const Item = (props: ItemProps<object>) => {
         return <div>Item</div>;
     };

     export default Item;
     ```
   - **ItemList Component**:
     ```typescript
     import React from "react";
     import Item from "./Item";

     const ItemList = () => {
         return (
             <div>
                 <Item
                     id={1}
                     title="post title"
                     extra={[
                         {
                             id: 1,
                             username: "john",
                         },
                     ]}
                 />
             </div>
         );
     };

     export default ItemList;
     ```

#### 12. **TypeScript Utility Types**
   - **Purpose**: Demonstrates the use of TypeScript utility types like `Exclude`.
   - **Shape Component**:
     ```typescript
     type ShapeType = "cube" | "square" | "rectangle" | "triangle";
     type TwoDShapeType = Exclude<ShapeType, "cube">;

     const Shape = () => {
         const shape: ShapeType = "cube";
         const twoDShape: TwoDShapeType = "square";

         return <div>Shape</div>;
     };

     export default Shape;
     ```
   - **ShapeList Component**:
     ```typescript
     import React from "react";
     import Shape from "./Shape";

     const ShapeList = () => {
         return (
             <div>
                 <Shape color="dark-blue" />
                 <Shape color="dark-red" />
                 <Shape color="light-blue" />
                 <Shape color="light-red" />
                 <Shape color="light-yellow" />
             </div>
         );
     };

     export default ShapeList;
     ```

#### 13. **Combined Types and Exclude**
   - **Purpose**: Demonstrates combining types and using `Exclude`.
   - **Code**:
     ```typescript
     type ShapeType = "cube" | "square" | "rectangle" | "triangle";
     type TwoDShapeType = Exclude<ShapeType, "cube">;

     type ThemeType = "dark" | "light";
     type ColorType = "red" | "blue" | "yellow";

     type ItemProps = {
         color: Exclude<`${ThemeType}-${ColorType}`, "dark-yellow">;
     };

     const Shape = (props: ItemProps) => {
         const shape: ShapeType = "cube";
         const twoDShape: TwoDShapeType = "square";

         return <div>Shape</div>;
     };
     ```

These examples cover basic component creation, data fetching, prop handling, event management, state management with `useState` and `useReducer`, context API, using `useRef`, generics, and TypeScript utility types in React with TypeScript.