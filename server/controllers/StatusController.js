const { getCaptains } = require('../store/captains');
const { getBidsForNeed } = require('../store/bids');
const { getLatestMission } = require('../store/missions');

const getStatus = async (req, res) => {
  const { /* lat, long, */ needId, user_id } = req.query;
  const latestMission = await getLatestMission(user_id);
  let bids = [];
  if(needId) {
    bids = await getBidsForNeed(needId);
  } else if(latestMission) {
    bids = await getBidsForNeed(latestMission.need_id);
  }
  let captains = [];
  if (bids.length > 0) {
    captains = await getCaptains(bids.map(bid => bid.vehicle_id));
  }

  if (latestMission) {
    res.json({ status: latestMission.status, captains, mission: latestMission });
  } else {
    res.json({ status: 'idle', captains });
  }
};

module.exports = { getStatus };
