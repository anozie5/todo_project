//import "./App.css";
//import { Navbar1 } from "./component/homes/navbar";
import {
  BrowserRouter as Rou,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { CreateTodo, UpdateTodo } from "./component/homes/todo";
import DeleteButton from "./component/homes/delete_todo";
import TodoDisplay from "./component/homes/show_todo";
import LoginForm from "./component/auth/login";
import Logout from "./component/auth/logout";
import SignupForm from "./component/auth/signup";

function App() {
  return (
    <Rou>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/todo" element={<TodoDisplay />} />
        <Route path="/todo/create" element={<CreateTodo />} />
        <Route path="/todo/update" element={<UpdateTodo />} />
        <Route path="/todo/delete" element={<DeleteButton />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <div className="App"></div>
    </Rou>
  );
}

export default App;
