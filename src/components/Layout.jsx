const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-lg mx-auto h-screen flex flex-col bg-white-100 shadow-2xl shadow-[#84A9BF]">
      {children}
    </div>
  );
};

export default Layout;
