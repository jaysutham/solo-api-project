const express = require('express');
const port = 3000
const knex = require('./knex')




const setUpServer = () => {
const app = express();


app.get('/all', async (req, res) => {
    try{
        const data = await knex.select().table("ffxv_char")
        res.send(data)
    } catch(e){
        console.log(e)
    }
});

app.get('/api', async (req, res) => {
    try{
        const data = await knex.select().table("ffxv_char")
        let result = data.map(character => character.name)
        res.send(result)
    } catch(e){
        console.log(e)
    }
});

app.get('/api/:name', async (req, res) => {
    const terribleFormattedName = (req.params.name)
    const perfectlyFormattedName = terribleFormattedName.charAt(0).toUpperCase() + terribleFormattedName.slice(1)

    try{
        const data = await knex.select().table("ffxv_char")
        let result = data.find(character => character.name === perfectlyFormattedName)
        res.send(result)
    } catch(e){
        console.log(e)
    }
});

app.patch('/api/collection/:name', async (req, res) => {
    console.log('yoooo', req.params.name)
    console.log(req.body)
    try{
        let result = await knex('ffxv_char').where('name', req.params.name).update(req.body)
        res.status(200)
        res.send(req.body)
    } catch(e) {
        res.status(404)
        res.send(e)
    }
})

app.post("/api/add",async (req, res) => {
    console.log(req.body)
    try{
    const result = await knex('ffxv_char').put(req.body)
    res.sendStatus(200)
    res.send('success!')
   } catch(e){
       res.status(400)
       res.send(e)
   }
})

app.delete("/api/yougotnorights", async (req, res)=>{
  try{ var query = await knex('ffxv_char').del().where({
        id:req.params.id
    })
    res.status(200)
    executeQuery(res, query)
} catch(e){
    res.status(400)
    res.send(e)
}
})

return app

}

setUpServer().listen(port, ()=> {
    console.log(`server running at http://localhost:${port}`)
})

module.exports = {setUpServer}