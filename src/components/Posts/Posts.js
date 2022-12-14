import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledEngineProvider, Grid, CircularProgress } from '@mui/material';


const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  return (
    !posts.length ?
      <StyledEngineProvider injectFirst>
        <BufferContainer>
          <CircularProgress color='inherit' size={60}/>
        </BufferContainer> 
      </StyledEngineProvider> 
      : (
      <StyledEngineProvider injectFirst>
        <MainContainer container alignItems='stretch' spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post}  setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </MainContainer>
      </StyledEngineProvider>
    )
  )
}

export default Posts;

const MainContainer = styled(Grid)`
  display: flex;
  align-items: center;
  width: 100%;
`
const BufferContainer = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`