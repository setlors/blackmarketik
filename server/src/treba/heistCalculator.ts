import { memoize } from "./memoize";

interface ItemStats {
  combat: number;
  stealth: number;
  hacking: number;
}
function successChanceFunc(items: ItemStats[], targetStat: number) {
  let totalCombat = 0;
  let totalStealth = 0;
  let totalHacking = 0;

  for (let item of items) {
    totalCombat += item.combat;
    totalStealth += item.stealth;
    totalHacking += item.hacking;
  }

  const mainStat = Math.max(totalCombat, totalStealth, totalHacking);
  return (mainStat / targetStat) * 100;
}

const successChance = memoize(successChanceFunc, 10, "LFU", 0);
export default successChance;
