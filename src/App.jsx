import { useState } from "react";

import HeroSection from "./components/hero/HeroSection";
import SurpriseLoading from "./components/birthday/SurpriseLoading";
import BirthdayScreen from "./components/birthday/BirthdayScreen";

const App = () => {
    const [stage, setStage] = useState("hero");

    const handleOpenSurprise = () => {
        // Start explosion/loading screen
        setStage("loading");

        // Automatically show birthday screen
        setTimeout(() => {
            setStage("birthday");
        }, 4000);
    };

    return (
        <main className="min-h-screen w-full overflow-hidden bg-[#03000a]">

            {/* =====================================
                STAGE 1
            ===================================== */}

            {stage === "hero" && (
                <HeroSection
                    onOpen={handleOpenSurprise}
                />
            )}


            {/* =====================================
                STAGE 2
                HEART EXPLOSION + LOADING
            ===================================== */}

            {stage === "loading" && (
                <SurpriseLoading />
            )}


            {/* =====================================
                STAGE 3
                BIRTHDAY SCREEN
            ===================================== */}

            {stage === "birthday" && (
                <BirthdayScreen />
            )}

        </main>
    );
};

export default App;