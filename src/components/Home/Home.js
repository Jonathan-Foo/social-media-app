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
  )
}

const StyledGrid = styled(Grid)`
    @media (max-width: 600px) {
      flex-direction: column-reverse;
    } 
`
