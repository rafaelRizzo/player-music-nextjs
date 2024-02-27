// 
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoVolumeMedium } from "react-icons/io5";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { IoInfiniteSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast"
// 

export function CardMenu() {
    const [volumeTrack, setVolumeTrack] = useState(0.5);
    const [loopTrack, setLoopTrack] = useState(false);
    const { toast } = useToast()

    const handlerVolume = (e) => {
        const newVolume = e.target.value / 100; // Normaliza o valor para estar entre 0 e 1
        setVolumeTrack(newVolume)
        let audio = document.querySelector('audio');
        audio.volume = volumeTrack
    }

    const handlerLoopTrak = () => {
        let audio = document.querySelector('audio');
        setLoopTrack(!loopTrack)
        audio.loop = loopTrack

        toast({
            title: `${loopTrack ? "Repetição Ativada" : "Repetição Desativada"} `,
            duration: 2000
        })
    }

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="p-1 rounded-full transition hover:dark:bg-zinc-500/15 cursor-pointer">
                        <BiDotsVerticalRounded className="w-6 h-6" />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="min-w-36 max-w-36 dark:border-zinc-300/10">
                    <div className="p-0 flex items-center justify-center gap-2">
                        <IoVolumeMedium className="w-6 h-6" />
                        <input
                            id="volume-track"
                            className="text-zinc-200"
                            defaultValue={volumeTrack * 100}
                            type="range"
                            min="0" max="100"
                            onChange={(e) => { handlerVolume(e) }}
                            step="1" />
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => { handlerLoopTrak() }}>
                        <IoInfiniteSharp />
                        Repetir
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}