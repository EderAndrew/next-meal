import { IMeal } from '@/interfaces/meal'
import classes from './meals-grid.module.css'
import MealItem from './meal-item'

type Props = {
    meals:IMeal[]
}

const MealsGrid = ({meals}:Props) => {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem meal={meal} />
                </li>
            ))}
        </ul>
    )
}

export default MealsGrid