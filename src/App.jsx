import { useState } from "react";

import HeroSection from "./components/hero/HeroSection";
import SurpriseLoading from "./components/birthday/SurpriseLoading";
import BirthdayScreen from "./components/birthday/BirthdayScreen";
import MemoriesSection from "./components/memories/MemoriesSection";

const App = () => {
    const [stage, setStage] = useState("hero");

    // ============================================
    // OPEN SURPRISE
    // ============================================

    const handleOpenSurprise = () => {
        setStage("loading");

        setTimeout(() => {
            setStage("birthday");
        }, 4000);
    };

    // ============================================
    // SWIPE FROM BIRTHDAY → MEMORIES
    // ============================================

    const handleSwipeToMemories = () => {
        setStage("memories");
    };

    return (
        <main
            className="
                min-h-screen
                w-full
                overflow-hidden
                bg-[#03000a]
            "
        >
            {/* =====================================
                STAGE 1 — HERO
            ====================================== */}

            {stage === "hero" && (
                <HeroSection
                    onOpen={handleOpenSurprise}
                />
            )}

            {/* =====================================
                STAGE 2 — LOADING
            ====================================== */}

            {stage === "loading" && (
                <SurpriseLoading />
            )}

            {/* =====================================
                STAGE 3 — BIRTHDAY
            ====================================== */}

            {stage === "birthday" && (
                <BirthdayScreen
                    onSwipe={handleSwipeToMemories}
                />
            )}

            {/* =====================================
                STAGE 4 — OUR MEMORIES
            ====================================== */}

            {stage === "memories" && (
                <MemoriesSection />
            )}
        </main>
    );
};

export default App;