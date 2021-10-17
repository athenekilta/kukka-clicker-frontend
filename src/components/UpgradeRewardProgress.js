import React, { useEffect } from "react";

const UpgradeRewardProgress = ({ score, cost, upgrade, upgradeDefinition }) => {
  useEffect(() => {
    let loop = true;
    const render = () => {
      if (!loop) return;
      if (upgrade) {
        // time for reward
        const div = document.getElementById(upgrade.type);
        if (div) {
          div.style.width = `${((((Date.now() - upgrade.previous_time) / upgradeDefinition.time_interval) * 100) % 100) * 1.05}%`;
        }
      }
      requestAnimationFrame(() => {
        render();
      });
      
    };
    render();
    return () => {
      loop = false;
    };
  }, [upgrade, upgradeDefinition]);

  const costWidth = Math.min(score / cost * 100, 100);

  return (
    <div      
      style={{ zIndex: -1 }} 
      className="absolute top-0 left-0 h-full w-full">
      <div
        id={`${upgradeDefinition.type}__`}
        style={{ width: `${costWidth}%` }}
        className={`absolute top-0 left-0 h-full ${upgrade?.level ? "bg-green-200" : "bg-gray-200"}`}
      />
      <div id={upgradeDefinition.type} className="absolute bottom-0 left-0 h-px bg-blue-600" />
    </div>

  );
};

export default UpgradeRewardProgress;