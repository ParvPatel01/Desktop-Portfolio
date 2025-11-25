import NavBar from "../components/NavBar";
import Icons from "../components/Icons";

function HomeScreen() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#178485',
        }}>
            <NavBar />
            <Icons icon="code" label="About Me" startX={10} startY={80} />
            <Icons icon="mail" label="Email" startX={10} startY={180} />
            <Icons icon="folder" label="Projects" startX={10} startY={280} />

            <Icons
                icon="description"
                label="Resume"
                onClick={() => window.open("/resume.pdf")}
                startX={10} startY={380}
            />
            <Icons icon="settings" label="Settings" size={32} startX={10} startY={480} />

        </div>
    );
}

export default HomeScreen;