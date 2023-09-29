const express = require('express');
const db = require('./config/db')
const cors = require('cors');

const app = express();
const  PORT = 35218;
app.use(express.json())
app.use(cors());
// Route to get all posts
app.get("/api/get", (req, res, next)=>{
db.query("SELECT * FROM posts", (err,result)=>{
    if(err) {
    console.log(err)
    }
res.send(result)
});   });


app.get("/api/getListUser", (req, res, next)=>{

    db.query("SELECT user, COUNT(DISTINCT card) as nbCardUser FROM cards GROUP BY user  ORDER BY nbCardUser DESC",
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getListUser/:pseudo", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    db.query("SELECT user, COUNT(DISTINCT card) as nbCardUser FROM cards WHERE user = ? GROUP BY user  ORDER BY nbCardUser DESC",pseudo,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getCountProposition/:pseudo", (req, res, next)=>{

const pseudo = req.params.pseudo;
 db.query("SELECT COUNT(popositiontrade.id) AS count FROM popositiontrade JOIN trades ON popositiontrade.idTrade = trades.id JOIN captures ON captures.id = trades.idMainCapture WHERE captures.pseudo = ?", pseudo,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getGuess/:id", (req, res, next)=>{

const id = req.params.id;
 db.query("SELECT captures.id, captures.pseudo, captures.pkmName, captures.pkmImage, captures.pkmId, captures.shiny FROM captures JOIN popositiontrade ON popositiontrade.idCapture = captures.id WHERE popositiontrade.idTrade = ?", id,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getBoostersList", (req, res, next)=>{

    db.query("SELECT name FROM booster_list ORDER BY id ASC",
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getBoostersListByGen/:gen", (req, res, next)=>{

    const gen = req.params.gen;
    db.query("SELECT name FROM booster_list WHERE gen = ? ORDER BY id ASC",gen,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getCardsPoint/:pseudo", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    db.query("SELECT points FROM cardspoint WHERE user = ?", pseudo,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getMyCardsBySet/:pseudo/:booster", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    const booster = req.params.booster;

    db.query("SELECT user, card, COUNT(card) as nbCard FROM cards WHERE booster = ? AND user = ? GROUP BY card", [booster,pseudo],
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getNbCardsBySet/:pseudo/:booster", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    const booster = req.params.booster;

    db.query("SELECT COUNT(DISTINCT card) as nbCard, booster FROM cards WHERE booster = ? AND user = ?;", [booster,pseudo],
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getNbCards/:pseudo", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    const booster = req.params.booster;

    db.query("SELECT COUNT(DISTINCT card) as nbCard, booster FROM cards WHERE user = ? group by booster;", pseudo,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});
app.delete('/api/deleteBooster/:user/:booster',(req,res)=>{
    const user = req.params.user;
    const booster = req.params.booster;
    db.query("DELETE FROM boosters WHERE user = ? AND booster = ? LIMIT 1", [user,booster], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.options('/api/addCard')
app.post('/api/addCard', function (req, res, next){

    const pseudo = req.body.pseudo;
    const idCard = req.body.idCard;
    const booster = req.body.booster;

    db.query("INSERT INTO cards (user,card,booster) VALUES (?,?,?)",[pseudo,idCard,booster], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   })

app.options('/api/addButtonClick')
app.post('/api/addButtonClick', function (req, res, next){

    const pseudo = req.body.pseudo;
    const hour = req.body.hour;

    db.query("INSERT INTO points_button (user,hour) VALUES (?,?)",[pseudo,hour], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   })

app.options('/api/registerCards')
app.post('/api/registerCards', function (req, res, next){

    const pseudo = req.body.pseudo;

    db.query("INSERT INTO cardspoint (user,points) VALUES (?,10000)",[pseudo], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   })

app.post('/api/addCardsPointButton',(req,res)=>{

    const user = req.body.user;
    db.query("UPDATE cardspoint SET points = points + 1000 WHERE user = ?",user, (err,result)=>{
        if(err) {
            console.log(err)   }
        res.send(result)
    });
});
app.post('/api/addCardsPoint',(req,res)=>{

    const user = req.query.user;
    db.query("UPDATE cardspoint SET points = points + 1000 WHERE user = ?",user, (err,result)=>{
        if(err) {
            console.log(err)   }
        res.send(result)
    });
});

app.options('/api/removeCardsPoint')
app.post('/api/removeCardsPoint',(req,res)=>{

    const user = req.body.user;
    db.query("UPDATE cardspoint SET points = points - 1000 WHERE user = ?",user, (err,result)=>{
        if(err) {
            console.log(err)   }
        res.send(result)
    });
});

app.options('/api/addBooster')
app.post('/api/addBooster', function (req, res, next){

    const pseudo = req.body.pseudo;
    const booster = req.body.booster;

    db.query("INSERT INTO boosters (user,booster) VALUES (?,?)",[pseudo,booster], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   })

app.get("/api/getMyBoosters/:pseudo", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    db.query("SELECT booster, COUNT(*) AS nbBooster FROM boosters WHERE user = ? GROUP BY booster", pseudo,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.post('/api/updateButtonTime',(req,res)=>{

    const hour = req.body.hour;
    const pseudo = req.body.pseudo;

    db.query("UPDATE points_button SET hour = ? WHERE user = ?",[hour,pseudo], (err,result)=>{
        if(err) {
            console.log(err)   }
        res.send(result)
    });
});

app.get("/api/getDateButton/:pseudo", (req, res, next)=>{

    const pseudo = req.params.pseudo;
    db.query("SELECT hour FROM points_button WHERE user = ? ", pseudo,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });
});
app.get("/api/getCountPropositionByTrade/:id", (req, res, next)=>{

const id = req.params.id;
 db.query("SELECT COUNT(popositiontrade.id) AS count FROM popositiontrade JOIN trades ON popositiontrade.idTrade = trades.id JOIN captures ON captures.id = trades.idMainCapture WHERE popositiontrade.idTrade = ?", id,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getByUser/:pseudo", (req, res, next)=>{

const pseudo = req.params.pseudo;
 db.query("SELECT pkmName, pkmImage, pkmId, shiny,dateCapture, COUNT(*) as nbCapture FROM captures WHERE pseudo = ? GROUP BY pkmId, Shiny ORDER BY pkmId ASC", pseudo,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getByUserAll/:pseudo", (req, res, next)=>{

const pseudo = req.params.pseudo;
 db.query("SELECT id, pkmName, pkmImage, pkmId, shiny,dateCapture FROM captures WHERE pseudo = ?", pseudo,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});


app.get("/api/getByUserAndPokemon/:pseudo/:pkmId", (req, res, next)=>{

const pkmId = req.params.pkmId;
const pseudo = req.params.pseudo;
 db.query("SELECT id, pkmName, pkmImage, pkmId, shiny, dateCapture FROM captures WHERE pseudo = ? AND pkmId = ?", [pseudo,pkmId],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getAllreadyGuess/:pseudo/:tradeId", (req, res, next)=>{

const pseudo = req.params.pseudo;
const tradeId = req.params.tradeId;
 db.query("SELECT popositiontrade.id FROM popositiontrade JOIN captures ON popositiontrade.idCapture = captures.id JOIN trades ON popositiontrade.idTrade = trades.id WHERE captures.pseudo = ? AND trades.id = ?", [pseudo,tradeId],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getByMainIdCapture/:idMainCapture", (req, res, next)=>{

const idMainCapture = req.params.idMainCapture;
 db.query("SELECT * FROM trades WHERE idMainCapture = ?", idMainCapture,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

// app.options('/api/getMytrade')
app.get("/api/getMyTrades/:pseudo", (req, res, next)=>{

const pseudo = req.params.pseudo;
 db.query("SELECT trades.id AS tradeId, captures.id AS captureId, captures.pseudo, captures.shiny, captures.pkmName, captures.dateCapture, captures.pkmImage FROM captures JOIN trades ON trades.idMainCapture = captures.id WHERE captures.pseudo = ?", [pseudo],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getAllTrades/:pseudo", (req, res, next)=>{

const pseudo = req.params.pseudo;
 db.query("SELECT trades.id AS tradeId, captures.id AS captureId, captures.pseudo, captures.shiny, captures.pkmName, captures.dateCapture, captures.pkmImage FROM captures JOIN trades ON trades.idMainCapture = captures.id WHERE captures.pseudo != ?", [pseudo],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getTradeById/:id", (req, res, next)=>{

const id = req.params.id;
 db.query("SELECT trades.id AS tradeId, captures.id AS captureId, captures.pseudo, captures.shiny, captures.pkmName, captures.dateCapture, captures.pkmImage, captures.pkmId, captures.id AS captureId FROM trades JOIN captures ON trades.idMainCapture = captures.id WHERE trades.id = ?", [id],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getMyNote", (req, res, next)=>{

 db.query("SELECT note FROM chromaguess ORDER BY id DESC LIMIT 1",
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/lastGame", (req, res, next)=>{

 db.query("SELECT title, console FROM currentgame WHERE console is not null AND title is not null ORDER BY id DESC LIMIT 3",
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getCurrentGame", (req, res, next)=>{

 db.query("SELECT image FROM currentgame ORDER BY id DESC LIMIT 1",
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getViewersNote", (req, res, next)=>{

 db.query("SELECT note FROM viewersguess WHERE id IN (select max(id) FROM viewersguess GROUP BY pseudo)",
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/truncateViewers", (req, res, next)=>{

 db.query("TRUNCATE TABLE viewersguess",
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.options('/api/chromaGuess')
app.post('/api/chromaGuess', function (req, res, next){

const note = req.body.note;

db.query("INSERT INTO chromaguess (note) VALUES (?)",[note], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

app.options('/api/viewersGuess')
app.post('/api/viewersGuess', function (req, res, next){

const note = req.query.message;
const user = req.query.user;

db.query("INSERT INTO viewersguess (note, pseudo) VALUES (?,?)",[note, user], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

app.options('/api/createTrade')
app.post('/api/createTrade', function (req, res, next){

const idMainCapture = req.body.idMainCapture;
const idSecondCapture = req.body.idSecondCapture;
const state = req.body.state;

db.query("INSERT INTO trades (idMainCapture, idSecondCapture, state) VALUES (?,?,?)",[idMainCapture,idSecondCapture,state], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

app.options('/api/createGuess')
app.post('/api/createGuess', function (req, res, next){

const idTrade = req.body.idTrade;
const idCapture = req.body.idCapture;

db.query("INSERT INTO popositiontrade (idTrade, idCapture) VALUES (?,?)",[idTrade,idCapture], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

app.options('/api/addCurrentImage')
app.post('/api/addCurrentImage', function (req, res, next){

const image = req.body.image;

db.query("INSERT INTO currentgame (image) VALUES (?)",[image], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

app.delete('/api/deleteTrade/:id',(req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM trades WHERE id= ?", id, (err,result)=>{
    if(err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.delete('/api/deleteCapture/:id',(req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM captures WHERE id= ?", id, (err,result)=>{
    if(err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.delete('/api/deleteGuess/:id',(req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM popositiontrade WHERE idCapture= ?", id, (err,result)=>{
    if(err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.get("/api/getByPokemon/:pkmId/:pseudo", (req, res, next)=>{

const pkmId = req.params.pkmId;
const pseudo = req.params.pseudo;
 db.query("SELECT pkmName, pkmImage, pkmId, shiny, dateCapture, pseudo FROM captures WHERE pseudo != ? AND pkmId = ?", [pseudo,pkmId],
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});

app.get("/api/getLaderboard/:shiny", (req, res, next)=>{

const shiny = req.params.shiny;
 db.query('SELECT pseudo, COUNT(DISTINCT pkmId) AS nbCapture FROM captures WHERE shiny = ? AND pseudo != "Chromatyk" GROUP BY pseudo ORDER BY nbCapture DESC', shiny,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});
app.get("/api/getTradesByPokemon/:pkmId", (req, res, next)=>{

const pkmId = req.params.pkmId;
 db.query('SELECT captures.id, captures.pseudo, captures.shiny, captures.pkmName, captures.dateCapture FROM captures JOIN trades ON trades.idMainCapture = captures.id WHERE trades.state = 1 AND captures.pkmId = ?', pkmId,
 (err,result)=>{
    if(err) {
      console.log(err)
    }
      res.send(result)
    });
});
// Route to get one post
app.get("/api/getFromId/:id", (req, res, next)=>{

const id = req.params.id;
 db.query("SELECT * FROM posts WHERE id = ?", id,
 (err,result)=>{
    if(err) {
    console.log(err)
    }
    res.send(result)
    });   });

// Route for creating the post
app.options('/api/create')
app.post('/api/create', (req, res, next)=> {

const username = req.body.userName;
const title = req.body.title;
const text = req.body.text;

db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
   if(err) {
   console.log(err)
   }
   console.log(result)
});   })

app.options('/api/capture')
app.post('/api/capture', (req, res, next)=> {

const pseudo = req.body.pseudo;
const pkmName = req.body.pkmName;
const pkmImage = req.body.pkmImage;
const pkmId = req.body.pkmId;
const shiny = req.body.shiny;
const dateCapture = req.body.dateCapture;

db.query("INSERT INTO captures (pseudo, pkmName, pkmImage,pkmId, shiny, dateCapture) VALUES (?,?,?,?,?,?)",[pseudo,pkmName,pkmImage,pkmId,shiny,dateCapture], (err,result)=>{
   if(err) {
   console.log(err)
   }
   res.send(result)
});   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   }
   console.log(result)
    });
});

app.post('/api/addTitleGame',(req,res)=>{

const title = req.query.message;
db.query("UPDATE currentgame SET title = ? ORDER BY id DESC LIMIT 1",title, (err,result)=>{
    if(err) {
   console.log(err)   }
   console.log(result)
    });
});
app.post('/api/addConsoleGame',(req,res)=>{

const consoleGame = req.query.message;
db.query("UPDATE currentgame SET console = ? ORDER BY id DESC LIMIT 1",consoleGame, (err,result)=>{
    if(err) {
   console.log(err)   }
   console.log(result)
    });
});
// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on ＄{PORT}`)
})
