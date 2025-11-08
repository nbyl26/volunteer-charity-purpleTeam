import AboutHero from "../components/about/AboutHero";
import AboutContent from "../components/about/AboutContent";
import AboutValues from "../components/about/AboutValues";

export default function About() {
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <AboutHero />
            <AboutContent />
            <AboutValues />
        </div>
    );
}