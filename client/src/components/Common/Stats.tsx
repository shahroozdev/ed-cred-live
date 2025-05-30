
export const Stats = ({ stats } : { stats: { title: string; value: string}[]; description?: string }) => {
    
    const StatCard = ({title, value, description}: {title: string, value: string, description?: string}) => {
        return(
            <div className="outline-muted my-4 flex flex-col rounded-md p-4 shadow-sm outline-2">
                <div className="text-lg font-semibold">{title}</div>
                <p className="text-muted-foreground text-base">{description}</p>
                <div className="mt-4 text-3xl font-semibold">{value}</div>
            </div>
        )
    }

    return(
        <div  className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4`} >
            {
                stats.map((stat, index) => <StatCard {...stat} key={`stat-card-${index}`} />)
            }
        </div>
    )
}
