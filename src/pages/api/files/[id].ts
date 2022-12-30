import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../server/mongodb';
import { FileModel } from '../../../server/schema/file/model';

connect();
const handlerFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const file = await FileModel.findById(id);
  if (!file) {
    res.status(404);
  } else {
    const fileName = Buffer.from(file.name).toString('base64');
    res.setHeader('content-type', `${file.type.toString()}; name=${fileName}`);
    res.setHeader('content-length', file.value.byteLength);
    res.end(file.value);
    file.id;
  }
};

export default handlerFile;
