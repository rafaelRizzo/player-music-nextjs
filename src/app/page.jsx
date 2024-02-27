import { ModeToggle } from "@/components/ToogleTheme";
import { CardMain } from "@/components/CardMain";

export default function Home() {

    return (
        <>
            {/* Container Card app */}
            <div id="app-music" className="flex items-center justify-center relative min-h-screen">

                {/* Card app */}
                <CardMain />

                {/* Dark mode Toggle */}
                <div className="fixed top-5 right-5">
                    <ModeToggle />
                </div>

            </div>
        </>
    );
}
