import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null); // blog being edited
  const [updatedData, setUpdatedData] = useState({ title: "", content: "", img_url: "" });

  // Fetch all blogs
  useEffect(() => {
    axios
      .get("http://localhost:3002/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete blog
  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3002/delete/${id}`)
      .then(() => setBlogs(blogs.filter((b) => b._id !== id)))
      .catch((err) => console.log(err));
  };

  // Open update dialog
  const handleUpdateOpen = (blog) => {
    setCurrentBlog(blog);
    setUpdatedData({
      title: blog.title,
      content: blog.content,
      img_url: blog.img_url,
    });
    setOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdateSubmit = () => {
    axios
      .put(`http://localhost:3002/update/${currentBlog._id}`, updatedData)
      .then((res) => {
        setBlogs(
          blogs.map((b) => (b._id === currentBlog._id ? { ...b, ...res.data.blog } : b))
        );
        setOpen(false);
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
                      onClick={() => handleUpdateOpen(blog)}
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

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            value={updatedData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Content"
            name="content"
            value={updatedData.content}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="img_url"
            value={updatedData.img_url}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleUpdateSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
