import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import GetInvolved from "../components/home/GetInvolved";
import Events from "../components/home/Events";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
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
