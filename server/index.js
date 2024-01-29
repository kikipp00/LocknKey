const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./cryptography")
const PORT = 3331;

app.use(cors());
app.use(express.json());

//removed database credentials
const db = mysql.createConnection({
    user: "",
    host: "",
    password: "",
    database: "",
});

app.post("/signup", (req, res) => {
    const { email, username, password } = req.body;
    db.query(
        "INSERT INTO Master_account (email, username, password) VALUES (?,?,?)",
        [email, username, password],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else {
                res.send("Success");
            }
        }
    );
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT * FROM Master_account WHERE Username=? && Password=?",
        [username, password],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else {
                res.send(result);
            }
        }
    );
});

app.post("/emailunused", (req, res) => {
    const { email } = req.body;
    db.query(
        "SELECT COUNT(*) FROM Master_account WHERE Email=?",
        [email],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else {
                res.send(result)
            }
        }
    );
});

app.post("/usernameunused", (req, res) => {
    const { username } = req.body;
    db.query(
        "SELECT COUNT(*) FROM Master_account WHERE Username=?",
        [username],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else {
                res.send(result)
            }
        }
    );
});

app.post("/addcred", (req, res) => {
    const { master_email, title, username, password, email, url, notes } = req.body;
    const encryptedUser = encrypt(username)
    const encryptedPass = encrypt(password)
    const encryptedEmail = encrypt(email)
    const encryptedUrl = encrypt(url)
    const encryptedNotes = encrypt(notes)
    db.query(
        "INSERT INTO Login (master_email, title, username, password, email, url, notes, username_iv, password_iv, email_iv, url_iv, notes_iv) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [master_email, title, encryptedUser.text, encryptedPass.text, encryptedEmail.text, encryptedUrl.text, encryptedNotes.text,
            encryptedUser.iv, encryptedPass.iv, encryptedEmail.iv, encryptedUrl.iv, encryptedNotes.iv],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else
                res.send("Success");
        }
    );
});

app.post("/getinfo", (req, res) => {
    const { master_email, title} = req.body;
    db.query(
        "SELECT * FROM Login WHERE master_email=? AND title=?",
        [master_email, title],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else
                res.send(result);
        }
    );
});

app.post("/getinfo_nopass", (req, res) => {
    const { master_email, title} = req.body;
    db.query(
        "SELECT username, email, url, notes, username_iv, password_iv, email_iv, url_iv, notes_iv FROM Login WHERE master_email=? AND title=?",
        [master_email, title],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else
                res.send(result);
        }
    );
});

app.post("/getcreds", (req, res) => { //untested
    const { master_email } = req.body;
    db.query(
        "SELECT * FROM Login WHERE master_email=?",
        [master_email],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else
                res.send(result);
        }
    );
});

app.post("/gettitles", (req, res) => {
    const { master_email } = req.body;
    db.query(
        "SELECT Title FROM Login WHERE Master_email=?",
        [master_email],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else
                res.send(result);
        }
    );
});

app.post("/getpass", (req, res) => {
    const { master_email, title } = req.body;
    db.query(
        "SELECT password, password_iv FROM Login WHERE master_email=? AND title=?",
        [master_email, title],
        (err, result) => {
            if (err)
                // console.log(err);
                None
            else {
                res.send(result)
            }
        }
    );
});

app.post('/decrypttext', (req, res) => {
    res.send(decrypt(req.body));
})


app.listen(PORT, () => {
    // console.log("Server is running");
});