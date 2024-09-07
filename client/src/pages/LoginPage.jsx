import React, { useState } from 'react';

// Inline Styles
const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '30px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
    position: 'relative',
    overflow: 'hidden',
    width: '768px',
    maxWidth: '100%',
    minHeight: '480px',
    transition: 'all 0.6s ease-in-out',
};

const formContainerStyle = {
    position: 'absolute',
    top: '0',
    height: '100%',
    transition: 'all 0.6s ease-in-out',
};

const signInStyle = {
    left: '0',
    width: '50%',
    zIndex: '2',
};

const signUpStyle = {
    left: '0',
    width: '50%',
    opacity: '0',
    zIndex: '1',
};

const activeSignInStyle = {
    transform: 'translateX(100%)',
};

const activeSignUpStyle = {
    transform: 'translateX(100%)',
    opacity: '1',
    zIndex: '5',
    animation: 'move 0.6s',
};

const socialIconsStyle = {
    margin: '20px 0',
};

const socialIconStyle = {
    border: '1px solid #ccc',
    borderRadius: '20%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 3px',
    width: '40px',
    height: '40px',
};

const toggleContainerStyle = {
    position: 'absolute',
    top: '0',
    left: '50%',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    transition: 'all 0.6s ease-in-out',
    borderRadius: '150px 0 0 100px',
    zIndex: '1000',
};

const toggleStyle = {
    backgroundColor: '#512da8',
    height: '100%',
    background: 'linear-gradient(to right, #5c6bc0, #512da8)',
    color: '#fff',
    position: 'relative',
    left: '-100%',
    width: '200%',
    transform: 'translateX(0)',
    transition: 'all 0.6s ease-in-out',
};

const togglePanelStyle = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 30px',
    textAlign: 'center',
    top: '0',
    transition: 'all 0.6s ease-in-out',
};

const toggleLeftStyle = {
    transform: 'translateX(-200%)',
};

const toggleRightStyle = {
    right: '0',
    transform: 'translateX(0)',
};

// Main Component
const LoginPage = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegister = () => {
        setIsActive(true);
    };

    const handleLogin = () => {
        setIsActive(false);
    };

    return (
        <div
            style={{
                ...containerStyle,
                ...(isActive ? { transform: 'translateX(-100%)' } : {})
            }}
        >
            <div style={{ ...formContainerStyle, ...signUpStyle, ...(isActive ? activeSignUpStyle : {}) }}>
                <form>
                    <h1>Create Account</h1>
                    <div style={socialIconsStyle}>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" style={{ backgroundColor: '#eee', border: 'none', margin: '8px 0', padding: '10px 15px', fontSize: '13px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    <input type="email" placeholder="Email" style={{ backgroundColor: '#eee', border: 'none', margin: '8px 0', padding: '10px 15px', fontSize: '13px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    <input type="password" placeholder="Password" style={{ backgroundColor: '#eee', border: 'none', margin: '8px 0', padding: '10px 15px', fontSize: '13px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    <button type="button" style={{ backgroundColor: '#512da8', color: '#fff', fontSize: '12px', padding: '10px 45px', border: '1px solid transparent', borderRadius: '8px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '10px', cursor: 'pointer' }}>Sign Up</button>
                </form>
            </div>
            <div style={{ ...formContainerStyle, ...signInStyle, ...(isActive ? activeSignInStyle : {}) }}>
                <form>
                    <h1>Sign In</h1>
                    <div style={socialIconsStyle}>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon" style={socialIconStyle}><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" style={{ backgroundColor: '#eee', border: 'none', margin: '8px 0', padding: '10px 15px', fontSize: '13px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    <input type="password" placeholder="Password" style={{ backgroundColor: '#eee', border: 'none', margin: '8px 0', padding: '10px 15px', fontSize: '13px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    <a href="#">Forget Your Password?</a>
                    <button type="button" style={{ backgroundColor: '#512da8', color: '#fff', fontSize: '12px', padding: '10px 45px', border: '1px solid transparent', borderRadius: '8px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '10px', cursor: 'pointer' }}>Sign In</button>
                </form>
            </div>
            <div style={{ ...toggleContainerStyle, ...(isActive ? { transform: 'translateX(-100%)', borderRadius: '0 150px 100px 0' } : {}) }}>
                <div style={toggleStyle}>
                    <div style={{ ...togglePanelStyle, ...toggleLeftStyle, ...(isActive ? { transform: 'translateX(0)' } : {}) }}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button type="button" id="login" onClick={handleLogin} style={{ backgroundColor: 'transparent', borderColor: '#fff' }}>Sign In</button>
                    </div>
                    <div style={{ ...togglePanelStyle, ...toggleRightStyle, ...(isActive ? { transform: 'translateX(200%)' } : {}) }}>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button type="button" id="register" onClick={handleRegister} style={{ backgroundColor: 'transparent', borderColor: '#fff' }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
