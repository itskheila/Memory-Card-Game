import '../styles/Navbar.css'; 
import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <div className="navbar">
            <ul>
                <li><Link to="/">Game Page</Link></li> 
                <li><Link to="/about">About</Link></li>
                <li><Link to="/results">Game Results</Link></li>
            </ul>
        </div>
    )

}

export default Navbar;