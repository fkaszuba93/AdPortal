import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../util/UserUtil';

const LogInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();

        var userData = {
            username,
            password
        };
        loginUser(userData);
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
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Log in" className="btn btn-primary mt-4" />
            </form>
        </div>
    );
};

export default LogInForm;
