import Image from 'next/image'
import classes from './meal-item.module.css'
import Link from 'next/link'
import { IMeal } from '@/interfaces/meal'

type Props = {
    meal: IMeal
}
const MealItem = ({meal}:Props) => {
    return(
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.imageTitle} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{meal.title}</h2>
                    <p>by {meal.creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{meal.summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${meal.slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    )
}

export default MealItem