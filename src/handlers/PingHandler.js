import CODES from '../helpers/statusCodes';

const getPing = (req, res) => { 
  res.status(CODES.OK).json({message: "Success"});
}

export default getPing;
