import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../util/UserUtil';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();

        var userData = {
            username,
            firstName,
            lastName,
            email,
            password
        };
        registerUser(userData);
        navigate('/');
    };
    
    return (
        <div className="w-50" style={{margin: "5rem"}}>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" className="form-control" required
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First name:</label>
                    <input type="text" id="firstName" className="form-control" required
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name:</label>
                    <input type="text" id="lastName" className="form-control" required
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Sign up" className="btn btn-primary btn-lg mt-4" />
            </form>
        </div>
    );
};

export default SignUpForm;
