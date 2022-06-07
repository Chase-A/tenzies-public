import Die from './Die'
import React from 'react'
import { nanoid } from "nanoid"

import Confetti from 'react-confetti'




function Main() {
    //initialize dice in state
    const [dice, setDice] = React.useState(newDice())

    // check win condition every dice state change
    React.useEffect(() => {
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
    // check if all dice are equal, win condition
    function checkEqual() {
        const valCheck = dice[0].value
        for (let i = 0; i < 10; i++) {
            if (dice[i].value !== valCheck || dice[i].isHeld === false) {
                return
            }
        }
        return setTenzies(true)

    }

    // generate 10 new dice if game is won, populate unheld dice with new dice
    function roll() {
        if (tenzies){
            setDice(newDice())
            setTenzies(false)
            return
        }

        const oldTen = dice
        const newTen = newDice()
        let retDice = []
        let i = 0
        while (i < 10) {
            console.log(oldTen[i], newTen)
            oldTen[i].isHeld ? retDice.push(oldTen[i]) : retDice.push(newTen[i])
            i++
        }
        setDice(retDice)
    }

    // holdDie function
    function holdDice(id) {
        let oldDice = dice
        const newDice = oldDice.map(die => {
            if (die.id === id) {
                let oldDieHeld = die.isHeld
                return { ...die, isHeld: !oldDieHeld }
            }
            else return { ...die }
        })
        setDice(newDice)
    }

    //map data in state to Die components
    function renderDice() {
        return (dice.map(die => {
            return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
        }))
    }

    // https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
    const [screenIsDesktop, setScreenIsDesktop] = React.useState(window.innerWidth > 640)
    const updateMedia = () =>{
        setScreenIsDesktop(window.innerWidth > 640)
    }
    React.useEffect(() => {
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener("resize", updateMedia);
    })

    return (
        <main className='w-screen h-screen flex justify-center items-center'>
            <div className='bg-gray-200 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='font-bold text-3xl my-8 sm:mb-0'>Tenzies</h1>
                {screenIsDesktop && 
                <p className=' text-lg mt-4 mb-8 text-center'>Click a die to hold.<br /> Hold ten of the same die to win.</p>}
                <div className='grid grid-cols-2 gap-6 auto-cols-auto mx-16
                sm:grid-cols-5'>
                    {renderDice()}
                    {tenzies && <Confetti />}
                </div>
                <button onClick={roll} className=' bg-blue-600 text-white rounded-lg py-3 px-8 my-8 text-xl font-semibold cursor-pointer'>{tenzies ? 'New Game': 'Roll'}</button>
            </div>
        </main>
    )
}




export default Main