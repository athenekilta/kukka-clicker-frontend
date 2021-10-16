import React, { useEffect } from "react";

const UpgradeRewardProgress = ({ upgrade, upgradeDefinition }) => {
  useEffect(() => {
    let loop = true;
    const render = () => {
      if (loop) {
        const div = document.getElementById(upgrade.type);
        if (div) {
          div.style.width = `${(((Date.now() - upgrade.previous_time) / upgradeDefinition.time_interval) * 100) % 100}%`;
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
      id={upgrade.type}
      style={upgrade ? { zIndex: -1 }: undefined} 
      className="absolute top-0 left-0 h-full bg-yellow-200"
    />
  );
};

export default UpgradeRewardProgress;