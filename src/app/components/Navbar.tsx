import Image from "next/image";
import logo from "../logo.png";

const Navbar: React.FC<{
  searchTerm: string;
  setSearchTerm: (e: string) => void;
}> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-screen bg-main h-fit">
      <div className="grid grid-cols-2 md:grid-cols-3 p-4 md:p-10 w-container mx-auto">
        <Image src={logo} alt="logo" height={40} width={140} />
        <input
          type="text"
          name="search"
          className="rounded-lg bg-white border-none p-2 text-black"
          placeholder="Search for a stock"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="hidden md:block" />
      </div>
    </div>
  );
};

export default Navbar;
