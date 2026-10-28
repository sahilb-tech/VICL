import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function Settings() {
  return (
    <div className="page-stack">
      <Card title="Settings" subtitle="Preferences for your personal study experience">
        <div className="settings-list">
          <div className="setting-row">
            <span>Language</span>
            <Button variant="secondary">English</Button>
          </div>
          <div className="setting-row">
            <span>Sound</span>
            <Button variant="secondary">On</Button>
          </div>
          <div className="setting-row">
            <span>Animation</span>
            <Button variant="secondary">Enabled</Button>
          </div>
          <div className="setting-row">
            <span>Notifications</span>
            <Button variant="secondary">Smart</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
