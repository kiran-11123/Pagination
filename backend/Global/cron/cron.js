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


async function deleteOldLogs(files , logDir , cutoff) {
     
    files.forEach(file => {
        const filePath = path.join(logDir, file);

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error getting file stats:', err);
                return;
            }

            if (stats.mtime.getTime() < cutoff) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log(`Deleted old log file: ${file}`);
                    }
                });
            }
        });
    });
    
}