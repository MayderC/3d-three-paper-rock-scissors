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
        El primero en ganar 3 rondas es el ganador.
      </p>

      <div className="start-btn" onClick={handleStart}>
        <p>
          Iniciar
        </p>
      </div>

      <p className='info info-game'>
        Tienes 5 segundos para elegir tu movimiento
        en cada ronda. Si no eliges a tiempo, se
        elegirá un movimiento aleatorio por ti.
      </p>



    </div>
  )
}
