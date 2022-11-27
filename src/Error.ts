export default class AutomationSyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AutomationSyError';
  }
}
