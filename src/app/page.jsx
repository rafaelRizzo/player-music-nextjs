'use client'
import { useEffect, useState } from "react";

import Image from "next/image";
import { ModeToggle } from "@/components/ToogleTheme";

// Icones
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

export default function Home() {
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progressStyle, setProgressStyle] = useState({ width: '0%' });

    useEffect(() => {
        const audio = document.querySelector('audio');
        setAudioElement(audio); // Atribuo o audio atual ao state
        if (isNaN(duration) || !audio) {
            setDuration(0)
        } else {
            setDuration(audio.duration); // Seto a duração total no state
        }

        const handlePlayPause = () => { // Toogle para iniciar ou para a musica
            setIsPlaying(!isPlaying);
        };

        // Função para monitorar o estado atual da musica
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);

            // Calcular o progresso
            const progress = (audio.currentTime / audio.duration) * 100;

            // Atualizar o estilo dinamicamente
            setProgressStyle({ width: `${progress}%` });
        };

        if (audio) {
            // Adiciona os event listeners se o elemento de áudio existir
            audio.addEventListener('play', handlePlayPause);
            audio.addEventListener('pause', handlePlayPause);
            audio.addEventListener('timeupdate', handleTimeUpdate);

            // Remove os event listeners ao desmontar o componente
            return () => {
                audio.removeEventListener('play', handlePlayPause);
                audio.removeEventListener('pause', handlePlayPause);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }



    }, [isPlaying]);

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
        <>
            {/* Container Card app */}
            <div id="app-music" className="flex items-center justify-center relative min-h-screen">

                {/* Card app */}
                <main className="card border border-zinc-300/50 dark:border-zinc-300/10 min-w-96 max-w-96 rounded-xl px-8 py-10 overflow-hidden relative mx-5">

                    {/* Card title */}
                    <div className="card-title-album my-2">
                        <h1 className="text-center font-bold text-3xl text-zinc-800 dark:text-zinc-100 mb-8">Attack On Titan</h1>
                    </div>

                    {/* Card img album */}
                    <div className="card-img-album flex items-center justify-center mx-auto text-cente my-5">
                        <Image
                            className={`${isPlaying == true ? 'rotateVinil' : ''} rounded-full object-cover max-w-40 max-h-40 min-w-40 min-h-40`}
                            src="/thumb-album/attack-on-titan.gif"
                            loading='eager'
                            width={40}
                            height={40}
                            unoptimized={true}
                            alt="Foto do album"
                        />
                    </div>

                    {/* Card infos music */}
                    <div className="card-infos-music my-2">
                        <div className="card-music-name text-2xl font-semibold text-zinc-700 dark:text-zinc-200">ətˈæk 0N tάɪtn</div>
                        <div className="card-music-author text-zinc-500 dark:text-zinc-400 font-light">Hiroyuki SAWANO</div>

                    </div>

                    {/* Card controllers */}
                    <div className="card-container-controllers my-4">

                        <div className="flex items-center justify-between">
                            <div className="card-return">
                                <FaAngleDoubleLeft className="text-4xl text-zinc-800 hover:text-zinc-800/90 dark:text-zinc-200 dark:hover:text-zinc-300 cursor-pointer" />
                            </div>
                            <div className="card-toogle-play">

                                {/*  */}
                                <audio controls autoPlay className="absolute bottom-0 -z-10 opacity-0" >
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

                <div className="fixed top-5 right-5">
                    <ModeToggle />
                </div>

            </div>
        </>
    );
}
