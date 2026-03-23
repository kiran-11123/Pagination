import cron from 'node-cron';
import fs from 'fs';
import path from 'path';


// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running a task every day at midnight');

    // Example task: Clean up old log files

    const logDir = path.join(process.cwd(), "./app/logging");

    fs.readdir(logDir, (err, files) => {
        if (err) {
            console.error('Error reading log directory:', err);
            return;
        }

        const now = Date.now();
        const cutoff = now - (1 * 24 * 60 * 60 * 1000); // 1 day in milliseconds
        deleteOldLogs(files, logDir, cutoff);


    });
});
