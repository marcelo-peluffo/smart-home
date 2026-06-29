import { useState } from 'react'

export type API = {
    url: string
    result: any
}

type APIButtonProps = {
    APIData: API
    label: string
}


export default function GETButton({ APIData, label }: APIButtonProps) {
    const [buttonText, setButtonText] = useState(label)

    const callAPI = async () => {
        try {
            const response = await fetch(APIData.url)
            const result = await response.json()

            APIData.result = result
            const stringAPI: string = JSON.stringify(result)

            setButtonText(stringAPI)

        } catch (error) {
            console.error('Failed to fetch at: ', APIData.url)
            setButtonText('Failed request. Please try again.')
        }
    }

    return (
        <>
            <button onClick={callAPI}>{buttonText}</button>
        </>
    )
}