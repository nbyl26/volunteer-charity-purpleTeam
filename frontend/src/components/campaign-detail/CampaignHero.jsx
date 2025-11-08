export default function CampaignHero({ campaign, progress, formatCurrency }) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 rounded-2xl text-white shadow-xl mb-8">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-10">
                <span className="text-6xl md:text-8xl font-extrabold tracking-widest uppercase whitespace-nowrap">
                    Campaign PurpleCare
                </span>
            </div>

            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }}
            />

            <div className="relative z-10 p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        #{campaign.id}
                    </span>
                    <div className="text-right">
                        <div className="text-sm text-white/80">Progress</div>
                        <div className="text-2xl font-bold">{progress.toFixed(1)}%</div>
                    </div>
                </div>
                <h1 className="font-bold text-2xl md:text-3xl mb-4 leading-tight drop-shadow-md">
                    {campaign.title}
                </h1>

                <div className="mt-6">
                    <div className="flex justify-between text-xs md:text-sm text-white/80 mb-2">
                        <span className="truncate mr-2">Terkumpul {formatCurrency(campaign.collected)}</span>
                        <span className="truncate">Target {formatCurrency(campaign.target)}</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-3 bg-white transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}