import { useState } from 'react'
import { useEffect } from 'react'

export default function DogEatenLabel() {
    const defaultLabelText = 'Click to get Rocky\'s eating status.'
    const [labelText, setLabelText] = useState(defaultLabelText)

    // doesnt work without use effect
    const getDogEatenStatus = async () => {
        try {
            const response = await fetch('http://pi.local:3000/status/dog-eat')
            const result = await response.json()
            const dogHasEaten = result.dogEat

            if (dogHasEaten) {
                setLabelText('Tag Scanned: Rocky has eaten!')
            }
            else {
                setLabelText('Tag not scanned: Rocky hasn\'t eaten yet! Click to get status again.')
            }

        } catch (e) {
            console.error(e)
            setLabelText('Failed to get dog eat status.')
        }
    }

    return (
        <>
            <button onClick={getDogEatenStatus}>{labelText}</button>
        </>
    )
}