import { Button, Navbar } from 'flowbite-react';
import ShoppingCartIcon from './ShoppingCartIcon';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'flowbite-react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, removeUser, selectUserRole } from "../redux/pharmacySlice";


function Nav({ user }) {
    const productData = useSelector((state) => state.pharmacy.productData);
    const userInfo = useSelector((state) => state.pharmacy.userInfo);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Signout successful')
            dispatch(removeUser())
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    console.log(userInfo)

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com%22%3E/">
                <img src="/logo192.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
                <Navbar.Toggle />
                <Link to="/cart" className="flex items-center mr-4">
                    <ShoppingCartIcon count={productData.length} />
                </Link>
                <Link to="login" className="flex md:order-2 items-center">
                    {userInfo && userInfo.image && <Avatar img={userInfo?.image || 'default-image-url'} alt="avatar" rounded />}
                    {userInfo && <p className="ml-2">{userInfo.name}</p>}
                    {userInfo && <Button className="ml-2" onClick={handleSignout}>Signout</Button>}
                </Link>
                {!userInfo && <Button onClick={() => navigate('/login')}>Login</Button>}    
                {!userInfo && <Button  className="ml-2"
                onClick={() => navigate('/signup')}>Signup</Button>}
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                {userInfo && userInfo.Role === 'admin' && (
                    <Navbar.Link as={Link} to="/staffdashboard">
                        Admin Dashboard
                    </Navbar.Link>
                )}
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Navbar>
    );
}

export default Nav;
