export const Footer = () => {
  return (
    <footer className="bg-[#F4F8FB] w-full py-20">
      <div className="container mx-auto">
        <div className="flex space-x-12">
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold">Lost and Found Indonesia</h3>
            <div className="bg-primary h-[1px] w-8" />
            <div className="flex flex-col space-y-2 mt-3">
              <a href="" className="text-xs text-[#888888] hover:underline">
                Tentang Lost and Found Indonesia
              </a>
              <a href="" className="text-xs text-[#888888] hover:underline">
                Security
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold">Bantuan</h3>
            <div className="bg-primary h-[1px] w-8 mb-1.5" />
            <a href="" className="text-xs text-[#888888] hover:underline">
              Help Center{" "}
            </a>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#888888] mt-5 mb-6" />
        <div className="flex items-center space-x-4 text-[#888888] text-xs">
          <h3>&copy; 2024 Lost and Found Indonesia</h3>
          <div className="w-[1px] h-5 bg-[#888888]" />
          <a href="" className="hover:underline">
            Kebijakan Privasi
          </a>
          <div className="w-[1px] h-5 bg-[#888888]" />
          <a href="" className="hover:underline">
            Syarat dan Ketentuan
          </a>
        </div>
      </div>
    </footer>
  );
};
