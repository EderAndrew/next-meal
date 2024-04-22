const MealsDetaisPage = ({params}:{params:{slug:string}}) => {
    return(
        <main>
            <h1>Meals Dynamic Page</h1>
            <p>{params.slug}</p>
        </main>
    )
}

export default MealsDetaisPage