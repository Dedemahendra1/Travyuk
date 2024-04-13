
const Footer = () => {
  return (
    <footer className="border-t">
    <div className="bg-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-blue-500 font-bold tracking-tight">
          Travyuk
        </span>
        <span className="text-black font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
    </footer>
  );
}

export default Footer