import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/images/social-media.png';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    navigate('/social-media-app');
    setUser(null); 
  };

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();

    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); 


  return (
    <StyledNav position='static' color='inherit'>
        <BrandContainer >
            <StyledLink to='social-media-app/'><Title variant='h2' align='center'>Socialize</Title></StyledLink>
            <StyledImg src={logo} alt="log" />
        </BrandContainer>
        <StyledToolbar>
            {user ? (
                <Profile>
                  <StyledAvatar sx={{ width: "3.5rem", height: "3.5rem" }} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</StyledAvatar>
                  <UserContainer>
                    <Username variant='h6'>{user.result.name}</Username>
                    <Button size="small" variant='contained' color='info' onClick={logout}>Logout</Button>
                  </UserContainer>
                </Profile>
            ) : (
              <StyledLink to='social-media-app/auth'><Button variant='contained' color='primary'>Sign In</Button></StyledLink>
            )}
        </StyledToolbar>
    </StyledNav>
  )
}
//Link componenet for Sign In Button and Title component


const StyledNav = styled.nav`
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    
`

const StyledImg = styled.img`
  margin-left: 1rem;
  width: 5rem;
`

const Title = styled(Typography)`
  font-weight: bold;
  color: rgba(0,183,255, 1);
  text-decoration: none; 
`

const BrandContainer = styled.div`
    display: flex;
    align-items: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: flex-end;
    width: 400px;
`

const Profile = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1em;
    width: 400px;
`
const StyledAvatar = styled(Avatar)`
  background-color: rgb(82, 8, 209),
  
`

const Username = styled(Typography)`
    display: 'flex',
    alignItems: 'center',
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // border: 1px solid red;

`