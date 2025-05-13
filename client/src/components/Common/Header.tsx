interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex flex-col w-full gap-6 h-[200px] font-sans bg-[#F5F8F3] text-black">
      <div className="max-w-[1200px] m-auto text-left w-full md:px-10 px-2">
        <div className="font-semibold text-2xl md:text-5xl">{title}</div>
        <div className="font-normal md:text-base text-xs text-[#898989]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Header;
