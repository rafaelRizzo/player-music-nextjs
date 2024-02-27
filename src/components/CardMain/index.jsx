'use client'
import { useEffect, useState } from "react";

import Image from "next/image";

// Icones
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { CardMenu } from "./CardMenu";
import { CardTitleAlbum } from "./CardTitleAlbum";
import { CardVinilTrack } from "./CardVinilTrack";
import { CardTrackDetails } from "./CardTrackDetails";

export function CardMain() {
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progressStyle, setProgressStyle] = useState({ width: '0%' });

    useEffect(() => {
        const audio = document.querySelector('audio');
        audio.volume = 50 / 100
        setAudioElement(audio);

        const handlePlayPause = () => {
            setIsPlaying(!isPlaying);

            // Configura as variáveis na primeira reprodução
            if (!audioElement) {
                setAudioElement(audio);
            }

            // Configura a duração se necessário (quando o áudio é iniciado)
            if (!duration) {
                setDuration(audio.duration);
            }
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);

            // Calcular o progresso
            const progress = (audio.currentTime / audio.duration) * 100;

            // Atualizar o estilo dinamicamente
            setProgressStyle({ width: `${progress}%` });
        };

        if (audio) {
            audio.addEventListener('play', handlePlayPause);
            audio.addEventListener('pause', handlePlayPause);
            audio.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                audio.removeEventListener('play', handlePlayPause);
                audio.removeEventListener('pause', handlePlayPause);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [isPlaying, audioElement, duration]);

    // Função para controlar a reprodução/pausa
    const togglePlayPause = () => {
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
        }
    };

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return (
        <main className="card border border-zinc-300/50 dark:border-zinc-300/10 min-w-96 max-w-96 rounded-xl px-8 py-10 overflow-hidden relative mx-5">

            {/* Menu card music */}
            <div className="card-menu absolute top-5 right-4">
                <CardMenu />
            </div>

            {/* Card title */}
            <div className="card-title-album my-2">
                <CardTitleAlbum title={"Attack On Titan"} />
            </div>

            {/* Card img album */}
            <div className="card-img-album flex items-center justify-center mx-auto text-cente my-5">
                <CardVinilTrack
                    pathTrackImage="/thumb-album/attack-on-titan.gif"
                    propsIsPlaying={isPlaying} // Passo como props o state do componente atual, assim consigo manipular dentro do componente
                />
            </div>

            {/* Card infos music */}
            <div className="card-infos-music my-2">
                <CardTrackDetails
                    nameTrack={"ətˈæk 0N tάɪtn"}
                    authorTracker={"Hiroyuki SAWANO"}
                />
            </div>

            {/* Card controllers */}
            <div className="card-container-controllers my-4">

                <div className="flex items-center justify-between">
                    <div className="card-return">
                        <FaAngleDoubleLeft className="text-4xl text-zinc-800 hover:text-zinc-800/90 dark:text-zinc-200 dark:hover:text-zinc-300 cursor-pointer" />
                    </div>
                    <div className="card-toogle-play">

                        {/*  */}
                        <audio controls autoPlay className="absolute bottom-0 -z-10 opacity-0">
                            <source src="/musics/attack-on-titan/ataek-on-titan.mp3" type="audio/mp3" />
                            O seu navegador não suporta o elemento <code>audio</code>.
                        </audio>
                        {/*  */}

                        <div className="text-4xl text-zinc-800 hover:text-zinc-800/90 dark:text-zinc-200 dark:hover:text-zinc-300 cursor-pointer"
                            onClick={togglePlayPause}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </div>
                    </div>
                    <div className="card-skip">
                        <FaAngleDoubleRight className="text-4xl text-zinc-800 hover:text-zinc-800/90 dark:text-zinc-200 dark:hover:text-zinc-300 cursor-pointer" />
                    </div>
                </div>

                {/* Card progress music */}
                <div className="card-progress mt-10">

                    <div className="progress-count">
                        <div className="progress-count-current" style={progressStyle}></div>
                    </div>

                    <div className="flex justify-between">
                        <div className="card-time-current text-zinc-400 dark:text-zinc-500 text-sm">{formatTime(currentTime)}</div>
                        <div className="card-time-end text-zinc-400 dark:text-zinc-500 text-sm">{formatTime(duration)}</div>
                    </div>

                </div>

            </div>

            <footer className="text-center text-sm absolute bottom-5 left-0 right-0 text-zinc-400/80 dark:text-zinc-600">&copy; <a href="https://www.linkedin.com/in/rafael-rizzo-breschi-b02547216/" target="_blank">Rafael Rizzo</a></footer>

        </main>
    )
}