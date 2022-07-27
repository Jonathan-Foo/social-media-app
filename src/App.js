import React, {useEffect, useState} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import memories from './assets/images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import styled from 'styled-components';
import { StyledEngineProvider } from '@mui/material';
import { getPosts } from './actions/posts'; 

export default function App() {
  const[currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);


  return (
    <StyledEngineProvider injectFirst>
    <Container maxWidth='lg'>
      <StyledAppBar position='static' color='inherit'>
        <Title  variant='h2' align='center'>Memories</Title>
        <StyledImg src={memories} alt="memories logo" height={60} />
      </StyledAppBar>
      <Grow in>
        <Container>
          <StyledGrid container justify='space-between' alignItems='stretch' spacing={3} >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </StyledGrid>
        </Container>
      </Grow>  
    </Container>
    </StyledEngineProvider>
)}

const StyledAppBar = styled(AppBar)`
    border-radius: 15px;
    margin: 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const StyledImg = styled.img`
  margin-left: '15px';
`

const Title = styled(Typography)`
  color: rgba(0,183,255, 1);
`

const StyledGrid = styled(Grid)`
    @media (max-width: 600px) {
      flex-direction: column-reverse;
    } 
`
