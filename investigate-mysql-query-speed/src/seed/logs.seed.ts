import connectionSource from '../config/dbconfig';
for (let i = 1; i <= 5; i++) {
  const logs = [];
  let j = 10000;
  while (j--) {
    logs.push({
      companyId: i,
      ticketId: i,
      title: `Ticket #${i}`,
      timestamp: new Date(),
      correlationId: Math.random().toString(36).substr(2, 9),
    });
  }
  (async () => {
    try {
      console.log('Insert operation in progress');
      const result = await connectionSource
        .createQueryBuilder()
        .insert()
        .into('logs')
        .values(logs)
        .execute();
      console.log('Insert completed:', result);
    } catch (error) {
      console.log(error);
    }
  })();
}
