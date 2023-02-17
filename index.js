//imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const port = 3000

//express
const app = express()

//configurar o handlebars
app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.use(express.static('public'))

//rotas

app.get('/' , (req, res) => {
    res.render('home' , {layout:false})

})

app.use(
    express.urlencoded({
        extended: true

    })

)

app.post('/prod/insertprod',(req,res) => {
    const nome = req.body.nome
    const email = req.body.email
    const telefone = req.body.telefone
    const idade = req.body.idade

    const sql = `INSERT INTO cliente (nome, email, telefone, idade) VALUES ('${nome}','${email}','${telefone}','${idade}')`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }

        res.redirect('/')
        console.log("Casdastro com Sucesso!")
    })
});

app.get('/prod', (req,res) => {
    const sql = 'SELECT * FROM cliente'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listar = data

        console.log(listar)

        res.render('prod' , { layout: false, listar})
    })
})

// consulta um registro pelo id (produto.handlebars)
app.get('/prod/:id', (req,res) => {
    const id = req.params.id

    const sql = `SELECT * FROM cliente WHERE id = ${id}`
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listarProd =data[0]
        res.render('cliente', {layout: false, listarProd } )
    })
})

// pegando editar registro
app.get('/prod/edit/:id', (req,res) => {
    const id = req.params.id
    const sql = `SELECT * FROM cliente where id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const prod = data[0]
        res.render('edit', {layout: false, prod })
    })
})

// pegando para editar registro
app.post('/prod/updateprod', (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const email = req.body.email
    const telefone = req.body.telefone
    const idade = req.body.idade

    const sql = `UPDATE cliente SET nome = '${nome}', email = '${email}', telefone = '${telefone}', idade = ${idade} WHERE id = ${id}`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
            return
        }

        res.redirect('/prod')
    })
})


app.get('/prod/remove/:id', (req,res) => {
    const id = req.params.id

    const sql = `DELETE FROM cliente WHERE id = '${id}'`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/prod')
    })
})

//rota de busca (busc) que enviar para view produto produto.handlebars
app.post('/busc/', (req, res) => {
    const id = req.body.id
    
    const sql = `SELECT * FROM cliente WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listarProd = data[0]
        res.render('cliente', {  layout: false, listarProd } )

    })
})




//rota do buscar
app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })

})




//conexão com o servidor
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: 'projnode1'

})

conn.connect(function(err) {
    if(err){
        console.log(err)
    }
        console.log('Conectado com Sucesso!')
});

app.listen(port, () => {
    console.log(`app rodando ${port}`)
});
