import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import GetInvolved from "../components/GetInvolved";
import Events from "../components/Events";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section id="home">
                <Hero />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="get-involved">
                <GetInvolved />
            </section>

            <section id="events">
                <Events />
            </section>
        </>
    );
}
