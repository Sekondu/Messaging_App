import { createBrowserRouter } from "react-router-dom";
import App from './App'
import { SignUp } from "../components/signUp";
import { LogIn } from "../components/logIn";
import { User } from '../components/User'
const router = createBrowserRouter([
    {path:"/",element:<App />,},
    {path:"SignUp",element:<SignUp />},
    {path:"LogIn",element:<LogIn />},
    {path:"/user",element:<User />}
])

export default router;