import React from 'react'
import styled from 'styled-components';
import { StyledEngineProvider, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post,  setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  const handleDelete = () => {
    dispatch(deletePost(post._id));
  }

  const handleLike = () => {
    console.log(post);
    dispatch(likePost(post._id));
  }

  return (
    <StyledEngineProvider injectFirst>
      <StyledCard>
      <CardImage image={post.selectedFile} title={post.title} />
        <Overlay>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </Overlay>
        <Overlay2>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='default'/>
          </Button>
        )}
        </Overlay2>
        <Title variant='h5' color="primary" fontWeight={700} gutterBottom>{post.title}</Title>
        <Details>
          <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => ` #${tag}`)}</Typography>
        </Details>
        
        <CardContent>
          <Typography variant='body2'  component="p" gutterBottom>{post.message}</Typography>
        </CardContent>
        <StyledCardActions>
          <Button size='small' color='primary' disabled={!user?.result} onClick={() => handleLike()}>
            <Likes />
          </Button>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
              <Button size='small' color='primary' onClick={() => handleDelete()}>
                <DeleteIcon fontSize='small'/>
                Delete
              </Button>
            )}
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
  border-radius: 5px;
  height: 100%;
  position: relative;
  transition: 200ms ease-in-out;
  &:hover{
    transform: scale(1.02);
    outline: 2px solid white;
  }
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
  margin-left: 16px;
  margin-top: -.8rem;
`
const Title = styled(Typography)`
  padding-left: 15px;
  padding-top: .5rem;
  
`
const StyledCardActions = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;
`