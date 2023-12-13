import { Button, Navbar } from 'flowbite-react';

import { Link } from 'react-router-dom';

function Nav() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src="/logo192.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>

            <div className="flex md:order-2">
                <Button>Sign Up</Button>
                <Button style={{marginLeft: '10px'}} className="border border-blue-500 text-blue-500 bg-transparent">Login</Button>
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Navbar.Link as={Link} to="/">Home</Navbar.Link> {/* Add this line */}
                <Navbar.Link as={Link} to="/products">Products</Navbar.Link> {/* Add this line */}
                <Navbar.Link as={Link} to="/dashboard">Management</Navbar.Link> {/* Add this line */}                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;
