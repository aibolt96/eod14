let houseDatabase = require('./db.json')
let currentId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houseDatabase)
    },
    deleteHouse: (req, res) => {
        const id = +req.params.id
        
        for (let i=0; i<houseDatabase.length; i++){
            if(houseDatabase[i].id === id){
                houseDatabase.splice(i,1)
                res.status(200).send(houseDatabase)
                return
            }
        }
        res.status(400).send('House not in database.')
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body

        houseDatabase.push({
            id: currentId,
            address: address,
            price: price,
            imageURL: imageURL
        })
        currentId++
        res.status(200).send(houseDatabase)
    },
    updateHouse: (req, res) => {
        const id = +req.params.id
        const type = req.body.type

        let houseIndex
        for(i=0; i<houseDatabase.length; i++){
            if (houseDatabase[i].id === id){
                houseIndex = i
            }
        }
        if (houseIndex === undefined){
            res.status(400).send('House not found')
        } else if (type === 'plus'){
            houseDatabase[houseIndex].price += 10000
            res.status(200).send(houseDatabase)
        } else if (type === 'minus'){
            if (houseDatabase[houseIndex].price > 1){
                houseDatabase[houseIndex].price -= 10000
            }
            res.status(200).send(houseDatabase)
        } else {
            res.status(400).send('invalid type constraint')
        }
    }
}