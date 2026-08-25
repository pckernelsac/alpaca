const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

const currentLevel = LOG_LEVELS[import.meta.env.VITE_LOG_LEVEL] ?? LOG_LEVELS.info;

function formatMessage(level, message, data) {
  const ts = new Date().toISOString();
  const prefix = `[ALPACART] [${ts}] [${level.toUpperCase()}]`;
  if (data) return `${prefix} ${message}`, data;
  return `${prefix} ${message}`;
}

export const logger = {
  debug: (message, data) => { if (currentLevel <= LOG_LEVELS.debug) console.debug(formatMessage('debug', message), data); },
  info: (message, data) => { if (currentLevel <= LOG_LEVELS.info) console.info(formatMessage('info', message), data); },
  warn: (message, data) => { if (currentLevel <= LOG_LEVELS.warn) console.warn(formatMessage('warn', message), data); },
  error: (message, data) => { if (currentLevel <= LOG_LEVELS.error) console.error(formatMessage('error', message), data); },
};

export function startPerformanceMark(name) {
  if (typeof performance === 'undefined') return () => {};
  performance.mark(`${name}-start`);
  return () => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    const entries = performance.getEntriesByName(name);
    if (entries.length > 0) {
      logger.debug(`⏱ ${name}: ${entries[entries.length - 1].duration.toFixed(1)}ms`);
    }
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  };
}
