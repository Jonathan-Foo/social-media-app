import React, { useState, useEffect } from 'react'
import {Container, Grow, Grid} from '@mui/material';
import styled from 'styled-components';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

export default function Home( ) {
  const[currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
        <StyledContainer>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            <StyledGrid container spacing={3} >
              <Grid item xs={12} sm={12}>
                  <Posts setCurrentId={setCurrentId}/>
              </Grid>
            </StyledGrid>
        </StyledContainer>
    </Grow>  
  )
}

const StyledGrid = styled(Grid)`
    margin-top: 1rem;
    @media (max-width: 600px) {
      flex-direction: column-reverse;
      margin-right: -1.5rem;
    } 
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
`