"use client";
import { Menu } from '@/game/interface/Menu'
import './style.css'
import { Party } from "@/game/logic/Party"
import { useEffect, useRef, useState } from 'react'



interface MainMenuProps {
  party: Party
  menu: Menu
}

export const MainMenu = ({ party, menu }: MainMenuProps) => {
  
  const mainMenu = useRef<HTMLDivElement>(null)
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio("/confirm.wav"))
  
  const handleStart = () => {
    if (!audio) return
    mainMenu.current?.classList.add('hidden')
    audio.play()
    menu.start()
  }
  
  useEffect(() => {
    setAudio(new Audio("/confirm.wav"))
  }, [])


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
        if you don&apos;t choose a movement, the game will choose a random one for you.
      </p>



    </div>
  )
}
