import express from 'express'
import {index, listAll, listStats} from '../controller/LaunchesController'

const app = express()
app.use(express.json())

app.get('/', index)
app.get('/launches', listAll)
app.get('/launches/stats', listStats)
app.listen(3030, () => console.debug('server running with success'))
