import bgGlobe from "../assets/bg-hero.svg";
import GetInvolvedHero from "../components/get-involved/GetInvolvedHero";
import InvolvementOptions from "../components/get-involved/InvolvementOptions";
import CallToAction from "../components/get-involved/CallToAction";

export default function GetInvolved() {
    return (
        <section className="relative bg-white text-gray-800 overflow-hidden min-h-screen">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-24 select-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-24">
                <GetInvolvedHero />
                <InvolvementOptions />
                <CallToAction />
            </div>
        </section>
    );
}