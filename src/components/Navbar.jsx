import { Button, Navbar } from 'flowbite-react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function Nav({ user }) {
    const navigate = useNavigate();
    console.log("User:", user);

    const Logout = async () => {
        try {
            await auth.signOut().then(() => {
                navigate('/login');
            });
            console.log('Logout successful');
        } catch (err) {
            console.error('Logout failed:', err.message);
        }
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src="/logo192.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {!user &&
                    <>
                        <Navbar.Link as={Link} to="/login">Login</Navbar.Link>
                        <Navbar.Link as={Link} to="/signup">Signup</Navbar.Link>
                    </>
                }
                {user &&
                    <>
                        <Navbar.Link as={Link} to="/cart"><FaShoppingCart /></Navbar.Link>
                        <Navbar.Link as={Link} to="/">{user}</Navbar.Link>
                        <Button onClick={Logout}>Logout</Button>
                    </>
                }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
                <Navbar.Link as={Link} to="/products">Products</Navbar.Link> {/* Add this line */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;
