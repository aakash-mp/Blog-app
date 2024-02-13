import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// Sample data
let posts = [
    { title: "First Post", content: "This is the content of the first post." },
    { title: "Second Post", content: "This is the content of the second post." },
    { title: "Third Post", content: "This is the content of the third post." }
];


// Routes
app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/new', (req, res) => {
    res.render('new-post.ejs');
});

app.get('/about', (req, res) => {
    res.render("about.ejs");
  });


app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const post = { title, content };
    posts.push(post);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const post = posts[id];
    res.render('edit-post.ejs', { id, post });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    posts[id] = { title, content };
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    posts.splice(id, 1);
    res.redirect('/');
});

// Server
app.listen(port, () => {
    console.log("Server is running on port 3000");
});
