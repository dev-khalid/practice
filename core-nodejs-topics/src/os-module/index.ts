import os from "node:os";

const output: { [key: string]: any } = {};
output["cpusInformation"] = os.cpus();
output["systemArchitecture"] = os.arch();
output["freeMemory"] = `${os.freemem() / (1024 * 1024 * 1024)} GB`; //freemem() returns number in bytes.
output["totalMemory"] = `${os.totalmem() / (1024 * 1024 * 1024)} GB`; //totalmem() returns number in bytes.
output["operatingSystem"] = os.platform();
output["homeDirectory"] = os.homedir();
output["hostname"] = os.hostname();
output["ownerOrUserInfo"] = os.userInfo();
output["machineArchitecture"] = os.machine();
output["networkInfo"] = os.networkInterfaces();

