
import {Link, useNavigate} from 'react-router-dom';

const Navbar = ()=>{
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) :null;

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '15px 40px', 
            backgroundColor: '#1f1f1f', 
            borderBottom: '1px solid #333',
            color: 'white' 
        }}>
            <div>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    KSP<span style={{ color: '#8a2be2' }}>.ai</span>
                </Link>
            </div>

            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontWeight: '500' }}>
                <Link to="/" style={{ color: '#ddd', textDecoration: 'none' }}>Home</Link>
                
            
                {token ? (
                    <>
                        <Link to="/new-article" style={{ color: '#ddd', textDecoration: 'none' }}>New Article</Link>
                        <Link to="/dashboard" style={{ color: '#ddd', textDecoration: 'none' }}>My Articles</Link>
                        
                        <span style={{ color: '#888', marginLeft: '10px', fontSize: '0.9rem' }}>
                            | &nbsp; Hi, {user?.username}
                        </span>
                        
                        <button 
                            onClick={handleLogout} 
                            style={{ 
                                marginLeft: '10px', padding: '6px 12px', cursor: 'pointer', 
                                backgroundColor: 'transparent', color: '#ff4d4d', 
                                border: '1px solid #ff4d4d', borderRadius: '4px', fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#ddd', textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" style={{ 
                            color: 'white', textDecoration: 'none', backgroundColor: '#007bff', 
                            padding: '8px 15px', borderRadius: '4px' 
                        }}>
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;