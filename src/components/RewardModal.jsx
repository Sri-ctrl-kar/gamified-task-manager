import './RewardModal.css';

function RewardModal({ level, earnedXp, onClose }) {
  return (
    <div className="modalBackdrop" role="presentation">
      <section className="rewardModal" role="dialog" aria-modal="true">
        <p className="rewardKicker">Level up reward</p>
        <h2>Level {level} Unlocked</h2>
        <p>
          Nice work. That task added {earnedXp} XP and pushed you into the next level.
        </p>
        <button onClick={onClose}>Continue</button>
      </section>
    </div>
  );
}

export default RewardModal;
