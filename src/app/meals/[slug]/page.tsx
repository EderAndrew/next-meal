import Image from 'next/image'
import classes from './page.module.css'
import { getMeal } from '@/lib/meals'
import { IMeal } from '@/interfaces/meal'
import { notFound } from 'next/navigation'

const MealsDetaisPage = async({params}:{params:{slug:string}}) => {
    const meal = await getMeal(params.slug) as IMeal

    if(!meal){
        notFound()
    }

    meal.instructions = meal.instructions.replace(/\n/g,'<br/>')
    return(
       <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={`https://andrew0028-nextjs-demo-users-image.s3.us-east-2.amazonaws.com/${meal.image as unknown as string}`} alt={meal.imageTitle} fill /> 
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a></p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{__html:meal.instructions}}></p>
        </main>
       </>
    )
}

export default MealsDetaisPage