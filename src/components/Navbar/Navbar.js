import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import memories from '../../assets/images/memories.png';
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
    <StyledAppBar position='static' color='inherit'>
        <BrandContainer >
            <StyledLink to='social-media-app/'><Title variant='h2' align='center'>Memories</Title></StyledLink>
            <StyledImg src={memories} alt="memories logo" height={60} />
        </BrandContainer>
        <StyledToolbar>
            {user ? (
                <Profile>
                  <StyledAvatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</StyledAvatar>
                  <Username variant='h6'>{user.result.name}</Username>
                  <LogoutBtn variant='contained' color='secondary' onClick={logout}>Logout</LogoutBtn>
                </Profile>
            ) : (
              <StyledLink to='social-media-app/auth'><Button variant='contained' color='primary'>Sign In</Button></StyledLink>
            )}
        </StyledToolbar>
      </StyledAppBar>
  )
}
//Link componenet for Sign In Button and Title component


const StyledAppBar = styled(AppBar)`
    border-radius: 15px;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 50px;
`

const StyledImg = styled.img`
  margin-left: '15px';
`

const Title = styled(Typography)`
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
    align-items: center;
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

const LogoutBtn = styled(Button)`

`