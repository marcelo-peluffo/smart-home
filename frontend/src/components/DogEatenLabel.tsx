import { useState } from 'react'
import { useEffect } from 'react'

export default function DogEatenLabel() {
    const defaultLabelText = 'Dog has not eaten'
    const [labelText, setLabelText] = useState(defaultLabelText)

    // doesnt work without use effect
    const getDogEatenStatus = async () => {
        try {
            const response = await fetch('http://pi.local:3000/status/dog-eat')
            const result = await response.json()
            const stringResult = await JSON.stringify(result)

            setLabelText(stringResult)
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