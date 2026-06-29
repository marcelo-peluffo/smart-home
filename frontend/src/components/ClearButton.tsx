
type ClearButtonProps = {
    onClear: () => void
}

export default function ClearButton({ onClear }: ClearButtonProps) {
    return (
        <>
            <button onClick={onClear}>Clear Button</button>
        </>
    )
}