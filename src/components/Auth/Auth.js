import React, {useState} from 'react'
import {  Avatar, Button, Paper, Grid, Container, Typography } from '@mui/material';
import styled from 'styled-components'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';  
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

export default function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(isSignUp){
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    
    }

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value});
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); 
    }

    const switchMode = () => {
        setIsSignUp((prevSignUp) => !prevSignUp); 
    }

    const googleLogin = async (res) => {
        try {
            const result = jwtDecode(res?.credential);
            const token = res?.credential;
            dispatch({type: 'AUTH', data: {result, token}});
            navigate('/social-media-app');
        } catch(err) {
            console.log(err);
        }

    }

  return (
    <StyledContainer >
      <StyledPaper>
        <StyledAvatar>
            <LockOutlinedIcon />
        </StyledAvatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <StyledForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {   isSignUp && (
                        <>
                            <Input name='firstName' label="First Name" handleChange={handleChange} autofocus half></Input>
                            <Input name='lastName' label="Last Name" handleChange={handleChange} half></Input>
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
            </Grid>
            <SubmitBtn type='submit' fullWidth variant='contained' color='primary'>
                {isSignUp ? "Sign Up" : "Sign In"}
            </SubmitBtn>
            <GoogleLogin 
                onSuccess={googleLogin}
                onError={response => console.log(response)}
                
            />
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </Button>
                </Grid>
            </Grid>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
`

const StyledPaper = styled(Paper)`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 1em;
    width: 50%;
    @media (max-width: 1000px) {
        width: 90%;
    } 
`

const StyledAvatar = styled(Avatar)`
     margin: 1em;
     background-color: rgb(237, 19, 74);
`

const StyledForm = styled.form`
    width: '100%';
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SubmitBtn = styled(Button)`
    margin-block: 1.5em; 
`