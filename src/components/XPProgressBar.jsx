import './XPProgressBar.css';

function XPProgressBar({ levelInfo }) {
  return (
    <section className="xpPanel" aria-label="Level progress">
      <div className="xpTopRow">
        <div>
          <p className="levelLabel">Level {levelInfo.level}</p>
          <h2>XP Progress</h2>
        </div>
        <strong>
          {levelInfo.currentLevelXp} / {levelInfo.xpForNextLevel} XP
        </strong>
      </div>

      <div className="progressTrack">
        <div
          className="progressFill"
          style={{ width: `${levelInfo.progressPercent}%` }}
        />
      </div>
    </section>
  );
}

export default XPProgressBar;
