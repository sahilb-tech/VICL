export function health(req, res) {
  res.json({
    success: true,
    project: 'VICL',
    service: 'backend',
    status: 'running'
  });
}
