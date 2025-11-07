import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

export default function EventStatusChart({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Status Pendaftaran Volunteer
            </h2>
            {data.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {data.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <div
                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 truncate">{item.name}</p>
                                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                    <div className="text-center">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Belum ada pendaftaran volunteer</p>
                    </div>
                </div>
            )}
        </div>
    );
}