"use client";

import { motion } from "motion/react";
import { SearchBar } from "@/components/search/search-bar";
import { SearchScheduleView } from "@/components/search/search-schedule-view";

export default function SearchPage({ users }: { users: User[] }) {
  // Container variant for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  // Individual item variant for smooth entry
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div initial='hidden' animate='visible' variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <div className='mb-5'>
          <SearchBar />
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <SearchScheduleView users={users} />
      </motion.div>
    </motion.div>
  );
}
