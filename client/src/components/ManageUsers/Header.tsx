
export const Header = ({title, description}: {title: string; description: string}) => {
    return(
        <div className="flex flex-col justify-center w-full gap-4 py-10 px-10 font-sans bg-[#F5F8F3] text-black">
            <div className="font-semibold text-2xl md:text-5xl">{title}</div>
            <div className="font-normal md:text-base text-xs text-[#898989]">{description}</div>
        </div>
    )
}
