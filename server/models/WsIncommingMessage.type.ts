type BatteryChargeInput = {
  soc: number;
}

type WsIncommingCharger = {
  event: string;
  data: BatteryChargeInput;
}