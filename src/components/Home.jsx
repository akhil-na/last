import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs from backend
  useEffect(() => {
    axios
      .get("http://localhost:3002/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // DELETE blog
  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3002/delete/${id}`)
      .then(() => {
        setBlogs(blogs.filter((b) => b._id !== id)); // remove from state
      })
      .catch((err) => console.log(err));
  };

  // UPDATE blog (demo: update title to "Updated!")
  const updateBlog = (id) => {
    axios
      .put(`http://localhost:3002/update/${id}`, { title: "Updated!" })
      .then((res) => {
        setBlogs(
          blogs.map((b) => (b._id === id ? { ...b, title: res.data.blog.title } : b))
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ padding: 4, minHeight: "80vh", backgroundColor: "#242424" }}>
      {blogs.length === 0 ? (
        <Typography variant="h5" color="white" align="center">
          No blogs found. Click "Add" to create a new blog!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={4} key={blog._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.img_url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {blog.category || "General"}
                  </Typography>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {blog.author || "Anonymous"}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => deleteBlog(blog._id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBlog(blog._id)}
                    >
                      UPDATE
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
