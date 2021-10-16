import React, { useEffect } from "react";

const UpgradeRewardProgress = ({ score, cost, upgrade, upgradeDefinition }) => {
  useEffect(() => {
    let loop = true;
    const render = () => {
      if (loop) {
        if (upgrade) {
        // time for reward
          const div = document.getElementById(upgrade.type);
          if (div) {
            div.style.width = `${(((Date.now() - upgrade.previous_time) / upgradeDefinition.time_interval) * 100) % 100}%`;
          }
        }
        // progress in when to buy
        const div2 = document.getElementById(upgradeDefinition.type + "__");
        if (div2) {
          div2.style.width = `${Math.min(score / cost * 100, 100)}%`;
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

  return (
    <div      
      style={{ zIndex: -1 }} 
      className="absolute top-0 left-0 h-full w-full">
      <div
        id={`${upgradeDefinition.type}__`}
        className="absolute top-0 left-0 h-full bg-green-200"
      />
      <div id={upgradeDefinition.type} className="absolute bottom-0 left-0 h-1 bg-blue-600" />
    </div>

  );
};

export default UpgradeRewardProgress;