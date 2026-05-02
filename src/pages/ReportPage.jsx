import { useTaskContext } from '../context/TaskContext';
import { useMotivation } from '../hooks/useMotivation';
import './ReportPage.css';

function ReportPage() {
  const { taskStats, levelInfo } = useTaskContext();
  const { quote, status } = useMotivation();

  return (
    <section className="reportPage">
      <header>
        <p>Project report view</p>
        <h1>Performance Summary</h1>
      </header>

      <div className="reportGrid">
        <article>
          <span>Current level</span>
          <strong>{levelInfo.level}</strong>
        </article>
        <article>
          <span>Completion</span>
          <strong>{taskStats.completionPercent}%</strong>
        </article>
        <article>
          <span>Earned XP</span>
          <strong>{taskStats.earnedXp}</strong>
        </article>
      </div>

      <section className="apiPanel">
        <span>API integration</span>
        <blockquote>{quote.text}</blockquote>
        <p>
          {quote.author} {status === 'fallback' && '(offline fallback)'}
        </p>
      </section>
    </section>
  );
}

export default ReportPage;
