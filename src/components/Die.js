
function Die(props) {
    return (
        <div onClick={props.holdDice} className={`h-12 w-12 rounded-lg shadow-md flex justify-center items-center m-auto cursor-pointer ${props.isHeld ? 'bg-green-500' : 'bg-white'}`}>
            <h2 className="flex justify-center items-center font-bold text-2xl">{props.value}</h2>
        </div>
    )
}


export default Die