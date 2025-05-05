
const Button = ({ children, variant = "primary", ...props }) => {

    const variants = {
        primary: "bg-primary text-white border-primary hover:bg-white hover:text-primary",
        border: "bg-white text-primary border-primary hover:bg-primary hover:text-white",
    };

    return (
        <button
            {...props}
            className={`${variants[variant]} cursor-pointer rounded-md border px-2 md:px-4 py-0.5 md:py-1.5  text-xs/6 md:text-sm/6 font-medium transition-colors`}
        >
            {children}
        </button>
    )
}

export default Button;