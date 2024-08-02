const express = require('express')
const app = express()
const mysql = require('mysql2');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
//set EJS as view engine
app.set('view engine', 'ejs', 'html');
const connection = mysql.createConnection({
host: "sql.freedb.tech",
user: "freedb_artga",
password:"F2fUpKk624tEts?",
database:"freedb_artgal",
port: "3306"
});


//START 
app.use(express.static('public')); //STATIC HERE
//FORM EXTRACTOR 
app.use(express.urlencoded({
    extended: false
}));


//GET INDEX
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM artwork';
    //Fetchdata from sql
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving gallery')
        };
        //render html page with data
        res.render('gallery', { artwork: results });
    });
});
//DELETE ARTWORK
app.get('/deleteArtwork/:id', (req, res) => {
    const art_Id = req.params.id;
    const sql = 'DELETE FROM artwork WHERE art_Id = ?';
    connection.query(sql, [art_Id], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error deleting Artwork:", error);
            res.status(500).send('Error deleting Artwork');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});
// ADD GALLERY

app.get('/addgallery', (req, res) => {
    res.render('addgallery');
});
app.post('/addgallery', upload.single('image'), (req, res) => {
    // Extract data from the request body
    const { artwork_name, artist_name, country, year, dsc } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    }
    const sql = 'INSERT INTO artwork (artwork_name, artist_name, country, year, dsc, image) VALUES (?, ?, ?, ?, ?, ?)';
    // Insert the new artwork into the database
    connection.query(sql, [artwork_name, artist_name, country, year, dsc, image], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding artwork:", error);
            res.status(500).send('Error adding artwork');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});
//GET ID
//GET GALLERY ID
app.get('/artwork/:id', (req, res) => {
    const art_Id = req.params.id;
    const sql = 'SELECT * FROM artwork WHERE art_Id = ?';
    connection.query(sql, [art_Id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.render('artwork', { artworks: results[0] });
        } else {
            res.status(404).send('Artwork not found');
        }
    });
});
//EDIT 
//EDIT 

// EDIT GALLERY
app.get('/editgallery/:id', (req, res) => {
    const art_Id = req.params.id;
    const sql = 'SELECT * FROM artwork WHERE art_Id = ?';
    // Fetch data from MySQL based on the art ID   
    connection.query(sql, [art_Id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving artwork by ID');
        }
        // Check if any artwork with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the art data
            res.render('editgallery', { artworks: results[0] });
        } else {
            // If no artwork with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Artwork is not found');
        }
    });
});

app.post('/editgallery/:id', upload.single('image'), (req, res) => {
    const art_Id = req.params.id;
    // Extract artwork data from the request body
    const { artwork_name, artist_name, country, year, dsc } = req.body;
    
    let image = req.body.currentImage;// retrieve current imagefilename
    if (req.file) {// if new image is uploaded
        image = req.file.filename;//set image to be new image filename    
    }
    const sql = 'UPDATE artwork SET artwork_name = ? , artist_name = ? , country = ? , year=? , dsc=? , image=?  WHERE art_Id = ?';

    // Insert the new artwork into the database
    connection.query(sql, [artwork_name, artist_name, country, year, dsc, image, art_Id], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error updating artwork:", error);
            res.status(500).send('Error updating artwork');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

//RENDER FOR OTHERS
app.get('/login', (req, res) => {
    res.render('login');
    
})
app.post('/login', (req, res) => {
    
    const pass = req.body.pass;
    const name = req.body.name;
    const sql = 'SELECT * FROM account WHERE name = ? AND pass = ?';
    connection.query(sql, [name, pass], (error, results) => {
      if (error) {
        console.error('Database query error:', error.message);
        return res.status(500).send('Error retrieving account database');

      } if (results.length > 0) {
        res.send(results[0])
        //res.redirect(`/account/${results[0].accID}`)
        
      } else {
        res.status(401).send(' Invalid username or password.');
      }
    })})



//RENDER FOR ACCOUNT PAGE
app.get('/account/:id', (req, res) => {
    const acc_Id = req.params.id;
    const sql = 'SELECT * FROM account WHERE accId = ?';
    
    connection.query(sql, [acc_Id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.render('account', { acc: results[0] });
        } else {
            res.status(404).send('Account not found');
        }
    });
});

app.get('/search', (req, res) => {

    const sql = 'SELECT * FROM artwork';
    //Fetchdata from sql
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving gallery')
        };
        //render html page with data
        res.render('search', { artwork: results});
    });
})





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});