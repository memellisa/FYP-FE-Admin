import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent } from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../../components/iconify';
import Button from '@mui/material/Button';
import ConfirmDeletePopup from 'src/components/ConfirmDeletePopup';
import { useState } from 'react';

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});


const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));


ArticlePostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function ArticlePostCard({ post, onClick, onButtonClick }) {
  const { id, title, comments, likes, createdAt } = post;

  const [deletePopupOpen, setDeletePopupOpen] = useState(false)

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen)
  }

  const POST_INFO = [
    { number: comments, icon: 'eva:message-circle-fill' },
    { number: likes, icon: 'eva:heart-fill' },
  ];

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }} style={{zIndex: 0}} >
        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <Button sx={{borderRadius: '50%', height: 50, width: 10}} style={{position: 'absolute', top: 5, right: 0}} onClick={onButtonClick}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ width: 16, height: 16, mr: 0.5, color: 'red' }} />
          </Button>

          {/* {deletePopupOpen && <ConfirmDeletePopup handleClose={toggleDeletePopup} postID={id} title={title} />} */}

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
            }}
            onClick={onClick}
          >
            {title}
          </StyledTitle>

          <StyledInfo>
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 0 ,
                }}
              >
                <Iconify icon={POST_INFO[0].icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{comments === 0 ? 0 : fShortenNumber(comments)}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 1.5,
              }}
            >
              <Iconify icon={POST_INFO[1].icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">{likes === 0 ? 0 : fShortenNumber(likes)}</Typography>
            </Box>

            {/* {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))} */}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
