import { BrowserWindow } from 'electron';
import schedule from 'node-schedule';

export default class Schedule {
  constructor() {
    this.releaseJob = null;
  }

  releaseSchedule() {
    // 每隔1小时检查更新
    this.releaseJob = schedule.scheduleJob('*/1 * * *', () => {
      try {
        BrowserWindow.getAllWindows()[0].webContents.send('fetch-releases');
      } catch (ex) {
        console.warn(ex);
      }
    });
  }

  cancelReleases() {
    if (this.releaseJob) {
      this.releaseJob.cancel();
      this.releaseJob = null;
    }
  }
}
