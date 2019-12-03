import fs from 'fs'
import mkdirp from 'mkdirp'
import crypto from 'crypto'
import { url } from '.'

const UPLOAD_DIR = './public'

const storeFS = ({ stream, filename }) => {

    mkdirp.sync(UPLOAD_DIR)

    const id = crypto.randomBytes(16).toString('hex')

    const newFilename = `${id}-${filename.toLowerCase()}`

    let filepath = `${UPLOAD_DIR}/${newFilename}`

    return new Promise((resolve, reject) => stream
        .on('error', error => {
            if (stream.truncated)
                // Delete the truncated file.
                fs.unlinkSync(filepath)
            reject(error)
        })
        .pipe(fs.createWriteStream(filepath))
        .on('error', error => reject(error))
        .on('finish', () => {
            filepath = `${url}${newFilename}`
            return resolve({ filepath })
        })
    )
}

export const fileUpload = async upload => {
    const { createReadStream, filename, mimetype } = await upload
    const stream = createReadStream()
    const { filepath } = await storeFS({ stream, filename })
    return { filepath, mimetype }
}