// sử dụng app muốn triển khai 1 vài điểm cuối phản hồi dùng app.get
//app.put();
//app.delete()
// muốn dùng app có http tới điểm cuối dùng app.post()
// nhập database
import mysql2 from 'mysql2';
import express from 'express';
import bcrypt from 'bcrypt';
// gọi mysql
const connection =mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tuananh12@',
  database: 'moon_user'
});
const app = express();
// tạo database mới
// app.get('/database',(req,res)=>{
      //let sql='creat database nodemysql';
      //connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('database created...');
      //});
//});

//tạo table
// app.get('/createposttable',(req,res)=>{
      //let sql='creat table post(id int, title varchar(255),....)';
      //connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post table created...');
      //});
//});

//nhập dữ liệu vào post 1
// app.get('/addpost1',(req,res)=>{
      //let post={title:'post1',body:'...'};
      //let sql='INSERT into post set ?';
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post 1 add...');
      //});
//});

//nhập dữ liệu vào post 2
// app.get('/addpost2',(req,res)=>{
      //let post={title:'post1',body:'...'};
      //let sql='INSERT into post set ?';
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post 2 add...');
      //});
//});

//làm việc trên post/table đã tạo
// app.get('/getpost',(req,res)=>{
      //let sql='select * from post';
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post fetched...');
      //});
//});

//làm việc trên với các phần tử trong post/table đã tạo
// app.get('/getpost/:id',(req,res)=>{
      //let sql='select * from post where id=${req.params.id}';
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post fetched...');
      //});
//});

//thêm trên các phần tử trong post/table đã tạo
// app.get('/updatepost/:id',(req,res)=>{
      //let newTitle='update title';
      //let sql=`update post set title='${newTitle}' where id=${req.params.id}`;
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post updated...');
      //});
//});

//xoá trên các phần tử trong post/table đã tạo
// app.get('/deletepost/:id',(req,res)=>{
      //let newTitle='update title';
      //let sql=`delete from post where id=${req.params.id}`;
      //let query = connection.query(sql,(err,result)=>{
        //if(err) throw err;
        //console.log(result);
        //res.send('post deleted...');
      //});
//});

// Khởi động server
const PORT = process.env.PORT || 1702;
//gọi passport
import passport from 'passport';
//gọi flash và session
import flash from 'express-flash';
import session from 'express-session';
//tạo liên kết với passport
import initializePassport from './passpost.js';
initializePassport(passport,email=> user.find(user=>user.email===email),id => users.find(user => user.id === id))
// tạo passport
//tạo khoá đến env
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
//tạo view
// Cấu hình EJS làm view engine

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saceUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
import methodOverride from 'method-override';
app.use(methodOverride('_method'))

//tạo đường dẫn đến index
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})
// tạo đường dẫn đến login
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})
//tạo liên kết với register
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// tạo đường dẫn đến register
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

//tạo liên kết với register
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})
//xoá dữ liệu
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
//tạo lớp check
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});