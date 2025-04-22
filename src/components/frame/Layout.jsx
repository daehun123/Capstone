import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <div className="w-full max-w-md mx-auto min-h-screen relative flex flex-col bg-white-100 shadow-2xl shadow-[#84A9BF]">
        {children}
      </div>
    </Wrapper>
  );
};

export default Layout;
