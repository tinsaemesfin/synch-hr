import { allowancePrepareWN } from "./forDbPrepare/allowancePrepare";
import { contractPrepareWN } from "./forDbPrepare/contractPrepare";
import { overtimePrepareWN } from "./forDbPrepare/overtimePrepare";
import { personalPrepare } from "./forDbPrepare/personalPrepare";
import { workingHourPrepareWN } from "./forDbPrepare/workingHourPrepare";

export type employeeData = {
    personal: personalPrepare;
    contract: contractPrepareWN;
    allowance: allowancePrepareWN[];
    overtime: overtimePrepareWN;
    workingHour: workingHourPrepareWN;
  };