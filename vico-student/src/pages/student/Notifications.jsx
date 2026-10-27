import Card from '../../components/common/Card';
import NotificationCard from '../../components/student/NotificationCard';
import { getNotifications } from '../../services/notificationService';

export default function Notifications() {
  const notifications = getNotifications();

  return (
    <div className="page-stack">
      <Card title="Notifications" subtitle="Updates from VICO and your learning path">
        <div className="stacked-list">
          {notifications.map((item) => (
            <NotificationCard key={item.id} notification={item} />
          ))}
        </div>
      </Card>
    </div>
  );
}
