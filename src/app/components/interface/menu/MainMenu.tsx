import { Menu } from '@/game/interface/Menu'
import './style.css'
import { Party } from "@/game/logic/Party"
import { useRef } from 'react'

const audio = new Audio("/confirm.wav");

interface MainMenuProps {
  party:  Party
  menu: Menu
}

export const MainMenu = ({party, menu} : MainMenuProps) => {

  const mainMenu = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    mainMenu.current?.classList.add('hidden')
    audio.play()
    menu.start()
  }


  return (
    <div ref={mainMenu} className="main-menu">
      <p className='info info-winner'>
        The first player to win 3 rounds wins the game.
      </p>

      <div className="start-btn" onClick={handleStart}>
        <p>
          Start Game
        </p>
      </div>

      <p className='info info-game'>
        You have 5 seconds to choose a movement.
        if you don't choose a movement, the game will choose a random one for you.
      </p>



    </div>
  )
}
