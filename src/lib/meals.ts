import fs from 'fs'
import { IMeal } from '@/interfaces/meal'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import { S3 } from '@aws-sdk/client-s3'

const s3 = new S3({
    region: 'us-east-1'
  });

const db = sql('meals.db')

export const getMeals = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // throw new Error('Loading meals Fealure')
    return db.prepare('SELECT * FROM meals').all()
}

export const getMeal = async (slug: string) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export const saveMeal = async(meal:IMeal) => {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    //const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()

    /* stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('Saving image failed!')
        }
    }) */

    s3.putObject({
        Bucket: 'andrew0028-nextjs-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      })


    meal.image = `/images/${fileName}` as any

    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES ( 
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal)
}