import { Home, Package, User, LogOut, DollarSign, Bell, Settings, X, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const HeaderNav = ({ onLoginClick, onSignUpClick }) => {
  const weblocation = useLocation();
  const [activeLink, setActiveLink] = useState();

  const handleLinkClick = (link) => {
    console.log(link);
    setActiveLink(link);
    console.log(weblocation.pathname.split('/')[1]);
    if (link === "package") {
      window.location.href = "./";
    } else {
      window.location.href = link;
    }
  };

  // Function to handle login
  

  return (
    <div className="fixed top-0 left-0 right-0 mb-0 flex items-center justify-between bg-neutral-900 p-5 rounded-b-lg border border-neutral-700/80 max-w-3xl mx-auto z-50">
      <div className="flex space-x-5">
        <a
          className={`flex items-center text-sm ${activeLink === 'package' || weblocation.pathname.split('/')[1] === 'package' || weblocation.pathname.split('/')[1] === '' ? 'text-orange-500' : 'text-white'} hover:text-orange-500 cursor-pointer`}
          onClick={() => handleLinkClick('package')}
        >
          <Package className="mr-1" />
          <span>Package</span>
        </a>
        {/* <a 
          className={`flex items-center text-sm ${activeLink === 'payments' || weblocation.pathname.split('/')[1] === 'payments' ? 'text-orange-500' : 'text-white'} hover:text-orange-500 cursor-pointer`}
          onClick={() => handleLinkClick('payments')}
        >
          <DollarSign className="mr-1" />
          <span>Payments</span>
        </a> */}

        <a
          className={`flex items-center text-sm ${activeLink === 'Notifications' || weblocation.pathname.split('/')[1] === 'Notifications' ? 'text-orange-500' : 'text-white'} hover:text-orange-500 cursor-pointer`}
          onClick={() => handleLinkClick('Notifications')}
        >
          <Bell className="mr-1" />
          <span>Notifications</span>
        </a>
        <a
          className={`flex items-center text-sm ${activeLink === 'settings' ? 'text-orange-500' : 'text-white'} hover:text-orange-500 cursor-pointer`}
          onClick={() => handleLinkClick('settings')}
        >
          <Settings className="mr-1" />
          <span>Settings</span>
        </a>
      </div>
      <div className="flex space-x-4">
        <button onClick={onLoginClick} className="flex items-center text-orange-500 text-sm cursor-pointer">
          <LogIn className="mr-1" />
        </button>
        <button onClick={onSignUpClick} className="flex items-center text-orange-500 text-sm cursor-pointer">
          <UserPlus className="mr-1" />
        </button>
      </div>
    </div>
  );
};

const LoginForm = ({ onClose, onSignUpClick }) => {
  const login = async (email, password) => {
    try {
        const response = await fetch("localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
                email: "string",
              password: "string"
            }),
        });

        const data = await response.json();
        alert(data);
        if (response.ok) {
            // Store the JWT token in AsyncStorage
            // await AsyncStorage.setItem('token', data.token);
            return { success: true};
        } else {
            return { success: false || 'Login failed' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};

  const handleLogin = async () => {
    var email = "string";
    var password = "string";
    // setLoading(true);
    const result = await login(email, password);
    // setLoading(false);

    if (result.success) {
        alert('Login Successful', 'You have been logged in successfully!');
        // navigation.navigate('HomeScreen'); 
        // window.location.href += "./";
    } else {
        alert('Login Failed', result.message || 'Invalid credentials. Please try again.');
        }
    };
  return(
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
       
      />
      <button onClick={handleLogin} className="bg-orange-500 text-white rounded-md py-2 w-full hover:bg-orange-600 transition">
        Login
      </button>
      <p className="text-center text-orange-500 mt-4 cursor-pointer hover:underline" onClick={onSignUpClick}>
        Sign Up
      </p>
    </div>
  </div>
  );
};
const SignUpForm = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />

      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />

      <select
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        defaultValue=""
      >
        <option value="" disabled>Select your City</option>
        <option value="Colombo">Colombo</option>
        <option value="Kandy">Kandy</option>
        <option value="Galle">Galle</option>
        <option value="Jaffna">Jaffna</option>
        <option value="Trincomalee">Trincomalee</option>
        <option value="Batticaloa">Batticaloa</option>
        <option value="Negombo">Negombo</option>
      </select>

      <input
        type="hidden"
        value="Student"
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />

      <button className="bg-orange-500 text-white rounded-md py-2 w-full hover:bg-orange-600 transition">
        Sign Up
      </button>
    </div>
  </div>
);


const Layout = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
    setSignUpOpen(false);
  };

  const toggleSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
    setLoginOpen(false);
  };

  return (
    <div>
      <HeaderNav onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />
      <main className="p-6">

      </main>

      {isLoginOpen && <LoginForm onClose={toggleLogin} onSignUpClick={toggleSignUp} />}
      {isSignUpOpen && <SignUpForm onClose={toggleSignUp} />}
    </div>
  );
};

export default Layout;
