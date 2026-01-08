type Timeframe = "1D" | "1W" | "1M" | "6M";

interface DateFormatOptions {
  hour?: "2-digit" | "numeric";
  minute?: "2-digit" | "numeric";
  weekday?: "short" | "long" | "narrow";
  month?: "short" | "long" | "numeric" | "2-digit";
  day?: "numeric" | "2-digit";
  year?: "numeric" | "2-digit";
}

const ChartUtils = {
  // Generate labels for 1 Day (24 hours)
  hours: (count: number = 24): string[] => {
    const labels: string[] = [];
    const baseDate = new Date();
    baseDate.setMinutes(0);
    baseDate.setSeconds(0);

    for (let i = 0; i < count; i++) {
      baseDate.setHours(i);
      labels.push(
        baseDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
    return labels;
  },

  // Generate labels for 1 Week (7 days)
  days: (count: number = 7): string[] => {
    const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.slice(0, count);
  },

  // Generate labels for 1 Month (30 days)
  daysOfMonth: (count: number = 30): string[] => {
    const labels: string[] = [];
    for (let i = 1; i <= count; i++) {
      labels.push(`Day ${i}`);
    }
    return labels;
  },

  // Generate labels for 6 Months
  months: (count: number = 6): string[] => {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.slice(0, count);
  },

  // Generate actual dates based on timeframe
  generateDates: (timeframe: Timeframe): string[] => {
    const now = new Date();
    const labels: string[] = [];

    switch (timeframe) {
      case "1D":
        // Last 24 hours
        labels.push(...ChartUtils.hours(24));
        break;

      case "1W":
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          labels.push(date.toLocaleDateString("en-US", { weekday: "short" }));
        }
        break;

      case "1M":
        // Last 30 days
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
        }
        break;

      case "6M":
        // Last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          labels.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
        }
        break;
    }

    return labels;
  },

  // Generate sample data for testing
  generateData: (count: number, min: number = 0, max: number = 100): number[] => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  },
};

// Usage example:
const labels: string[] = ChartUtils.generateDates("1W");
const data: number[] = ChartUtils.generateData(7, 50, 100);

// For Chart.js
interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    tension?: number;
  }>;
}

const chartData: ChartData = {
  labels: ChartUtils.generateDates("1M"),
  datasets: [
    {
      label: "My First Dataset",
      data: ChartUtils.generateData(30, 40, 90),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export { ChartUtils, type ChartData, type Timeframe };
