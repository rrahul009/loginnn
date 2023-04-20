import { TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const LoginContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
});

const LoginForm = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    borderColor: 'black',
    borderWidth: '1px',
    width: '100%',
    maxWidth: '300px',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5),
    },
}));

const LoginButton = styled(Button)({
    marginTop: '0.5rem',
    backgroundColor: '#0652DD',
    width: '100%',
});

const Forgot = styled(Button)({
    display: 'flex',
    justifyContent: 'flex-start',
    marginRight: '133px',
});

const AlreadySignup = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1rem',
});

const Signup = styled(Button)({
    marginLeft: '2px',
});

const LoginPage = () => {
    const [value, setValue] = useState({
        username: '',
        password: '',
    });

    const changeHandler = async () => {
        try {
            const response = await fetch('https://be-muuw.onrender.com/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            // Update state with response data
            setValue({
                username: '',
                password: '',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <LoginContainer sx={{ backgroundColor: 'whitesmoke' }}>
            <LoginForm sx={{ backgroundColor: 'light' }}>
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    margin="normal"
                    value={value.username}
                    onChange={(e) =>
                        setValue({ ...value, [e.target.name]: e.target.value })
                    }
                    sx={{ width: '100%', mb: 2 }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    margin="normal"
                    value={value.password}
                    onChange={(e) =>
                        setValue({ ...value, [e.target.name]: e.target.value })
                    }
                    sx={{ width: '100%', mb: 2 }}
                />

                <Forgot sx={{ mb: 1 }}>forgot password</Forgot>

                <LoginButton
                    type="submit"
                    variant="contained"
                    onClick={changeHandler}
                    sx={{ width: '100%' }}
                >
                    Login
                </LoginButton>

                <AlreadySignup sx={{ mt: 1 }}>
                    <p>not a member ?</p>
                    <Signup >Signup</Signup>
                </AlreadySignup>
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginPage;
