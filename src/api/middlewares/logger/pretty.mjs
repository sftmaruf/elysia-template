import build from "pino-pretty";

export default function (options) {
  return build({
    ...options,
    ignore: 'pid,hostname,time,level,name',
    messageFormat: (log, messageKey, _, { colors }) => {
      const level = log["level"] || "";

      const label =
        level === 30
          ? colors.greenBright("INFO")
          : level === 50
          ? colors.redBright("ERROR")
          : level === 60 && colors.bgRedBright(colors.bold("FATAL"));

      const timestamp = colors.white(
        log["time"] ? `[${new Date(log["time"]).toISOString()}]` : ""
      );

      const msg = colors.cyanBright(log[messageKey] || "");
      const pid = colors.white(`(${log.pid || ""})`);

      return `${timestamp} ${label} ${pid} -> ${msg}`;
    },
  });
}
