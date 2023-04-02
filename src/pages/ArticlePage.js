import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify';
import { ArticlePostCard, ArticlePostsSort, ArticlePostsSearch } from '../sections/@dashboard/article';
import POSTS from '../_mock/article';
import { useEffect, useState } from 'react';
import CreatePostPopup from '../components/CreatePostPopup';
import { getAllArticleFromDB, getPostsInForums } from '../utils/api/article.api';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function ArticlePage() {
  const [articleList, setArticleList] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    fetchArticle();
  }

  const fetchArticle = async () => {
    getAllArticleFromDB().then(res => {
      console.log("DATA", res.data)
      if (articleList != res.data) {
        setArticleList(res.data)
      }
    })
  }

  useEffect(() => {
    fetchArticle()
}, [])

  return (
    <>
      <Helmet>
        <title> Dashboard: Article </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Article
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={togglePopup}>
            New Post
          </Button>
          {isPopupOpen && <CreatePostPopup handleClose={togglePopup} />}
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ArticlePostsSearch posts={POSTS} />
          <ArticlePostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container disableGutters>
          {articleList.map((group) => {
            console.log("GROUP", group)
            // let postInTheForum;
            // await getPostsInForums(article[0]).then(res => {
            //   postInTheForum = (res.data)
            // })
            // console.log("TEST", postInTheForum)
            // console.log(article[1].posts)
            return (
              <Container disableGutters>
              {Object.entries(group).map((article) => {
                console.log("ARTICLE", article[0])
                return (
                  <Container disableGutters>
                    <Typography key={article[0]} variant="h5" gutterBottom>{article[0]}</Typography>
                    <Grid container spacing={3} sx={{mb: 4.5}}>
                    {Object.entries(article[1].posts).map((post) => {
                        let postObj = {"title": post[1].title, "comments": post[1].comments, "likes": post[1].likes, "createdAt": post[1].date}
                        console.log("POST1", post[1])
                        return <ArticlePostCard key={post[0]} post={postObj} />;
                      })}
                    </Grid>
                  </Container>
                )
              })}
              </Container>
            )

          })}


        </Container>

        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <ArticlePostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </>
  );
}
