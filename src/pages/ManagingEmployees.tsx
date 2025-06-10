
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InteractiveBackground from '@/components/InteractiveBackground';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import { Users, Calendar, Clock, TrendingUp, Award, Target } from 'lucide-react';
import { useScrollSection } from '@/hooks/useScrollSection';

const ManagingEmployees = () => {
  const { activeSection, setActiveSection } = useScrollSection();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const modules = [
    {
      icon: Users,
      title: "Performance Management",
      description: "Track, evaluate, and improve employee performance with comprehensive analytics",
      gradient: "from-purple-500 to-violet-600",
      features: ["Goal Setting", "Performance Reviews", "Skill Assessment", "Growth Plans"]
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Automated attendance monitoring with real-time insights and reporting",
      gradient: "from-blue-500 to-cyan-600",
      features: ["Time Tracking", "Leave Management", "Overtime Calculation", "Compliance Reports"]
    },
    {
      icon: Calendar,
      title: "Calendar & Scheduling",
      description: "Smart scheduling system with conflict resolution and team coordination",
      gradient: "from-emerald-500 to-teal-600",
      features: ["Meeting Scheduler", "Resource Booking", "Team Calendar", "Availability Management"]
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Data-driven insights for better workforce management decisions",
      gradient: "from-orange-500 to-red-600",
      features: ["Performance Metrics", "Attendance Analytics", "Productivity Reports", "Trend Analysis"]
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveBackground section="employees" />
      <EnhancedNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="relative z-10 pt-20">
        <motion.section 
          className="min-h-screen flex items-center justify-center text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Managing Employees
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
                Comprehensive workforce management tools for performance, attendance, scheduling, and analytics
              </p>
            </motion.div>

            <motion.div 
              ref={ref}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
            >
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-shadow duration-300`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{module.title}</h3>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <Award className="w-4 h-4 text-purple-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ManagingEmployees;
