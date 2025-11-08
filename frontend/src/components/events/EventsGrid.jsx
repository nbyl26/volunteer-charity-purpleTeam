import { motion } from "framer-motion";
import EventCard from "./EventCard"

export default function EventsGrid({ events, formatDate }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <EventCard
                        event={{
                            ...event,
                            date: formatDate(event.date)
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}