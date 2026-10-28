export function getNotifications() {
  return [
    {
      id: 1,
      title: 'Lesson reminder',
      message: 'You have a 15-minute lesson ready to continue in Foundation 1.',
      category: 'Learning',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Achievement unlocked',
      message: 'You earned the First Lesson Completed badge.',
      category: 'Achievement',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      title: 'Class update',
      message: 'New practice activity is now available for Chapter 1.',
      category: 'Announcement',
      time: 'Today',
      read: false,
    },
  ];
}
