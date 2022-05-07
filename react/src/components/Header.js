import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="Header">
            <h1>Administration</h1>
            <nav>
                <ul>
                    <li><Link to="/">Organizations</Link></li>
                    <li><Link to="users">Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header