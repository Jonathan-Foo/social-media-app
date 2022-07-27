import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { StyledEngineProvider } from '@mui/material';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost, getPosts } from '../../actions/posts';

const Form = ({currentId,  setCurrentId}) => {
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: '', 
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
  };

  return (
    <StyledEngineProvider injectFirst>
      <StyledPaper>
        <StyledForm autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Typography variant='h6'> {currentId ? 'Editing' : 'Creating' } a Memory</Typography>
          <TextField name='creator' variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} />
          <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
          <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
          <TextField name='tags' variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
          <FileInput><FileBase type='File' multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/></FileInput>
          <StyledButton variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</StyledButton>
          <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
        </StyledForm>
      </StyledPaper>
    </StyledEngineProvider>
  )
}

export default Form;

const StyledPaper = styled(Paper)`
  padding: 1em;
`
const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: .5em;
  justify-content: center;
`

const FileInput = styled.div`
  width: 97%;
  margin: 10px 0px;
`

const StyledButton = styled(Button)`
  margin-bottom: 10px;

`
