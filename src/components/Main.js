import Die from './Die'
import React from 'react'
import {nanoid} from "nanoid"


function Main() {
    //initialize dice in state
    const [dice, setDice] = React.useState(newDice())
    React.useEffect(() => {
        console.log('dice state changed')
        checkEqual()
    }, [dice])

    const [tenzies, setTenzies] = React.useState(false)
    // create array of dice objects
    function newDice() {
        let dice = []

        let i = 10
        while (i > 0) {
            i--
            let num = Math.floor(Math.random() * 6) + 1
            let newDie = {
                value: num,
                isHeld: false,
                id: nanoid(),
            }
            dice.push(newDie)
        }
        return dice
    }

    function checkEqual(){
        const valCheck = dice[0].value
        for (let i=0; i<10; i++){
            if (dice[i].value !== valCheck || dice[i].isHeld === false){
                return
            }
        }
        alert('winner')
        return setTenzies(true)
        
    }

    // 
    function roll() {
        const oldTen = dice
        const newTen = newDice()
        let retDice = []
        let i = 0
        while(i<10){
            console.log(oldTen[i], newTen)
            oldTen[i].isHeld ? retDice.push(oldTen[i]) : retDice.push(newTen[i])
            i++
        }
        setDice(retDice)
    }

    // holdDie function
    function holdDice(id) {
        let oldDice = dice
        const newDice = oldDice.map(die =>{
            if (die.id === id){
                let oldDieHeld = die.isHeld
                return {...die, isHeld: !oldDieHeld}
            }
            else return {...die}
        })
        setDice(newDice)
    }

    //map data in state to Die components
    function renderDice(){
        return(dice.map(die => {
            return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
        }))
    }
    return (
        <main className='w-screen h-screen flex justify-center items-center'>
            <div className='w-5/6 h-5/6 bg-gray-200 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='font-bold text-3xl mb-8'>Tenzies</h1>
                <div className='grid grid-cols-2 gap-6 auto-cols-auto'> 
                    {renderDice()}
                </div>
                <button onClick={roll} className=' bg-blue-600 text-white rounded-lg py-3 px-8 mt-8 text-xl font-semibold cursor-pointer'>Roll</button>
            </div>
        </main>
    )
}




export default Main