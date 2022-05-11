import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
           Header 
           <Link to='/'>GoalSetter</Link>
        </header>
    );
}

export default Header;