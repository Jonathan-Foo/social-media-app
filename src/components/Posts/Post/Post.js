import React from 'react'
import styled from 'styled-components';
import { StyledEngineProvider, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post,  setCurrentId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  }

  const handleLike = () => {
    dispatch(likePost(post._id));
  }

  return (
    <StyledEngineProvider injectFirst>
      <StyledCard>
      <CardImage image={post.selectedFile} title={post.title} />
        <Overlay>
          <Typography variant='h6'>{post.creator}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </Overlay>
        <Overlay2>
          <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='default'/>
          </Button>
        </Overlay2>
        <Details>
          <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => ` #${tag}`)}</Typography>
        </Details>
        <Title variant='h5' gutterBottom>{post.title}</Title>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component="p" gutterBottom>{post.message}</Typography>
        </CardContent>
        <StyledCardActions>
          <Button size='small' color='primary' onClick={() => handleLike()}>
            <ThumbUpAltIcon fontSize='small'/>
            &nbsp; Like &nbsp;
            {post.likeCount}
          </Button>
          <Button size='small' color='primary' onClick={() => handleDelete()}>
            <DeleteIcon fontSize='small'/>
            Delete
          </Button>
        </StyledCardActions>
      </StyledCard>
    </StyledEngineProvider>
  )
}

export default Post;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
`

const CardImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`

const Overlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`

const Overlay2 = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`
const Title = styled(Typography)`
  padding: 0 16px;
`
const StyledCardActions = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;
`

// border: {
//   border: 'solid',
// },
// fullHeightCard: {
//   height: '100%',
// },
// grid: {
//   display: 'flex',
// },
