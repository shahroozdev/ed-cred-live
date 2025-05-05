interface HeaderProps {
    title: string;
    description: string;
}

const Header = ({title, description}: HeaderProps) => {
    return(
        <div className="flex flex-col w-full gap-6 py-30 pt-40 px-40 font-sans bg-[#F5F8F3] text-black">
            <div className="font-semibold text-2xl md:text-5xl">{title}</div>
            <div className="font-normal md:text-base text-xs text-[#898989]">{description}</div>
        </div>
    )
}

export default Header;
