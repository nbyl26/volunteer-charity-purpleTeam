import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Heart } from "lucide-react";

export default function CampaignPerformanceChart({ data }) {
    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.name}</p>
                    <p className="text-sm text-purple-600 font-semibold">
                        Terkumpul: {formatCurrency(payload[0].value)}
                    </p>
                    <p className="text-xs text-gray-600">
                        Target: {formatCurrency(payload[0].payload.target)}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                        Progress: {payload[0].payload.percentage}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Performa Campaign (Top 5)
            </h2>
            {data.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 11 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis 
                                tick={{ fontSize: 11 }}
                                tickFormatter={(value) => {
                                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Jt`;
                                    if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`;
                                    return value;
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="collected" fill="#6C4AB6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Campaign dengan donasi terbanyak berdasarkan jumlah terkumpul
                    </p>
                </>
            ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                    <div className="text-center">
                        <Heart className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Belum ada campaign dengan donasi</p>
                    </div>
                </div>
            )}
        </div>
    );
}