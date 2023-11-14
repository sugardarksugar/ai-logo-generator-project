import express from 'express'
// import fetch from 'cross-fetch'
import { cnnArray } from '../cnn-result'
// import fetch from 'cross-fetch'

// let testingArr = [{
//     image: 'imagelogo.jpeg',
//     result_label: 'black logo',
//     result_poss: 30.55
// }]


export class UploadPictureController {

    uploads = async (req: express.Request, res: express.Response) => {

        // let img_to_python = await fetch("http://127.0.0.1:5000");
        // let cnnArray = await img_to_python.json()
        res.json(cnnArray)

    }
}