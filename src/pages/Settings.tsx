import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";

export const Settings = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4"></div>
      </div>
    </div>
  );
};
