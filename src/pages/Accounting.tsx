import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingCardGrid } from "../components/Accounting/AccountingCardGrid";

export const Accounting = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-6xl max-h-[600px] p-10">
          <AccountingCardGrid />
        </div>
      </div>
    </div>
  );
};
