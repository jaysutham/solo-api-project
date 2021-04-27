const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()
const {setUpServer} = require ('../backend/server')


describe('solo api', () => {
    let request;
    beforeEach(() => {
        request = chai.request(setUpServer())
    });

    describe('Should get correct Data', () => {

        it('should get correct data', async () => {
             let result = await request.get('/api')
             result.should.have.status(200)
        })

        it('should return some value', async () => {
            let result = await request.get('/api')
            JSON.parse(result.text).length.should.equal(12)
        })

        it('should be able to get only names', async () => {
            let expected = ["Aranea","Ardyn","Cor","Crowe","Gladiolus","Ignis","Iris","Lunafreya","Noctis","Prompto","Ravus","Regis"]
            let result = await request.get('/api')
            JSON.parse(result.text).should.deep.equal(expected)
        })

        it('should be able to add things', async () => {
            let result = await request.post('/api/add')
            .send({
                 "id": "c1c3c975-8d6c-445c-1038-08d6afcab3e2",
                 "name": "Cor",
                 "japaneseName": null,
                  "age": "45",
                  "gender": "Male",
                  "race": "Human",
                  "job": "Commander",
                  "height": "1,91",
                  "weight": "??",
                  "origin": "Final Fantasy XV"
            })
            result.should.have.status(200)
        })

        it('should be able to update things', async () => {
            let result = await request
            .patch('/api/collection/noctis')
            .send({name: 'noctina'})

            result.should.have.status(200)
        })

        it('should be able to delete things', async () => {
            let result = await request.delete('/api/yougotnorights')
            result.should.have.status(200)
        })
  
    })
})