import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NewCreds from "./components/NewCreds";
import Login from './components/Login';
import NoMatch from './components/NoMatch'; //catchall
import Entry from './components/Entry'; //catchall
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ViewAccounts from './components/ViewAccount';

function App() {
    return (
        <div className="App">
            {/*<nav>
                <Link to ="/"> Home </Link> |
                <Link to ="/about"> About </Link>
            </nav>*/}
            <Routes>
                <Route path="/" element={<Login />} /> {/*initial page*/}
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/NewCred" element={<NewCreds />} />
                <Route path="/ViewAccounts" element={<ViewAccounts />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route
                    path="view-entry/:id"
                    element={<Entry />}
                />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
    );
}

export default App;