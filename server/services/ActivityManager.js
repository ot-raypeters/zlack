class ActivityManager {
  constructor() {
    this.threads = {};
  }

  static create() {
    return new ActivityManager();
  }

  getThreadActivity() {
    return { ...this.threads };
  }

  ensureThread(threadId) {
    this.threads[threadId] = this.threads[threadId] || {};
    return this.threads[threadId]
  }

  joinThread(threadId, userId) {
    return this.updateUserActivity(userId, threadId);
  }

  leaveThread(threadId, userId) {
    const thread = this.threads[threadId];
    if (thread) {
      delete thread[userId];
    }
  }

  getUserThreads(userId) {
    return Object.keys(this.threads)
      .map(threadId => this.threads[threadId])
      .filter(thread => Boolean(thread[userId]));
  }

  updateUserActivity(userId, threadId, status = 'online') {
    const thread = this.ensureThread(threadId);
    thread[userId] = status;
    return thread;
  }

  clearUserActivity(userId) {
    return Object.keys(this.threads)
      .forEach(threadId => this.leaveThread(threadId, userId));
  }
}

module.exports = ActivityManager.create();
