import Image from "next/image";

export function CardVinilTrack({ pathTrackImage, propsIsPlaying }) {

    return (
        <Image
            className={`${propsIsPlaying == true ? 'rotateVinil' : ''} rounded-full object-cover max-w-40 max-h-40 min-w-40 min-h-40`}
            src={pathTrackImage}
            loading='eager'
            width={40}
            height={40}
            unoptimized={true}
            alt="Foto do album"
        />
    )
}