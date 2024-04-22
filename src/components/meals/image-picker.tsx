'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

type Props = {
    label: string,
    name: string
}
const ImagePicker = ({label, name}:Props) => {
    const [pickedImage, setPickedImage] = useState('')

    const imageInput = useRef<HTMLInputElement | null>(null)
    const handlerClick = () => {
        if(!imageInput.current) return

        imageInput.current.click()
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if(!file){
            setPickedImage('')
            return
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPickedImage(fileReader.result as string)
        }

        fileReader.readAsDataURL(file)
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="The Image selected by the user" fill/>}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/*"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlerClick}>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker