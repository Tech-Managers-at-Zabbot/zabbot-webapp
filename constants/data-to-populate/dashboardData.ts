import { MetricData } from "@/components/dashboard/DashboardMetricCard";

export const metricsData: MetricData[] = [
    {
      title: 'Total Hours',
      value: '2,420 hrs',
      change: 40,
      changeLabel: 'vs last month',
      graphData: [
        { x: 1, y: 20 },
        { x: 2, y: 25 },
        { x: 3, y: 22 },
        { x: 4, y: 30 },
        { x: 5, y: 35 },
        { x: 6, y: 32 },
        { x: 7, y: 45 },
        { x: 8, y: 42 },
        { x: 9, y: 48 },
        { x: 10, y: 50 }
      ]
    },
    {
      title: 'Completed Courses',
      value: '160',
      change: 40,
      changeLabel: 'vs last month',
      graphData: [
        { x: 1, y: 10 },
        { x: 2, y: 15 },
        { x: 3, y: 12 },
        { x: 4, y: 18 },
        { x: 5, y: 22 },
        { x: 6, y: 25 },
        { x: 7, y: 30 },
        { x: 8, y: 28 },
        { x: 9, y: 35 },
        { x: 10, y: 40 }
      ]
    },
    {
      title: 'Active Learners',
      value: '200K',
      change: 40,
      changeLabel: 'vs last month',
      graphData: [
        { x: 1, y: 100 },
        { x: 2, y: 120 },
        { x: 3, y: 115 },
        { x: 4, y: 140 },
        { x: 5, y: 160 },
        { x: 6, y: 155 },
        { x: 7, y: 180 },
        { x: 8, y: 175 },
        { x: 9, y: 190 },
        { x: 10, y: 200 }
      ]
    }
  ];