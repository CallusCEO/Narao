type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch';

const TimerPresets: Array<{
    title: string;
    time: number;
    pauseTime?: number;
    numberPause?: number;
    mode: TimerMode;
}> = [
    {
        title: 'Homeworks',
        time: 25 * 60, // 25 minutes in seconds
        pauseTime: 5 * 60, // 5 minutes in seconds
        numberPause: 4,
        mode: 'pomodoro',
    },
    {
        title: 'Focus Session',
        time: 50 * 60, // 50 minutes in seconds
        pauseTime: 10 * 60, // 10 minutes in seconds
        numberPause: 2,
        mode: 'pomodoro',
    },
    {
        title: 'Quick Task',
        time: 10 * 60, // 10 minutes in seconds
        mode: 'countdown',
    },
    {
        title: 'Daily Review',
        time: 30 * 60, // 30 minutes in seconds
        mode: 'countdown',
    },
    {
        title: 'Long Run',
        time: 120 * 60, // 2 hours in seconds
        mode: 'countdown',
    },
]

export default TimerPresets;