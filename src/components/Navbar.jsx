import { Button, Navbar } from 'flowbite-react';
import ShoppingCartIcon from './ShoppingCartIcon';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'flowbite-react';

function Nav({ user }) {
    const productData = useSelector((state) => state.pharmacy.productData);
    const userInfo = useSelector((state) => state.pharmacy.userInfo);

    const navigate = useNavigate();

    console.log(userInfo)

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src="/logo192.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>

                <Navbar.Toggle />
                <Link to="/cart" className="flex items-center mr-4">
                    <ShoppingCartIcon count={productData.length} />
                </Link>
                <Link to="login" className="flex md:order-2 items-center">
                    {userInfo && <Avatar img={userInfo.image || 'default-image-url'} alt="avatar" rounded />}
                    {userInfo && <p className="ml-2">{userInfo.name}</p>}
                </Link>
                {!userInfo && <Button onClick={() => navigate('/login')}>Login</Button>}
            </div>

            <Navbar.Collapse>

                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                {userInfo && userInfo.Role === 'admin' && (
                    <Navbar.Link as={Link} to="/staffdashboard">
                        Admin Dashboard
                    </Navbar.Link>
                )}
                <Navbar.Link href="#">Contact</Navbar.Link>
                <Navbar.Link as={Link} to="/products">Products</Navbar.Link> {/* Add this line */}
                <Navbar.Link as={Link} to="/dashboard">Management</Navbar.Link> {/* Add this line */}                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;
